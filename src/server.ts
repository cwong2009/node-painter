/* tslint:disable:max-classes-per-file no-console */
import { ConsoleDraw, BANNER } from "./console-draw";
import { Writable, Readable } from "stream";
import http from "http";
import express from "express";
import socketIO = require("socket.io");

const ACTION_INIT: string = "INIT";
const ACTION_RENDER: string = "RENDER";
const EXECUTE_COMMAND: string = "EXECUTE_COMMAND";

class ReadableStreamStub extends Readable {
    constructor(private commands: string[]) {
        super();
    }

    public _read(size) {
        if (this.commands.length) {
            this.push(this.commands.shift());
        }
    }
}

class WritableSocketIOStream extends Writable {

    constructor(private io, private socket) {
        super();
    }

    public _write(chunk, encoding, done): void {
        this.io.to(this.socket.id).emit(ACTION_RENDER, Helper.textToHtml(chunk.toString()));
        done();
    }
}

class Helper {

    public static textToHtml(s: string): string {
        let result: string = s;
        result = result.replace(/[\n]/g, "<br/>");
        result = result.replace(/[\n\r]/g, "<br/>");
        result = result.replace(/\s/g, "&nbsp;");

        return result;
    }

}

export default class WebConsole {
    private app;
    private io;
    private consoleDrawPool;

    constructor() {
        const app = express();
        app.use(express.static("public"));
        const httpServer = http.createServer(app);
        this.io = socketIO(httpServer);

        this.app = app;
        this.consoleDrawPool = {};

        const port = process.env.PORT || 3000;
        httpServer.listen(port, () => {
            console.log(`listening on *:${port}`);
        });
    }

    public start() {
        this.io.on("connection", (socket) => {
            // New connection
            console.log(`a user connected, socket.id=${socket.id}`);
            this.io.to(socket.id).emit(ACTION_INIT, Helper.textToHtml(BANNER));

            if (!this.consoleDrawPool[socket.id]) {
                // Create a new consoleDrawer in the pool
                const rs = new ReadableStreamStub([]);
                const ws = new WritableSocketIOStream(this.io, socket);
                this.consoleDrawPool[socket.id] = { app: new ConsoleDraw(rs, ws), inputStream: rs };
                const consoleDraw: ConsoleDraw = this.consoleDrawPool[socket.id].app;
                consoleDraw.run();
                console.log(`created a new consoleDraw,total=${Object.keys(this.consoleDrawPool).length}`);
            }

            socket.on("disconnect", () => {
                console.log("user disconnected", socket.id);
                // remove the console drawer
                delete this.consoleDrawPool[socket.id];
            });

            socket.on(EXECUTE_COMMAND, (command: string) => {
                try {
                    console.log(command, socket.id);
                    if (command.trim().toUpperCase().startsWith("Q")) {
                        throw new Error("QuitCommand is not supported in web.");
                    }
                    // write command to the consoleDraw input stream
                    const consoleDrawInputStream = this.consoleDrawPool[socket.id].inputStream;
                    consoleDrawInputStream.push(command + "\n");
                }
                catch (e) {
                    this.io.emit(ACTION_RENDER, e.toString() + "<br/>");
                }
            });

        });
    }
}

(new WebConsole()).start();
