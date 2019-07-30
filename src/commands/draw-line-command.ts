import { Command } from "./command";
import { Canvas } from "../canvas";
import { CommandParameter } from "./command-parameter";
import { Color } from "../color";
import { DrawCommandParameter } from "./draw-command-parameter";
import { ColorFactory } from "../color-factory";
import { AsciiColorFactory } from "../ascii-color-factory";
import { Graphic } from "../graphic";

// The error message for a coordinates input out of canvas bounds
const MESSAGE_COORDINATE_OUT_OF_RANGE: string = "Coordinates input out of canvas bounds. Please enter again.";

// The error message for a non integer coordinates input
const MESSAGE_INVALID_COORDINATE: string = "Coordinates input contains non integer values. Please enter again.";

// The command prefix for DrawLineCommand
export const DRAW_LINE_COMMAND: string = "L";

// The color used to in DrawLineCommand
export const LINE_COLOR: string = "x";

// The error message for null canvas
const MESSAGE_NULL_CANVAS: string = "The Canvas has not been created yet. Please enter again.";

/**
 * DrawLineCommand
 * @class
 */
export class DrawLineCommand extends Command {

    /** @private The ColorFactory used to create the line color */
    private _lineColorFactory: ColorFactory;

    /** @private The x-coordinate of the start point */
    private _startX: number;

    /** @private The Y-coordinate of the start point */
    private _startY: number;

    /** @private The x-coordinate of the end point */
    private _endX: number;

    /** @private The y-coordinate of the end point */
    private _endY: number;

    /**
     * Create a DrawLineCommand
     * @constructor
     * @param {DrawCommandParameter} context - The command context
     */
    constructor(parameter: DrawCommandParameter) {
        super(parameter);

        this._lineColorFactory = new AsciiColorFactory(LINE_COLOR);
        this._startX = parseInt(this.getParameter().getArg(0), 10) - 1;
        this._startY = parseInt(this.getParameter().getArg(1), 10) - 1;
        this._endX = parseInt(this.getParameter().getArg(2), 10) - 1;
        this._endY = parseInt(this.getParameter().getArg(3), 10) - 1;
    }

    /**
     * Return the canvas
     * @return {Canvas}
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
     * Return the canvas
     * @return {Canvas}
     */
    public getResult(): Canvas {
        return this.getParameter().getCanvas();
    }

    /**
     * Execute the command to draw a line
     * @return {void}
     */
    public execute(): void {
        const canvas: Canvas = this.getParameter().getCanvas();
        const x0: number = this._startX;
        const y0: number = this._startY;
        const x1: number = this._endX;
        const y1: number = this._endY;

        const g: Graphic = new Graphic(canvas);
        g.drawLine(x0, y0, x1, y1, this._lineColorFactory);
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
