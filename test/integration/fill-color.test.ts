import { assert, expect } from 'chai';
import { Canvas } from '../../src/canvas';
import { EMPTY_COLOR, VALID_FILL_COLOR, EMPTY_COLOR_FACTORY, LINE_COLOR_FACTORY, FILL_COLOR_FACTORY, createCanvas, createCanvasForBoundaryCases, drawLine, fillColor, drawRectangle } from '../testing.util';

describe('Integration Test - Fill color', function () {

    const RESULT_FILL_RECTANGLE_2_3_10_8: string =
        '----------------------' + '\n' +
        '|                    |' + '\n' +
        '|                    |' + '\n' +
        '| xxxxxxxxx          |' + '\n' +
        '| xcccccccx          |' + '\n' +
        '| xcccccccx          |' + '\n' +
        '| xcccccccx          |' + '\n' +
        '| xcccccccx          |' + '\n' +
        '| xxxxxxxxx          |' + '\n' +
        '|                    |' + '\n' +
        '|                    |' + '\n' +
        '----------------------';

    const RESULT_FILL_FULL: string =
        '----------------------' + '\n' +
        '|cccccccccccccccccccc|' + '\n' +
        '|cccccccccccccccccccc|' + '\n' +
        '|cccccccccccccccccccc|' + '\n' +
        '|cccccccccccccccccccc|' + '\n' +
        '|cccccccccccccccccccc|' + '\n' +
        '|cccccccccccccccccccc|' + '\n' +
        '|cccccccccccccccccccc|' + '\n' +
        '|cccccccccccccccccccc|' + '\n' +
        '|cccccccccccccccccccc|' + '\n' +
        '|cccccccccccccccccccc|' + '\n' +
        '----------------------';

    const RESULT_RECTANGLE_2_3_10_8_FILL_OUTSIDE_THEN_FILL_INSIDE_: string =
        '----------------------' + '\n' +
        '|!!!!!!!!!!!!!!!!!!!!|' + '\n' +
        '|!!!!!!!!!!!!!!!!!!!!|' + '\n' +
        '|!xxxxxxxxx!!!!!!!!!!|' + '\n' +
        '|!x^^^^^^^x!!!!!!!!!!|' + '\n' +
        '|!x^^^^^^^x!!!!!!!!!!|' + '\n' +
        '|!x^^^^^^^x!!!!!!!!!!|' + '\n' +
        '|!x^^^^^^^x!!!!!!!!!!|' + '\n' +
        '|!xxxxxxxxx!!!!!!!!!!|' + '\n' +
        '|!!!!!!!!!!!!!!!!!!!!|' + '\n' +
        '|!!!!!!!!!!!!!!!!!!!!|' + '\n' +
        '----------------------';

    let canvas: Canvas;
    const FILL_COLOR: string = "c";
    const WIDTH_VALUE: number = 20;
    const HEIGHT_VALUE: number = 10;
    
    beforeEach(function () {
        canvas = createCanvas(WIDTH_VALUE, HEIGHT_VALUE);
    });

    it('should fill color in the whole canvas\n' + RESULT_FILL_FULL, function () {
        let args = ["2", "2", FILL_COLOR];
        canvas = fillColor(canvas, args);

        expect(canvas.render()).to.be.equal(RESULT_FILL_FULL);
    });

    describe('Fill color in rectangle', function () {
        beforeEach(function () {
        });

        it('should fill color in the rectangle\n' + RESULT_FILL_RECTANGLE_2_3_10_8, function () {
            canvas = drawRectangle(canvas, ["10", "8", "2", "3"]);
            canvas = fillColor(canvas, ["3", "4", FILL_COLOR]);

            expect(canvas.render()).to.be.equal(RESULT_FILL_RECTANGLE_2_3_10_8);
        });

        it('should fill the same area \n' + RESULT_FILL_RECTANGLE_2_3_10_8, function () {
            canvas = drawRectangle(canvas, ["10", "8", "2", "3"]);
            canvas = fillColor(canvas, ["3", "4", FILL_COLOR]);
            canvas = fillColor(canvas, ["3", "4", FILL_COLOR]);

            expect(canvas.render()).to.be.equal(RESULT_FILL_RECTANGLE_2_3_10_8);
        });


        it('should fill "^" inside the rectangle in a canvas with background "!"\n' + RESULT_RECTANGLE_2_3_10_8_FILL_OUTSIDE_THEN_FILL_INSIDE_, function () {
            canvas = fillColor(canvas, ["1", "1", "!"]);
            canvas = drawRectangle(canvas, ["2", "8", "10", "3"]);
            canvas = fillColor(canvas, ["3", "4", "^"]);

            expect(canvas.render()).to.be.equal(RESULT_RECTANGLE_2_3_10_8_FILL_OUTSIDE_THEN_FILL_INSIDE_);
        });
    });

});