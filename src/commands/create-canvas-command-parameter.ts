import { CommandParameter } from "./command-parameter";
import { ColorFactory } from "../color-factory";

/**
 * CreateCanvasCommandParameter
 * @class
 */
export class CreateCanvasCommandParameter extends CommandParameter {

    /**
     * Create a CreateCanvasCommandParameter
     * @constructor
     * @param {ColorFactory} backgroundColorFactory - The color factory used to create the background color of the canvas
     * @param {string[]} args - The command argument to create a canvas
     */
    constructor(private backgroundColorFactory: ColorFactory, args: string[]) {
        super(args);
    }

    /**
     * Return the background color factory
     * @return {ColorFactory}
     */
    public getBackgroundColorFactory(): ColorFactory {
        return this.backgroundColorFactory;
    }

}
