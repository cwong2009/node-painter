import { Command } from "./command";
import { Canvas } from "../canvas";
import { Color } from "../color";

import { CommandParameter } from "./command-parameter";
import { DrawCommandParameter } from "./draw-command-parameter";
import { ColorFactory } from "../color-factory";
import { AsciiColorFactory } from "../ascii-color-factory";
import { Graphic } from "../graphic";

// The error message for a coordinates input out of canvas bounds
const MESSAGE_COORDINATE_OUT_OF_RANGE: string = "Coordinates input out of canvas bounds. Please enter again.";

// The error message for a non integer coordinates input
const MESSAGE_INVALID_COORDINATE: string = "Coordinates input contains non integer values. Please enter again.";

// The error message for a invalid color value
const MESSAGE_INVALID_FILL_COLOR: string = "The length of the color value must be 1. Please enter again.";

// The error message for null canvas
const MESSAGE_NULL_CANVAS: string = "The Canvas has not been created yet. Please enter again.";

// The command prefix for FillColorCommand
export const FILL_COLOR_COMMAND: string = "B";

// FillColorCommand
export class FillColorCommand extends Command {

    /** @private The ColorFactory used to create the color of the rectangle border */
    private _fillColorFactory: ColorFactory;

    /** @private The ColorFactory used to create the color of the rectangle border */
    private _x: number;

    /** @private The ColorFactory used to create the color of the rectangle border */
    private _y: number;

    /**
     * Create a DrawRectangleCommand
     * @constructor
     * @param {DrawCommandParameter} context - The command context
     */
    constructor(parameter: DrawCommandParameter) {
        super(parameter);

        // convert x, y to zero-based index
        this._x = parseInt(this.getParameter().getArg(0), 10) - 1;
        this._y = parseInt(this.getParameter().getArg(1), 10) - 1;

        this._fillColorFactory = new AsciiColorFactory(this.getParameter().getArg(2));
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
        return 3;
    }

    /**
     * Execute the command to fill color
     * @return {void}
     */
    public getResult(): Canvas {
        return this.getParameter().getCanvas();
    }

    /**
     * Execute the command to fill color
     * @return {void}
     */
    public execute(): void {
        const canvas: Canvas = this.getParameter().getCanvas();
        const x: number = this._x;
        const y: number = this._y;

        const g: Graphic = new Graphic(canvas);
        g.fillColor({ x, y }, canvas.getPixel(this._x, this._y), this._fillColorFactory);
    }

    /**
     * Verify the command arguments
     * @private
     * @param {string[]} args - The command arguments
     * @throws {Error}  throws error if args[0] is not a number OR
     *                                  args[1] is not a number OR
     *                                  length of args[2] is not exactly 1
     */
    protected _verifyArgs(): void {
        super._verifyArgs();
        const args: string[] = this.getParameter().getArgs();
        if (!Number.isInteger(Number(args[0])) || !Number.isInteger(Number(args[1]))) {
            throw new Error(MESSAGE_INVALID_COORDINATE);
        }

        if (this.getParameter().getCanvas() == null) {
            throw new Error(MESSAGE_NULL_CANVAS);
        }

        const startX = parseInt(this.getParameter().getArg(0), 10) - 1;
        const startY = parseInt(this.getParameter().getArg(1), 10) - 1;
        if (startX < 0 || startX > this.getParameter().getCanvas().getWidth() - 1 ||
            startY < 0 || startY > this.getParameter().getCanvas().getHeight() - 1) {
            throw new Error(MESSAGE_COORDINATE_OUT_OF_RANGE);
        }

        if (args[2].length !== 1) {
            throw new Error(MESSAGE_INVALID_FILL_COLOR);
        }
    }

}
