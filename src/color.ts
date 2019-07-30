/**
 * Color
 * @class
 * @abstract
 */
export abstract class Color {

    /**
     * Compares this Color to the specified Color.
     * @param {Color} A Color to be compared for equality
     * @return {boolean} true if the given Color is equivalent to this Color, false otherwise
     */
    public abstract equals(c: Color): boolean;

    /**
     * Return the string value of color
     * @return {string}
     */
    public abstract getColor(): string;
}
