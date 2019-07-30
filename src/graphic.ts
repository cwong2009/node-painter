import { Canvas } from "./canvas";
import { ColorFactory } from "./color-factory";
import { Color } from "./color";

export class Graphic {

    constructor(private _canvas: Canvas) { }

    public drawLine(x0: number, y0: number, x1: number, y1: number, colorFactory: ColorFactory): void {
        this._plotLine(x0, y0, x1, y1, colorFactory);
    }

    public fillColor(start, target: Color, replacementFactory: ColorFactory): void {
        this._floodFill(start, target, replacementFactory);
    }

    public drawRectangle(x0: number, y0: number, x1: number, y1: number, colorFactory: ColorFactory): void {
        this._plotRectangle(x0, y0, x1, y1, colorFactory);
    }

    private _setPixel(x: number, y: number, colorFactory: ColorFactory): void {
        this._canvas.setPixel(x, y, colorFactory.create());
    }

    private _getPixel(x: number, y: number): Color {
        return this._canvas.getPixel(x, y);
    }

    /**
     * Plot the border of the rectangle by two opposite vertices
     * @private
     * @return {void}
     */
    private _plotRectangle(x0: number, y0: number, x1: number, y1: number, colorFactory: ColorFactory): void {
        const _startX: number = Math.min(x0, x1);
        const _startY: number = Math.min(y0, y1);
        const _endX: number = Math.max(x0, x1);
        const _endY: number = Math.max(y0, y1);

        for (let x = _startX; x <= _endX; x++) {
            this._setPixel(x, _startY, colorFactory);
            this._setPixel(x, _endY, colorFactory);
        }

        for (let y = _startY; y <= _endY; y++) {
            this._setPixel(_startX, y, colorFactory);
            this._setPixel(_endX, y, colorFactory);
        }
    }

    /**
     * Implements Flood fill using queue
     * @private
     * Reference:
     *   - @see https://en.wikipedia.org/wiki/Flood_fill#Alternative_implementations
     */
    /* tslint:disable:cognitive-complexity */
    private _floodFill(node, target: Color, replacementFactory: ColorFactory): void {
        const width: number = this._canvas.getWidth();
        const height: number = this._canvas.getHeight();
        const replacement: Color = replacementFactory.create();
        if (target.equals(replacement)) {
            return;
        }
        if (!this._getPixel(node.x, node.y).equals(target)) {
            return;
        }

        const queue = [];

        // add the starting node to the queue
        queue.push(node);
        /* tslint:disable:no-conditional-assignment */
        for (let n; (n = queue.shift());) {
            // Find westmost w and eastmost e that the color match target
            let w;
            let e;
            /* tslint:disable:no-empty */
            for (w = n.x; (w >= 0) && this._getPixel(w, n.y).equals(target); w--) { }
            /* tslint:disable:no-empty */
            for (e = n.x + 1; (e <= width - 1) && this._getPixel(e, n.y).equals(target); e++) { }

            // For each node n between w and e
            for (let x = w + 1; x <= e - 1; x++) {
                // repalce color on the node
                this._setPixel(x, n.y, replacementFactory);

                // add the north node to queue if color match target
                if (n.y > 0 && this._getPixel(x, n.y - 1).equals(target)) {
                    queue.push({ x, y: n.y - 1 });
                }

                // add the south node to queue  if color match target
                if (n.y < height - 1 && this._getPixel(x, n.y + 1).equals(target)) {
                    queue.push({ x, y: n.y + 1 });
                }
            }
        }
    }

    /**
     * * Plot line
     * Implements Bresenham's line algorithm
     * Reference:
     *   - @see https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm
     *   - @see http://web.cs.ucdavis.edu/~ma/ECS175_S01/handouts/Bresenham.pdf
     *
     * @return {void}
     */
    private _plotLine(x0: number, y0: number, x1: number, y1: number, colorFactory: ColorFactory): void {
        if (Math.abs(x1 - x0) > Math.abs(y1 - y0)) {
            if (x1 > x0) {
                this._plotLineLow(this._canvas, x0, y0, x1, y1, colorFactory);
            } else {
                this._plotLineLow(this._canvas, x1, y1, x0, y0, colorFactory);
            }
        } else {
            if (y1 > y0) {
                this._plotLineHigh(this._canvas, x0, y0, x1, y1, colorFactory);
            } else {
                this._plotLineHigh(this._canvas, x1, y1, x0, y0, colorFactory);
            }
        }
    }

    /**
     * Plot line for  -1 < gradient < 1
     * @return {void}
     */
    private _plotLineLow(canvas: Canvas, x0: number, y0: number, x1: number, y1: number, colorFactory: ColorFactory): void {
        const deltaX: number = x1 - x0;
        let deltaY: number = y1 - y0;
        let y_i = 1;
        let y = y0;
        if (deltaY < 0) {
            y_i = -1;
            deltaY *= -1;
        }
        let P = 2 * deltaY - deltaX;
        this._setPixel(x0, y0, colorFactory);
        for (let x = x0 + 1; x <= x1; x++) {
            if (P >= 0) {
                y += y_i;
                P = P - 2 * deltaX;
            }
            P = P + 2 * deltaY;
            this._setPixel(x, y, colorFactory);
        }
    }

    /**
     * Plot line for  gradient <= - 1 or gradient >=1
     * @return {void}
     */
    private _plotLineHigh(canvas: Canvas, x0: number, y0: number, x1: number, y1: number, colorFactory: ColorFactory): void {
        let deltaX: number = x1 - x0;
        const deltaY: number = y1 - y0;
        let x_i = 1;
        let x = x0;
        if (deltaX < 0) {
            x_i = -1;
            deltaX *= -1;
        }
        let P = 2 * deltaX - deltaY;
        this._setPixel(x0, y0, colorFactory);
        for (let y = y0 + 1; y <= y1; y++) {
            if (P >= 0) {
                x += x_i;
                P = P - 2 * deltaY;
            }
            P = P + 2 * deltaX;
            this._setPixel(x, y, colorFactory);
        }
    }
}
