import { Canvas } from "./canvas";
import readline, { Interface, ReadLine } from "readline";
import { Command } from "./commands/command";
import { CommandParameter } from "./commands/command-parameter";
import { CreateCanvasCommand, CREATE_CANVAS_COMMAND } from "./commands/create-canvas-command";
import { DrawLineCommand, DRAW_LINE_COMMAND } from "./commands/draw-line-command";
import { DrawRectangleCommand, DRAW_RECTANGLE_COMMAND } from "./commands/draw-rectangle-command";
import { FillColorCommand, FILL_COLOR_COMMAND } from "./commands/fill-color-command";
import { DrawCommandParameter } from "./commands/draw-command-parameter";
import { CreateCanvasCommandParameter } from "./commands/create-canvas-command-parameter";
import { AsciiColorFactory } from "./ascii-color-factory";
import { QUIT_COMMAND, QuitCommand } from "./commands/quit-command";

/* tslint:disable:no-duplicate-string */
export const BANNER: string =
    "                                                                  " + "\n" +
    "   _____                      _        _____                      " + "\n" +
    "  / ____|                    | |      |  __ \\                     " + "\n" +
    " | |     ___  _ __  ___  ___ | | ___  | |  | |_ __ __ ___      __ " + "\n" +
    " | |    / _ \\| '_ \\/ __|/ _ \\| |/ _ \\ | |  | | '__/ _` \\ \\ /\\ / / " + "\n" +
    " | |___| (_) | | | \\__ \\ (_) | |  __/ | |__| | | | (_| |\\ V  V /  " + "\n" +
    "  \\_____\\___/|_| |_|___/\\___/|_|\\___| |_____/|_|  \\__,_| \\_/\\_/   " + "\n" +
    "                                                                  " + "\n" +
    "                                                                  " + "\n";

// The string value represent empty
export const EMPTY_COLOR: string = " ";

// The error message for unrecognized command
const MESSAGE_UNRECOGNIZED_COMMAND: string = "Unrecognized command. Please enter again.";

// The error message for a null input stream
const MESSAGE_INVALID_INSTREAM: string = "inStream cannot be null or undefined.";

/**
 * Painter
 * @class
 */
export class ConsoleDraw {
    private canvas: Canvas;
    private rl: Interface;

    /**
     * Create a painter.
     * @constructor
     * @param {NodeJS.ReadableStream} inStream - The input stream for reading the text input.
     * @param {NodeJS.WritableStream} outStream - The out stream for text output.
     * @throws {ReferenceError} throws error if inStream is null or undefined
     */
    constructor(private inStream: NodeJS.ReadableStream, private outStream: NodeJS.WritableStream) {
        if (!inStream) {
            throw new ReferenceError(MESSAGE_INVALID_INSTREAM);
        }
    }

    /**
     * Return the canvas
     * @return {Canvas}
     */
    public getCanvas(): Canvas {
        return this.canvas;
    }

    /**
     * Render the canvas and return the result
     * @return {string}
     */
    public render(): string {
        return this.canvas.render();
    }

    /**
     * Run the command and update the canvas
     * @param {string[]} - A array of the commands
     * @return {string}
     */
    public runCommand(args: string[]): void {
        let command: Command;
        let parameter: CommandParameter;
        if (args.length > 0) {
            const commandArgs: string[] = args.slice(1);
            switch (args[0].toUpperCase()) {
                case CREATE_CANVAS_COMMAND:
                    parameter = new CreateCanvasCommandParameter(new AsciiColorFactory(EMPTY_COLOR), commandArgs);
                    command = new CreateCanvasCommand(parameter as CreateCanvasCommandParameter);
                    break;
                case DRAW_LINE_COMMAND:
                    parameter = new DrawCommandParameter(this.canvas, commandArgs);
                    command = new DrawLineCommand(parameter as DrawCommandParameter);
                    break;
                case DRAW_RECTANGLE_COMMAND:
                    parameter = new DrawCommandParameter(this.canvas, commandArgs);
                    command = new DrawRectangleCommand(parameter as DrawCommandParameter);
                    break;
                case FILL_COLOR_COMMAND:
                    parameter = new DrawCommandParameter(this.canvas, commandArgs);
                    command = new FillColorCommand(parameter as DrawCommandParameter);
                    break;
                case QUIT_COMMAND:
                    parameter = new CommandParameter(commandArgs);
                    command = new QuitCommand(parameter);
                    break;
                default:
                    // Throws error if the commnd is not recongnized
                    throw new Error(MESSAGE_UNRECOGNIZED_COMMAND);
            }
            command.execute();
            this.canvas = command.getResult();
        }
        else {
            // Throws error for a empty command
            throw new Error(MESSAGE_UNRECOGNIZED_COMMAND);
        }
    }

    /**
     * Process the text input and print the result
     * @param {string} - text input
     * @return {void}
     */
    public parseLine(line: string): void {
        try {
            // print the line input if the input stream is not the process.stdin
            if (this.inStream !== process.stdin) {
                this.printLine(line);
            }
            const args: string[] = line.trim().split(" ").filter((val) => val);
            this.runCommand(args);
            // TESTING - clear the console
            // process.stdout.write("\x1Bc");
            this.printLine(this.render() + "\n");
        }
        catch (parseLineError) {
            this.printLine(parseLineError.toString());
        }
    }

    /**
     * Run the painter and prompt for input
     * @return {void}
     */
    public run(): void {
        try {
            // set readline"s output stream to null if the input stream is not process.stdin
            this.rl = readline.createInterface({
                input: this.inStream,
                output: (this.inStream !== process.stdin) ? null : this.outStream,
            }).on("line", (line: string) => {
                this.parseLine(line);
                this._prompt();
            });

            // start the input prompt
            this._prompt();
        }
        catch (runError) {
            this.printLine(runError);
            process.exit(1);
        }
    }

    /**
     * Print the input and a newline
     * @param {string} - String to print
     * @return {void}
     */
    public printLine(s: string): void {
        if (this.outStream) {
            this.outStream.write(s + "\n");
        }
    }

    /**
     * Print the input
     * @param {string} - String to print
     * @return {void}
     */
    public print(s: string): void {
        if (this.outStream) {
            this.outStream.write(s);
        }
    }

    /**
     * Prompt for input
     * @return {void}
     */
    private _prompt(): void {
        this.rl.setPrompt("enter command: ");
        this.rl.prompt();
    }

}
