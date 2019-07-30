import { ConsoleDraw, BANNER } from "./console-draw";
import fs, { ReadStream, WriteStream } from "fs";

/**
 * The entry point of the program. The deafult is to pass in process.stdin
 * for input stream and process.stdout for output stream
 *
 * If there is a third argument, it should be a file path to create a file input stream
 */
let inStream: NodeJS.ReadableStream = process.stdin;
const outStream: NodeJS.WritableStream = process.stdout;
process.argv.forEach((val, index, array) => {
    if (index === 2) {
        inStream = fs.createReadStream(val);
    }
});

/* tslint:disable:no-console */
console.log(BANNER);

(new ConsoleDraw(inStream, outStream).run());
