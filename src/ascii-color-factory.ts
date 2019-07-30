import { ColorFactory } from "./color-factory";
import { AsciiColor } from "./ascii-color";

/**
 * A factory class for creating a AsciiColor.
 * @class
 */
export class AsciiColorFactory extends ColorFactory {

    /**
     * Create a AsciiColorFactory.
     * @constructor
     * @param {string} char - A character that represent the color
     */
    constructor(private char: string) {
        super();
    }

    /**
     * Create a AsciiColor
     * @return {Color} the color created
     */
    public create(): AsciiColor {
        return new AsciiColor(this.char);
    }

}
