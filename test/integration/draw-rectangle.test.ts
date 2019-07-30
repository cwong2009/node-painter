import { assert, expect } from 'chai';
import { Canvas } from '../../src/canvas';
import { createCanvas, drawRectangle, fillColor } from '../testing.util';

describe('Integration Test - Draw Rectangle', function () {

    const RESULT_RECTANGLE_2_3_10_8: string =
        '----------------------' + '\n' +
        '|                    |' + '\n' +
        '|                    |' + '\n' +
        '| xxxxxxxxx          |' + '\n' +
        '| x       x          |' + '\n' +
        '| x       x          |' + '\n' +
        '| x       x          |' + '\n' +
        '| x       x          |' + '\n' +
        '| xxxxxxxxx          |' + '\n' +
        '|                    |' + '\n' +
        '|                    |' + '\n' +
        '----------------------';

    const RESULT_RECTANGLE_2_3_10_8_FILL_OUTSIDE: string =
        '----------------------' + '\n' +
        '|!!!!!!!!!!!!!!!!!!!!|' + '\n' +
        '|!!!!!!!!!!!!!!!!!!!!|' + '\n' +
        '|!xxxxxxxxx!!!!!!!!!!|' + '\n' +
        '|!x!!!!!!!x!!!!!!!!!!|' + '\n' +
        '|!x!!!!!!!x!!!!!!!!!!|' + '\n' +
        '|!x!!!!!!!x!!!!!!!!!!|' + '\n' +
        '|!x!!!!!!!x!!!!!!!!!!|' + '\n' +
        '|!xxxxxxxxx!!!!!!!!!!|' + '\n' +
        '|!!!!!!!!!!!!!!!!!!!!|' + '\n' +
        '|!!!!!!!!!!!!!!!!!!!!|' + '\n' +
        '----------------------';

    let canvas: Canvas;
    const EMPTY_COLOR = ' ';
    const LINE_COLOR: string = "x";
    const WIDTH_VALUE: number = 20;
    const HEIGHT_VALUE: number = 10;
    let cnt = 0;
    beforeEach(function () {
        canvas = createCanvas(WIDTH_VALUE, HEIGHT_VALUE);
    });

    it('should draw a rectangle from (2,3) to (10,8)\n' + RESULT_RECTANGLE_2_3_10_8, function () {
        canvas = drawRectangle(canvas, ["2", "3", "10", "8"]);

        expect(canvas.render()).to.be.equal(RESULT_RECTANGLE_2_3_10_8);
    });

    it('should draw a rectangle from (10,8) to (2,3)\n' + RESULT_RECTANGLE_2_3_10_8, function () {
        canvas = drawRectangle(canvas, ["10", "8", "2", "3"]);

        expect(canvas.render()).to.be.equal(RESULT_RECTANGLE_2_3_10_8);
    });

    it('should draw a rectangle from (10,3) to (2,8)\n' + RESULT_RECTANGLE_2_3_10_8, function () {
        canvas = drawRectangle(canvas, ["10", "3", "2", "8"]);

        expect(canvas.render()).to.be.equal(RESULT_RECTANGLE_2_3_10_8);
    });

    it('should draw a rectangle from (2,8) to (10,3)\n' + RESULT_RECTANGLE_2_3_10_8, function () {
        canvas = drawRectangle(canvas, ["2", "8", "10", "3"]);

        expect(canvas.render()).to.be.equal(RESULT_RECTANGLE_2_3_10_8);
    });

    it('should draw a rectangle from (2,8) to (10,3) in a pre-filled with "!" canvas\n' + RESULT_RECTANGLE_2_3_10_8_FILL_OUTSIDE, function () {
        canvas = fillColor(canvas, ["1", "1", "!"]);
        canvas = drawRectangle(canvas, ["2", "8", "10", "3"]);

        expect(canvas.render()).to.be.equal(RESULT_RECTANGLE_2_3_10_8_FILL_OUTSIDE);
    });

});