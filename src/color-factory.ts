import { Color } from "./color";

/**
 * A abstract factory class for creating a Color.
 * @class
 * @abstract
 */
export abstract class ColorFactory {

    /**
     * Create a Color
     * @return {Color} the color created
     */
    public abstract create(): Color;
}
