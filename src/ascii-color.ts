import { Color } from "./color";

// The error message for a coordinates input out of canvas bounds
const MESSAGE_INVALID_COLOR_VALUE: string = "Only ASCII character is supported. Please enter again.";

/**
 * AsciiC olor
 * @class
 */
export class AsciiColor extends Color {

    /**
     * Create a AsciiColor.
     * @constructor
     * @param {string} char - A character that represent the color
     */
    constructor(private char: string) {
        super();
        if (!this._isPrintableAscii(char, false)) {
            throw new Error(MESSAGE_INVALID_COLOR_VALUE);
        }
        else {
            this.char = char;
        }
    }

    /**
     * Return the color
     * @return {string}
     */
    public getColor(): string {
        return this.char;
    }

    /**
     * Compares this AsciiColor to the specified Color.
     * @param {AsciiColor} A AsciiColor to be compared for equality
     * @return {boolean} true if the char value of the given AsciiColor
     * is equal to the char value of this AsciiColor, false otherwise
     */
    public equals(c: AsciiColor): boolean {
        return (c) ? this.char === c.char : false;
    }

    /**
     * Return the color
     * @param {str} str - the string to check whether it is a printable ascii char
     * @param {boolean} extended - true if include the extensions of ascii in the checking
     * @return {boolean}
     */
    private _isPrintableAscii(str: string, extended: boolean): boolean {
        return (extended ? /^[\x20-\xFF]*$/ : /^[\x20-\x7F]*$/).test(str);
    }

}
