import { assert, expect } from 'chai';
import { Color } from '../../src/color';
import { Canvas } from '../../src/canvas';
import { AsciiColor } from '../../src/ascii-color';
import { AsciiColorFactory } from '../../src/ascii-color-factory';
import { DrawCommandParameter } from '../../src/commands/draw-command-parameter';
import { CreateCanvasCommandParameter } from '../../src/commands/create-canvas-command-parameter';
import { CreateCanvasCommand } from '../../src/commands/create-canvas-command';
import { DrawLineCommand } from '../../src/commands/draw-line-command';
import { createCanvas, drawLine } from '../testing.util';

describe('Integration Test - Draw line', function () {

    const RESULT_HORIZONTAL_LINE_2_2_15_2: string =
        '----------------------' + '\n' +
        '|                    |' + '\n' +
        '| xxxxxxxxxxxxxx     |' + '\n' +
        '|                    |' + '\n' +
        '|                    |' + '\n' +
        '|                    |' + '\n' +
        '|                    |' + '\n' +
        '|                    |' + '\n' +
        '|                    |' + '\n' +
        '|                    |' + '\n' +
        '|                    |' + '\n' +
        '----------------------';

    const RESULT_VERTICAL_LINE_3_3_3_10: string =
        '----------------------' + '\n' +
        '|                    |' + '\n' +
        '|                    |' + '\n' +
        '|  x                 |' + '\n' +
        '|  x                 |' + '\n' +
        '|  x                 |' + '\n' +
        '|  x                 |' + '\n' +
        '|  x                 |' + '\n' +
        '|  x                 |' + '\n' +
        '|  x                 |' + '\n' +
        '|  x                 |' + '\n' +
        '----------------------';

    const RESULT_LINE_1_1_6_6: string =
        '--------' + '\n' +
        '|x     |' + '\n' +
        '| x    |' + '\n' +
        '|  x   |' + '\n' +
        '|   x  |' + '\n' +
        '|    x |' + '\n' +
        '|     x|' + '\n' +
        '--------';

    const RESULT_LINE_1_6_6_1: string =
        '--------' + '\n' +
        '|     x|' + '\n' +
        '|    x |' + '\n' +
        '|   x  |' + '\n' +
        '|  x   |' + '\n' +
        '| x    |' + '\n' +
        '|x     |' + '\n' +
        '--------';

    const RESULT_LINE_QUADRANT_1__1_2_4_1: string =
        '------' + '\n' +
        '|  xx|' + '\n' +
        '|xx  |' + '\n' +
        '------';

    const RESULT_LINE_QUADRANT_1__2_2_3_1: string =
        '------' + '\n' +
        '|  x |' + '\n' +
        '| x  |' + '\n' +
        '------';

    const RESULT_LINE_QUADRANT_2__4_2_1_1: string =
        '------' + '\n' +
        '|xx  |' + '\n' +
        '|  xx|' + '\n' +
        '------';
    const RESULT_LINE_QUADRANT_2__3_2_2_1: string =
        '------' + '\n' +
        '| x  |' + '\n' +
        '|  x |' + '\n' +
        '------';

    const RESULT_LINE_QUADRANT_3__4_1_1_2: string =
        '------' + '\n' +
        '|  xx|' + '\n' +
        '|xx  |' + '\n' +
        '------';
    const RESULT_LINE_QUADRANT_3__3_1_2_2: string =
        '------' + '\n' +
        '|  x |' + '\n' +
        '| x  |' + '\n' +
        '------';

    const RESULT_LINE_QUADRANT_4__1_1_4_2: string =
        '------' + '\n' +
        '|xx  |' + '\n' +
        '|  xx|' + '\n' +
        '------';
    const RESULT_LINE_QUADRANT_4__2_1_3_2: string =
        '------' + '\n' +
        '| x  |' + '\n' +
        '|  x |' + '\n' +
        '------';


    let canvas: Canvas;
    const WIDTH_VALUE: number = 20;
    const HEIGHT_VALUE: number = 10;
    beforeEach(function () {
        canvas = createCanvas(WIDTH_VALUE, HEIGHT_VALUE);
    });

    it('should draw a line from (2,2) to (15,2) and render\n' + RESULT_HORIZONTAL_LINE_2_2_15_2, function () {
        let args = ["2", "2", "15", "2"];
        canvas = drawLine(canvas, args);
        expect(canvas.render()).to.be.equal(RESULT_HORIZONTAL_LINE_2_2_15_2);
    });

    it('should draw a line from (15,2) to (2,2) and render\n' + RESULT_HORIZONTAL_LINE_2_2_15_2, function () {
        let args = ["15", "2", "2", "2"];
        canvas = drawLine(canvas, args);
        expect(canvas.render()).to.be.equal(RESULT_HORIZONTAL_LINE_2_2_15_2);
    });

    it('should draw a line from (3,3) to (3,10) and render\n' + RESULT_VERTICAL_LINE_3_3_3_10, function () {
        let args = ["3", "3", "3", "10"];
        canvas = drawLine(canvas, args);
        expect(canvas.render()).to.be.equal(RESULT_VERTICAL_LINE_3_3_3_10);
    });

    it('should draw a line from (3,10) to (3,3) and render\n' + RESULT_VERTICAL_LINE_3_3_3_10, function () {
        let args = ["3", "10", "3", "3"];
        canvas = drawLine(canvas, args);
        expect(canvas.render()).to.be.equal(RESULT_VERTICAL_LINE_3_3_3_10);
    });

    /**
     * Trivial Diagonal case for the Bresenham's line algorithm
     */
    describe('Diagonal', function () {
        beforeEach(function () {
            canvas = createCanvas(6, 6);
        });

        it('should draw a line from (1,1) to (6,6) and render\n' + RESULT_LINE_1_1_6_6, function () {
            let args = ["1", "1", "6", "6"];
            canvas = drawLine(canvas, args);
            expect(canvas.render()).to.be.equal(RESULT_LINE_1_1_6_6);
        });

        it('should draw a line from (6,6) to (1,1) and render\n' + RESULT_LINE_1_1_6_6, function () {
            let args = ["6", "6", "1", "1"];
            canvas = drawLine(canvas, args);
            expect(canvas.render()).to.be.equal(RESULT_LINE_1_1_6_6);
        });

        it('should draw a line from (1,6) to (6,1) and render\n' + RESULT_LINE_1_6_6_1, function () {
            let args = ["1", "6", "6", "1"];
            canvas = drawLine(canvas, args);
            expect(canvas.render()).to.be.equal(RESULT_LINE_1_6_6_1);
        });

        it('should draw a line from (6,1) to (1,6) and render\n' + RESULT_LINE_1_6_6_1, function () {
            let args = ["6", "1", "1", "6"];
            canvas = drawLine(canvas, args);
            expect(canvas.render()).to.be.equal(RESULT_LINE_1_6_6_1);
        });
    });

    describe('Slanting line', function () {
        beforeEach(function () {
            canvas = createCanvas(4, 2);
        });

        it('should draw a line from (1,2) to (4,1) and render\n' + RESULT_LINE_QUADRANT_1__1_2_4_1, function () {
            let args = ["1", "2", "4", "1"];
            canvas = drawLine(canvas, args);
            expect(canvas.render()).to.be.equal(RESULT_LINE_QUADRANT_1__1_2_4_1);
        });

        it('should draw a line from (2,2) to (3,1) and render\n' + RESULT_LINE_QUADRANT_1__2_2_3_1, function () {
            let args = ["2", "2", "3", "1"];
            canvas = drawLine(canvas, args);
            expect(canvas.render()).to.be.equal(RESULT_LINE_QUADRANT_1__2_2_3_1);
        });

        it('should draw a line from (4,2) to (1,1) and render\n' + RESULT_LINE_QUADRANT_2__4_2_1_1, function () {
            let args = ["4", "2", "1", "1"];
            canvas = drawLine(canvas, args);
            expect(canvas.render()).to.be.equal(RESULT_LINE_QUADRANT_2__4_2_1_1);
        });

        it('should draw a line from (3,2) to (2,1) and render\n' + RESULT_LINE_QUADRANT_2__3_2_2_1, function () {
            let args = ["3", "2", "2", "1"];
            canvas = drawLine(canvas, args);
            expect(canvas.render()).to.be.equal(RESULT_LINE_QUADRANT_2__3_2_2_1);
        });

        it('should draw a line from (4,1) to (1,2) and render\n' + RESULT_LINE_QUADRANT_3__4_1_1_2, function () {
            let args = ["4", "1", "1", "2"];
            canvas = drawLine(canvas, args);
            expect(canvas.render()).to.be.equal(RESULT_LINE_QUADRANT_3__4_1_1_2);
        });

        it('should draw a line from (3,1) to (2,2) and render\n' + RESULT_LINE_QUADRANT_3__3_1_2_2, function () {
            let args = ["3", "1", "2", "2"];
            canvas = drawLine(canvas, args);
            expect(canvas.render()).to.be.equal(RESULT_LINE_QUADRANT_3__3_1_2_2);
        });

        it('should draw a line from (1,1) to (4,2) and render\n' + RESULT_LINE_QUADRANT_4__1_1_4_2, function () {
            let args = ["1", "1", "4", "2"];
            canvas = drawLine(canvas, args);
            expect(canvas.render()).to.be.equal(RESULT_LINE_QUADRANT_4__1_1_4_2);
        });

        it('should draw a line from (2,1) to (3,2) and render\n' + RESULT_LINE_QUADRANT_4__2_1_3_2, function () {
            let args = ["2", "1", "3", "2"];
            canvas = drawLine(canvas, args);
            expect(canvas.render()).to.be.equal(RESULT_LINE_QUADRANT_4__2_1_3_2);
        });
    });

});

