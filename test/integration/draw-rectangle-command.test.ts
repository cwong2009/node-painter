import { assert, expect } from 'chai';
import { Canvas } from '../../src/canvas';
import { AsciiColorFactory } from '../../src/ascii-color-factory';
import { DrawCommandParameter } from '../../src/commands/draw-command-parameter';
import { CreateCanvasCommandParameter } from '../../src/commands/create-canvas-command-parameter';
import { CreateCanvasCommand } from '../../src/commands/create-canvas-command';
import { DrawRectangleCommand } from '../../src/commands/draw-rectangle-command';
import { EMPTY_COLOR, VALID_FILL_COLOR, EMPTY_COLOR_FACTORY, LINE_COLOR_FACTORY, FILL_COLOR_FACTORY, drawRectangle, createCanvas, createCanvasForBoundaryCases, drawLine, fillColor, generateSingleCoordinateForBoundaryCase, generateSingleCoordinateForOutOfBoundaryCase } from '../testing.util';
import { LINE_COLOR } from '../../src/commands/draw-line-command';

describe('Integration Test -DrawRectangleCommand', function () {
    let canvas: Canvas;
    beforeEach(function () {
        canvas = createCanvas(20, 10);
    });

    describe('#constructor', function () {
        it('should create a DrawRectangleCommand', function () {
            let args = ["2", "3", "10", "8"];
            let parameter: DrawCommandParameter = new DrawCommandParameter(createCanvas(10, 10), args);
            let command: DrawRectangleCommand = new DrawRectangleCommand(parameter);

            expect(parameter).to.be.equals(command.getParameter());
        });

        it('should throws error if canvas is null', function () {
            expect(() => {
                let args = ["2", "3", "10", "8"];
                let parameter: DrawCommandParameter = new DrawCommandParameter(null, args);
                let command: DrawRectangleCommand = new DrawRectangleCommand(parameter);
            }).to.throws("The Canvas has not been created yet. Please enter again.");
        });

        it('should throws exception if args is missing', function () {
            let args = ["2", "3", "10"];
            let parameter: DrawCommandParameter = new DrawCommandParameter(canvas, args);

            expect(() => new DrawRectangleCommand(parameter)).to.throw('Invalid arguments. Expected 4 arguments, but got 3.')
        });



        it('Boundary Check - should throws exception if the number of args is 3 or 5', function () {
            let args = ["2", "3", "10"];
            let args2 = ["2", "3", "10", "1", "2"];
            let parameter: DrawCommandParameter = new DrawCommandParameter(canvas, args);
            let context2: DrawCommandParameter = new DrawCommandParameter(canvas, args2);
            expect(() => new DrawRectangleCommand(parameter)).to.throw('Invalid arguments. Expected 4 arguments, but got 3.')
            expect(() => new DrawRectangleCommand(context2)).to.throw('Invalid arguments. Expected 4 arguments, but got 5.')
        });

        it('should throws exception if args is invalid', function () {
            let args = ["2", "2.6", "15.1", "2"];
            let parameter: DrawCommandParameter = new DrawCommandParameter(canvas, args);

            expect(() => new DrawRectangleCommand(parameter)).to.throw('Coordinates input contains non integer values. Please enter again.')
        });


    });

    describe('#execute()', function () {
        let canvas: Canvas;

        beforeEach(function () {
            canvas = createCanvas(6, 5);
        });

        it('Boundary Test - should draw a rectangle from (1,1) to (6,5)', function () {
            let args = ["1", "1", "6", "5"];
            canvas = drawRectangle(canvas, args);

            canvas.getPixels().forEach((row, y) => {
                row.forEach((p, x) => {
                    if ((x == 0 && (y >= 0 && y <= 4)) || (x == 5 && (y >= 0 && y <= 4))) {
                        expect(p.equals(LINE_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                    else if ((y == 0 && (x >= 0 && x <= 5) || y == 4 && (x >= 0 && x <= 5))) {
                        expect(p.equals(LINE_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                    else {
                        expect(p.equals(EMPTY_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                })
            })
        });

        it('Boundary Test - should draw a rectangle from (2,2) to (5,4)', function () {
            let args = ["2", "2", "5", "4"];
            canvas = drawRectangle(canvas, args);

            canvas.getPixels().forEach((row, y) => {
                row.forEach((p, x) => {
                    if ((x == 1 && (y >= 1 && y <= 3)) || (x == 4 && (y >= 1 && y <= 3))) {
                        expect(p.equals(LINE_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                    else if ((y == 1 && (x >= 1 && x <= 4) || y == 3 && (x >= 1 && x <= 4))) {
                        expect(p.equals(LINE_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                    else {
                        expect(p.equals(EMPTY_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                })
            })
        });

        createCanvasForBoundaryCases().forEach((canvasSize: any) => {
            const BOUND_WIDTH: number = canvasSize.width;
            const BOUND_HEIGHT: number = canvasSize.height;

            describe(`Canvas - width=${BOUND_WIDTH}, height=${BOUND_HEIGHT}`, function () {
                let canvas: Canvas;
                beforeEach(function () {
                    canvas = createCanvas(BOUND_WIDTH, BOUND_HEIGHT);
                });

                it(`Boundary Test - should draw rectangle without error if the coordinates are with in the canvas bound`, function () {
                    generateSingleCoordinateForBoundaryCase(BOUND_WIDTH, BOUND_HEIGHT).forEach((p) => {
                        expect(() => {
                            drawRectangle(canvas, ["1", "1", String(p.x), String(p.y)]);
                        }, `(1,1,${p.x},${p.y})`).not.to.throws();
                    });
                });


                it(`Boundary Test - should throws exception if the coordinate is out of canvas bound`, function () {
                    generateSingleCoordinateForOutOfBoundaryCase(BOUND_WIDTH, BOUND_HEIGHT).forEach((p) => {
                        expect(() => {
                            drawRectangle(canvas, ["1", "1", String(p.x), String(p.y)]);
                        }, `(1,1,${p.x},${p.y})`).to.throws(`Coordinates input out of canvas bounds. Please enter again.`);
                    });
                });


            });

        });

    });
});

