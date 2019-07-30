import { assert, expect } from 'chai';
import { Color } from '../../src/color';
import { Canvas } from '../../src//canvas';
import { AsciiColor } from '../../src//ascii-color';
import { AsciiColorFactory } from '../../src//ascii-color-factory';
import { DrawCommandParameter } from '../../src//commands/draw-command-parameter';
import { CreateCanvasCommandParameter } from '../../src//commands/create-canvas-command-parameter';
import { CreateCanvasCommand } from '../../src//commands/create-canvas-command';
import { DrawLineCommand } from '../../src//commands/draw-line-command';
import { EMPTY_COLOR, VALID_FILL_COLOR, EMPTY_COLOR_FACTORY, LINE_COLOR_FACTORY, FILL_COLOR_FACTORY, drawRectangle, createCanvas, createCanvasForBoundaryCases, drawLine, fillColor, generateSingleCoordinateForBoundaryCase, generateSingleCoordinateForOutOfBoundaryCase } from '../testing.util';

describe('Integration Test - DrawLineCommand', function () {
    let canvas: Canvas;
    const WIDTH_VALUE: number = 6;
    const HEIGHT_VALUE: number = 5;

    describe('#constructor', function () {
        beforeEach(function () {
            canvas = createCanvas(WIDTH_VALUE, HEIGHT_VALUE);
        });

        it('should create a DrawLineCommand', function () {
            let args = ["1", "1", "2", "2"];
            let parameter: DrawCommandParameter = new DrawCommandParameter(canvas, args);
            let command: DrawLineCommand = new DrawLineCommand(parameter);

            expect(parameter).to.be.equals(command.getParameter());
        });

        it('should throws error if canvas is null', function () {
            expect(() => {
                let args = ["1", "1", "2", "2"];
                let parameter: DrawCommandParameter = new DrawCommandParameter(null, args);
                let command: DrawLineCommand = new DrawLineCommand(parameter);
            }).to.throws("The Canvas has not been created yet. Please enter again.");
        });

        it('Boundary Check - should throws exception if the number of args is 3 or 5', function () {
            let parameter: DrawCommandParameter = new DrawCommandParameter(canvas, ["1", "1", "1"]);
            let context2: DrawCommandParameter = new DrawCommandParameter(canvas, ["1", "1", "1", "1", "1"]);
            expect(() => new DrawLineCommand(parameter)).to.throw('Invalid arguments. Expected 4 arguments, but got 3.')
            expect(() => new DrawLineCommand(context2)).to.throw('Invalid arguments. Expected 4 arguments, but got 5.')
        });

        it('Input Check - should throws exception if args is invalid', function () {
            let args = ["2", "2.6", "15", "2"];
            let parameter: DrawCommandParameter = new DrawCommandParameter(canvas, args);

            expect(() => new DrawLineCommand(parameter)).to.throw('Coordinates input contains non integer values. Please enter again.')
        });

        it('should throws exception if coordinate input is out of canvas bound', function () {
            let args = ["2", "2", "15", "0"];
            let parameter: DrawCommandParameter = new DrawCommandParameter(canvas, args);

            expect(() => new DrawLineCommand(parameter)).to.throw('Coordinates input out of canvas bounds. Please enter again.')
        });

    });

    describe('#execute()', function () {
        beforeEach(function () {
            canvas = createCanvas(WIDTH_VALUE, HEIGHT_VALUE);
        });

        it('Boundary Check - should draw a line from (1,1) to (1,5)', function () {
            let args = ["1", "1", "1", "5"];
            canvas = drawLine(canvas, args);

            canvas.getPixels().forEach((row, y) => {
                row.forEach((p, x) => {
                    if ((x == 0)) {
                        expect(p.equals(LINE_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                    else {
                        expect(p.equals(EMPTY_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                })
            })
        });

        it('Boundary Check - should draw a line from (2,1) to (2,5)', function () {
            let args = ["2", "1", "2", "5"];
            canvas = drawLine(canvas, args);

            canvas.getPixels().forEach((row, y) => {
                row.forEach((p, x) => {
                    if ((x == 1)) {
                        expect(p.equals(LINE_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                    else {
                        expect(p.equals(EMPTY_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                })
            })
        });

        it('Boundary Check - should draw a line from (5,1) to (5,5)', function () {
            let args = ["5", "1", "5", "5"];
            canvas = drawLine(canvas, args);

            canvas.getPixels().forEach((row, y) => {
                row.forEach((p, x) => {
                    if ((x == 4)) {
                        expect(p.equals(LINE_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                    else {
                        expect(p.equals(EMPTY_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                })
            })
        });

        it('Boundary Check - should draw a line from (4,1) to (4,5)', function () {
            let args = ["4", "1", "4", "5"];
            canvas = drawLine(canvas, args);

            canvas.getPixels().forEach((row, y) => {
                row.forEach((p, x) => {
                    if ((x == 3)) {
                        expect(p.equals(LINE_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                    else {
                        expect(p.equals(EMPTY_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                })
            })
        });

        it('Boundary Check - should draw a line from (1,1) to (6,1)', function () {
            let args = ["1", "1", "6", "1"];
            canvas = drawLine(canvas, args);

            canvas.getPixels().forEach((row, y) => {
                row.forEach((p, x) => {
                    if ((y == 0)) {
                        expect(p.equals(LINE_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                    else {
                        expect(p.equals(EMPTY_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                })
            })
        });

        it('Boundary Check - should draw a line from (1,2) to (6,2)', function () {
            let args = ["1", "2", "6", "2"];
            canvas = drawLine(canvas, args);

            canvas.getPixels().forEach((row, y) => {
                row.forEach((p, x) => {
                    if ((y == 1)) {
                        expect(p.equals(LINE_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                    else {
                        expect(p.equals(EMPTY_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                })
            })
        });

        it('Boundary Check - should draw a line from (1,4) to (6,4)', function () {
            let args = ["1", "4", "6", "4"];
            canvas = drawLine(canvas, args);

            canvas.getPixels().forEach((row, y) => {
                row.forEach((p, x) => {
                    if ((y == 3)) {
                        expect(p.equals(LINE_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                    else {
                        expect(p.equals(EMPTY_COLOR_FACTORY.create()), `(${x}, ${y})`).to.be.true;
                    }
                })
            })
        });

        it('Boundary Check - should draw a line from (1,5) to (6,5)', function () {
            let args = ["1", "5", "6", "5"];
            canvas = drawLine(canvas, args);

            canvas.getPixels().forEach((row, y) => {
                row.forEach((p, x) => {
                    if ((y == 4)) {
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

                it(`Boundary Test - should draw line without error if the points are with in the canvas bound`, function () {
                    generateSingleCoordinateForBoundaryCase(BOUND_WIDTH, BOUND_HEIGHT).forEach((p) => {
                        expect(() => {
                            drawLine(canvas, ["1", String(p.y), String(p.x), String(p.y)]);
                        }, `(1,${p.y},${p.x},${p.y})`).not.to.throws();
                        expect(() => {
                            drawLine(canvas, [String(p.x), "1", String(p.x), String(p.y)]);
                        }, `(${p.x}, 1,${p.x},${p.y})`).not.to.throws();
                    });
                });


                it(`Boundary Test - should throws line if the coordinate is out of canvas bound`, function () {
                    generateSingleCoordinateForOutOfBoundaryCase(BOUND_WIDTH, BOUND_HEIGHT).forEach((p) => {
                        expect(() => {
                            drawLine(canvas, ["1", String(p.y), String(p.x), String(p.y)]);
                        }, `(1,${p.y},${p.x},${p.y})`).to.throws(`Coordinates input out of canvas bounds. Please enter again.`);
                        expect(() => {
                            drawLine(canvas, [String(p.x), "1", String(p.x), String(p.y)]);
                        }, `(${p.x}, 1,${p.x},${p.y})`).to.throws(`Coordinates input out of canvas bounds. Please enter again.`);
                    });
                });


            });

        });

    });
});

