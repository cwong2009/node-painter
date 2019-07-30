import { Canvas } from "../canvas";
import { CommandParameter } from "./command-parameter";

/**
 * DrawCommandParameter
 * @class
 */
export class DrawCommandParameter extends CommandParameter {

    /**
     * Create a DrawCommandParameter.
     * @constructor
     * @param {Canvas} Canvas - The target canvas for the command
     * @param {string[]} args - The command arguments
     */
    constructor(private canvas: Canvas, args: string[]) {
        super(args);
    }

    /**
     * Return the canvas
     * @return {Canvas}
     */
    public getCanvas(): Canvas {
        return this.canvas;
    }

}
