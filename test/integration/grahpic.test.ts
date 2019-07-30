
import { assert, expect } from 'chai';
import { Graphic } from '../../src/graphic';
import sinon, { SinonStub } from 'sinon';
import { createCanvas, EMPTY_COLOR, EMPTY_COLOR_FACTORY } from '../testing.util';
import { Canvas } from '../../src/canvas';
import { AsciiColor } from '../../src/ascii-color';
import { AsciiColorFactory } from '../../src/ascii-color-factory';
import { Color } from '../../src/color';

describe('Integration Test - Graphic', function () {

    beforeEach(function () {

    });

    afterEach(function () {

    });

    describe('#drawLine', function () {
        it('should draw a line from (0,0) to (1,0)', function () {
            let canvas: Canvas = createCanvas(2, 2);
            let g: Graphic = new Graphic(canvas);
            g.drawLine(0, 0, 1, 0, new AsciiColorFactory('Q'));

            expect(canvas.getPixel(0, 0).equals(new AsciiColorFactory('Q').create()), `Pixels[0,0]`).to.be.true;
            expect(canvas.getPixel(1, 0).equals(new AsciiColorFactory('Q').create()), `Pixels[1,0]`).to.be.true;
            expect(canvas.getPixel(0, 1).equals(EMPTY_COLOR_FACTORY.create()), `Pixels[0,1]`).to.be.true;
            expect(canvas.getPixel(1, 1).equals(EMPTY_COLOR_FACTORY.create()), `Pixels[1,1]`).to.be.true;
        });

        it('should draw a diagonal line from (0,0) to (1,1)', function () {
            let canvas: Canvas = createCanvas(2, 2);
            let g: Graphic = new Graphic(canvas);
            g.drawLine(0, 0, 1, 1, new AsciiColorFactory('Q'));

            expect(canvas.getPixel(0, 0).equals(new AsciiColorFactory('Q').create()), `Pixels[0,0]`).to.be.true;
            expect(canvas.getPixel(1, 1).equals(new AsciiColorFactory('Q').create()), `Pixels[1,0]`).to.be.true;
            expect(canvas.getPixel(1, 0).equals(EMPTY_COLOR_FACTORY.create()), `Pixels[0,1]`).to.be.true;
            expect(canvas.getPixel(0, 1).equals(EMPTY_COLOR_FACTORY.create()), `Pixels[1,1]`).to.be.true;
        });
    });

    describe('#drawRectangle', function () {
        it('should draw a rectangle from (0,0) to (2,2)', function () {
            let canvas: Canvas = createCanvas(3, 3);
            let g: Graphic = new Graphic(canvas);
            g.drawRectangle(0, 0, 2, 2, new AsciiColorFactory('Q'));

            expect(canvas.getPixel(0, 0).equals(new AsciiColorFactory('Q').create()), `Pixels[0,0]`).to.be.true;
            expect(canvas.getPixel(0, 1).equals(new AsciiColorFactory('Q').create()), `Pixels[0,0]`).to.be.true;
            expect(canvas.getPixel(0, 2).equals(new AsciiColorFactory('Q').create()), `Pixels[0,0]`).to.be.true;
            expect(canvas.getPixel(1, 0).equals(new AsciiColorFactory('Q').create()), `Pixels[1,0]`).to.be.true;
            expect(canvas.getPixel(1, 1).equals(EMPTY_COLOR_FACTORY.create()), `Pixels[0,1]`).to.be.true;
            expect(canvas.getPixel(1, 2).equals(new AsciiColorFactory('Q').create()), `Pixels[1,0]`).to.be.true;
            expect(canvas.getPixel(2, 0).equals(new AsciiColorFactory('Q').create()), `Pixels[0,0]`).to.be.true;
            expect(canvas.getPixel(2, 1).equals(new AsciiColorFactory('Q').create()), `Pixels[0,0]`).to.be.true;
            expect(canvas.getPixel(2, 2).equals(new AsciiColorFactory('Q').create()), `Pixels[0,0]`).to.be.true;
        });
    });

    describe('#fillColor', function () {
        it('should fill color in whole canvas if the target color matchs with the coordinate chosen', function () {
            let canvas: Canvas = createCanvas(2, 2);
            let g: Graphic = new Graphic(canvas);
            g.fillColor({ x: 0, y: 0 }, EMPTY_COLOR_FACTORY.create(), new AsciiColorFactory('Q'));

            canvas.getPixels().forEach((row: Color[], y: number) => {
                row.forEach((p: Color, x: number) => {
                    expect(p.equals(new AsciiColorFactory('Q').create()), `Pixels[$[x}], ${y}]`).to.be.true;
                });
            });
        });

        it('should not fill color if the target color does not match with the coordinate chosen', function () {
            let canvas: Canvas = createCanvas(2, 2);
            let g: Graphic = new Graphic(canvas);
            g.fillColor({ x: 0, y: 0 }, new AsciiColor('T'), new AsciiColorFactory('Q'));

            canvas.getPixels().forEach((row: Color[], y: number) => {
                row.forEach((p: Color, x: number) => {
                    expect(p.equals(EMPTY_COLOR_FACTORY.create()), `Pixels[$[x}], ${y}]`).to.be.true;
                });
            });
        });
    });

});