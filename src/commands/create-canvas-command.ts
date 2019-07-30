import { Command } from "./command";
import { Canvas, CANVAS_MAX_HEIGHT, CANVAS_MAX_WIDTH } from "../canvas";
import { CreateCanvasCommandParameter } from "./create-canvas-command-parameter";
import { ColorFactory } from "../color-factory";

// The command prefix for CreateCanvasCommand
export const CREATE_CANVAS_COMMAND: string = "C";

// The error message for height or width out of bound
const MESSAGE_INVALID_SIZE: string = "The width and height of the canvas must be integer with min=1, max=100. Please enter again.";

/**
 * CreateCanvasCommand
 * @class
 */
export class CreateCanvasCommand extends Command {

    /** @private The target canvas for the command */
    private _canvas: Canvas;

    /** @private The width of the canvas */
    private _width: number;

    /** @private The height of the canvas */
    private _height: number;

    /**
     * Create a CreateCanvasCommand.
     * @constructor
     * @param {CreateCanvasCommandParameter} parameter - The command context of create an canvas
     */
    constructor(parameter: CreateCanvasCommandParameter) {
        super(parameter);
        this._width = parseInt(this.getParameter().getArg(0), 10);
        this._height = parseInt(this.getParameter().getArg(1), 10);
    }

    /**
     * Return the command parameter
     * @return {CreateCanvasCommandParameter}
     */
    public getParameter(): CreateCanvasCommandParameter {
        return this._parameter as CreateCanvasCommandParameter;
    }

    /**
     * Return the number of arguments of the command
     * @return {number}
     */
    public getNumberOfArguments(): number {
        return 2;
    }

    /**
     * Execute the command to craete a new Canvas
     * @return {void}
     */
    public execute(): void {
        this._createCanvas(this._width, this._height, this.getParameter().getBackgroundColorFactory());
    }

    /**
     * Return the canvas
     * @return {Canvas}
     */
    public getResult(): Canvas {
        return this._canvas;
    }

    /**
     * Verify the command arguments
     * @private
     * @param {string[]} args - The command arguments
     * @throws {Error}  throws error if there are not exactly 2 integer arguments
     */
    protected _verifyArgs(): void {
        super._verifyArgs();
        const args: string[] = this.getParameter().getArgs();
        if (!Number.isInteger(Number(args[0])) || !Number.isInteger(Number(args[1]))) {
            throw new Error(MESSAGE_INVALID_SIZE);
        }

        const width = parseInt(this.getParameter().getArg(0), 10);
        const height = parseInt(this.getParameter().getArg(1), 10);
        if ((width < 1 || width > CANVAS_MAX_WIDTH) ||
            (height < 1 || height > CANVAS_MAX_HEIGHT)) {
            throw new Error(MESSAGE_INVALID_SIZE);
        }
    }

    /**
     * Create the canvas
     * @return {void}
     */
    private _createCanvas(width: number, height: number, backgroundColorFactory: ColorFactory): void {
        this._canvas = new Canvas(width, height, backgroundColorFactory);
    }

}
