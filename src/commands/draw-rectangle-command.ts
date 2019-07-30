import { Command } from "./command";
import { Canvas } from "../canvas";
import { Color } from "../color";
import { CommandParameter } from "./command-parameter";
import { DrawCommandParameter } from "./draw-command-parameter";
import { AsciiColorFactory } from "../ascii-color-factory";
import { ColorFactory } from "../color-factory";
import { Graphic } from "../graphic";

// The error message for a coordinates input out of canvas bounds
const MESSAGE_COORDINATE_OUT_OF_RANGE: string = "Coordinates input out of canvas bounds. Please enter again.";

// The error message for a non integer coordinates input
const MESSAGE_INVALID_COORDINATE: string = "Coordinates input contains non integer values. Please enter again.";

// The command prefix for DrawRectangleCommand
export const DRAW_RECTANGLE_COMMAND: string = "R";

// The color used to in DrawRectangleCommand
export const BORDER_COLOR: string = "x";

// The error message for null canvas
const MESSAGE_NULL_CANVAS: string = "The Canvas has not been created yet. Please enter again.";

/**
 * DrawRectangleCommand
 * @class
 */
export class DrawRectangleCommand extends Command {

    /** @private The ColorFactory used to create the color of the rectangle border */
    private _borderColorFactory: ColorFactory;

    /** @private The x-coordinate of the first opposite vertices */
    private _startX: number;

    /** @private The Y-coordinate of the first opposite vertices */
    private _startY: number;

    /** @private The x-coordinate of the second opposite vertices */
    private _endX: number;

    /** @private The y-coordinate of the second opposite vertices */
    private _endY: number;

    /**
     * Create a DrawRectangleCommand
     * @constructor
     * @param {DrawCommandParameter} context - The command context
     */
    constructor(parameter: DrawCommandParameter) {
        super(parameter);

        this._borderColorFactory = new AsciiColorFactory(BORDER_COLOR);
        this._startX = parseInt(this.getParameter().getArg(0), 10) - 1;
        this._startY = parseInt(this.getParameter().getArg(1), 10) - 1;
        this._endX = parseInt(this.getParameter().getArg(2), 10) - 1;
        this._endY = parseInt(this.getParameter().getArg(3), 10) - 1;
    }

    /**
     * Return the command parameter
     * @return {DrawCommandParameter}
     */
    public getParameter(): DrawCommandParameter {
        return this._parameter as DrawCommandParameter;
    }

    /**
     * Return the number of arguments of the command
     * @return {number}
     */
    public getNumberOfArguments(): number {
        return 4;
    }

    /**
     * Return the number of arguments of the command
     * @return {number}
     */
    public getResult(): Canvas {
        return this.getParameter().getCanvas();
    }

    /**
     * Execute the command to draw a rectangle
     * @return {void}
     */
    public execute(): void {
        const canvas: Canvas = this.getParameter().getCanvas();
        const x0: number = this._startX;
        const y0: number = this._startY;
        const x1: number = this._endX;
        const y1: number = this._endY;

        const g: Graphic = new Graphic(canvas);
        g.drawRectangle(Math.min(x0, x1), Math.min(y0, y1), Math.max(x0, x1), Math.max(y0, y1), this._borderColorFactory);
    }

    /**
     * Verify the command arguments
     * @private
     * @param {string[]} args - The command arguments
     * @throws {Error}  throws error if there are not exactly 4 integer arguments
     */
    protected _verifyArgs(): void {
        super._verifyArgs();
        const args: string[] = this.getParameter().getArgs();
        if (!Number.isInteger(Number(args[0])) ||
            !Number.isInteger(Number(args[1])) ||
            !Number.isInteger(Number(args[2])) ||
            !Number.isInteger(Number(args[3]))) {
            throw new Error(MESSAGE_INVALID_COORDINATE);
        }

        if (this.getParameter().getCanvas() == null) {
            throw new Error(MESSAGE_NULL_CANVAS);
        }

        const startX = parseInt(this.getParameter().getArg(0), 10) - 1;
        const startY = parseInt(this.getParameter().getArg(1), 10) - 1;
        const endX = parseInt(this.getParameter().getArg(2), 10) - 1;
        const endY = parseInt(this.getParameter().getArg(3), 10) - 1;
        if (startX < 0 || startX > this.getParameter().getCanvas().getWidth() - 1 ||
            endX < 0 || endX > this.getParameter().getCanvas().getWidth() - 1 ||
            startY < 0 || startY > this.getParameter().getCanvas().getHeight() - 1 ||
            endY < 0 || endY > this.getParameter().getCanvas().getHeight() - 1) {
            throw new Error(MESSAGE_COORDINATE_OUT_OF_RANGE);
        }
    }

}
