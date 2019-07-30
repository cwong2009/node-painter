import { Color } from "./color";
import { ColorFactory } from "./color-factory";

// The max height of the canvas
export const CANVAS_MAX_HEIGHT: number = 100;

// The max width of the canvas
export const CANVAS_MAX_WIDTH: number = 100;

// The error message for height or width out of bound
const MESSAGE_INVALID_SIZE: string = "The width and height of the canvas must be integer with min=1, max=100.";
/**
 * Canvas
 * @class
 */
export class Canvas {

    /**
     * A 2D array that represents the pixels in the canvas.
     *   First dimension - Y-Axis, the first element represent the topmost
     *   Second dimension - X-Axis, the first element represent the leftmost
     *
     * Example - 3x3 Canvas
     *   [0][0],[0][1],[0][2]
     *   [1][0],[1][1],[1][2]
     *   [2][0],[2][1],[2][2]
     * @private
     */
    private pixels: Color[][];

    /**
     * Create a Canvas.
     * @constructor
     * @param {number} width - The width of the canvas.
     * @param {number} height - The height of the canvas.
     * @param {ColorFactory} backgroundColorFactory - The background color of the canvas.
     */
    constructor(private width: number, private height: number, private backgroundColorFactory: ColorFactory) {
        if ((width < 1 || width > CANVAS_MAX_WIDTH) ||
            (height < 1 || height > CANVAS_MAX_HEIGHT)) {
            throw new Error(MESSAGE_INVALID_SIZE);
        }

        this.height = height;
        this.width = width;
        this.pixels = Array(this.height).fill([null]).map(
            () => Array(this.width).fill({}).map(
                () => this._createBackgroundPixel(),
            ),
        );
    }

    /**
     * Return the pixels array from canvas
     * @return {Color[][]}
     */
    public getPixels(): Color[][] {
        return this.pixels;
    }

    /**
     * Return a pixel.
     * @param {number} x - The x-coordinate (zero-based indexing) start from the leftmost of the canvas.
     * @param {number} y - The y-coordinate (zero-based indexing) start from the topmost of the canvas.
     * @return {Color}
     */
    public getPixel(x: number, y: number): Color {
        return this.pixels[y][x];
    }

    /**
     * Set the color for a pixel.
     * @param {number} x - The x-coordinate (1-based indexing) start from the leftmost of the canvas.
     * @param {number} y - The y-coordinate (1-based indexing) start from the topmost of the canvas.
     * @param {number} color - The color of the pixel.
     * @return {Color}
     */
    public setPixel(x: number, y: number, color: Color): void {
        this.pixels[y][x] = color;
    }

    /**
     * Return the height of the canvas
     * @return {number}
     */
    public getHeight(): number {
        return this.height;
    }

    /**
     * Return the width of the canvas
     * @return {number}
     */
    public getWidth(): number {
        return this.width;
    }

    /**
     * Render the canvas with a frame
     * @return {string}
     */
    public render(): string {
        let result = `-${"-".repeat(this.width)}-\n`;

        this.pixels.forEach((row) => {
            result += "|";
            row.forEach((element) => {
                result += this._renderElement(element);
            });
            result += "|\n";
        });
        result += `-${"-".repeat(this.width)}-`;

        return result;
    }

    /**
     * Create a pixel
     * @private
     * @return {Color}
     */
    private _createBackgroundPixel(): Color {
        return this.backgroundColorFactory.create();
    }

    /**
     * Render a string value that represents the color
     * @private
     * @return {string}
     */
    private _renderElement(element: Color): string {
        return element.getColor();
    }

}
