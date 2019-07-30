import { assert, expect } from 'chai';
import { Canvas, CANVAS_MAX_WIDTH, CANVAS_MAX_HEIGHT } from '../../src/canvas';
import { DrawCommandParameter } from '../../src/commands/draw-command-parameter';
import { FillColorCommand } from '../../src/commands/fill-color-command';
import { Color } from '../../src/color';
import { EMPTY_COLOR, VALID_FILL_COLOR, EMPTY_COLOR_FACTORY, LINE_COLOR_FACTORY, FILL_COLOR_FACTORY, createCanvas, createCanvasForBoundaryCases, drawLine, fillColor, generateSingleCoordinateForBoundaryCase, generateSingleCoordinateForOutOfBoundaryCase } from '../testing.util';

describe('Integration Test - FillColorCommand', function () {

    beforeEach(function () {
    });

    describe('#constructor', function () {
        //Test for each boundary canvas
        createCanvasForBoundaryCases().forEach((canvasSize: any) => {
            const BOUND_WIDTH: number = canvasSize.width;
            const BOUND_HEIGHT: number = canvasSize.height;

            describe(`Canvas - width=${BOUND_WIDTH}, height=${BOUND_HEIGHT}`, function () {
                let canvas: Canvas;
                beforeEach(function () {
                    canvas = createCanvas(BOUND_WIDTH, BOUND_HEIGHT);
                });

                it('should create a FillColorCommand', function () {
                    let args = ["1", "1", VALID_FILL_COLOR];
                    let parameter: DrawCommandParameter = new DrawCommandParameter(canvas, args);
                    let command: FillColorCommand = new FillColorCommand(parameter);

                    expect(parameter).to.be.equals(command.getParameter());
                });

                it('should throws error if canvas is null', function () {
                    expect(() => {
                        let args = ["1", "1", VALID_FILL_COLOR];
                        let parameter: DrawCommandParameter = new DrawCommandParameter(null, args);
                        let command: FillColorCommand = new FillColorCommand(parameter);
                    }).to.throws("The Canvas has not been created yet. Please enter again.");
                });

                it('Boundary Check - should throws exception if the number of args is 2 or 4', function () {
                    let parameter: DrawCommandParameter = new DrawCommandParameter(canvas, ["1", "1"]);
                    let context2: DrawCommandParameter = new DrawCommandParameter(canvas, ["1", "1", "1", "1"]);
                    expect(() => new FillColorCommand(parameter)).to.throw('Invalid arguments. Expected 3 arguments, but got 2.')
                    expect(() => new FillColorCommand(context2)).to.throw('Invalid arguments. Expected 3 arguments, but got 4.')
                });

                it('Input Check - should throws exception if args is invalid (Non-integer coordinate input).', function () {
                    let args = ["1", "1.5", VALID_FILL_COLOR];
                    let parameter: DrawCommandParameter = new DrawCommandParameter(canvas, args);

                    expect(() => new FillColorCommand(parameter)).to.throw('Coordinates input contains non integer values. Please enter again.')

                });

                it("Boundary Check - should throws exception if args is invalid (color's char length = 0 or 2).", function () {
                    let parameter: DrawCommandParameter = new DrawCommandParameter(canvas, ["1", "1", 'xx']);
                    let context2: DrawCommandParameter = new DrawCommandParameter(canvas, ["1", "1", '']);
                    expect(() => new FillColorCommand(parameter)).to.throw('The length of the color value must be 1. Please enter again.')
                    expect(() => new FillColorCommand(context2)).to.throw('The length of the color value must be 1. Please enter again.')
                });

            });

        });

        it(`should create a FillCommand without error if coordinate is (3,3)`, function () {
            let canvas = createCanvas(6, 5);
            let args = ["3", "3", VALID_FILL_COLOR];
            let parameter: DrawCommandParameter = new DrawCommandParameter(canvas, args);
            expect(() => { new FillColorCommand(parameter); }).not.to.throws();
        });

    });

    describe('#getResult', function () {
        it('should getResult', function () {
            let canvas = createCanvas(6, 5);
            let parameter: DrawCommandParameter = new DrawCommandParameter(canvas, ["1", "1", VALID_FILL_COLOR]);
            let command: FillColorCommand = new FillColorCommand(parameter);
            expect(command.getResult()).to.be.equals(canvas);
        });
    });

    describe('#getNumberOfArguments', function () {
        it('should getNumberOfArguments', function () {
            let canvas = createCanvas(6, 5);
            let parameter: DrawCommandParameter = new DrawCommandParameter(canvas, ["1", "1", VALID_FILL_COLOR]);
            let command: FillColorCommand = new FillColorCommand(parameter);
            expect(command.getNumberOfArguments()).to.be.equals(3);
        });
    });

    describe('#getParameter', function () {
        it('should getParameter', function () {
            let canvas = createCanvas(6, 5);
            let parameter: DrawCommandParameter = new DrawCommandParameter(canvas, ["1", "1", VALID_FILL_COLOR]);
            let command: FillColorCommand = new FillColorCommand(parameter);
            expect(command.getParameter()).to.be.equals(parameter);
        });
    });

    describe('#execute', function () {
        let canvas: Canvas;

        createCanvasForBoundaryCases().forEach((canvasSize: any) => {
            const BOUND_WIDTH: number = canvasSize.width;
            const BOUND_HEIGHT: number = canvasSize.height;

            describe(`Canvas - width=${BOUND_WIDTH}, height=${BOUND_HEIGHT}`, function () {

                beforeEach(function () {
                    canvas = createCanvas(BOUND_WIDTH, BOUND_HEIGHT);
                });

                it('should fill color', function () {
                    canvas = fillColor(canvas, [Math.ceil(BOUND_WIDTH / 2).toString(), Math.ceil(BOUND_HEIGHT / 2).toString(), VALID_FILL_COLOR]);

                    canvas.getPixels().forEach((row: Color[], y: number) => {
                        row.forEach((p: Color, x: number) => {
                            expect(canvas.getPixel(x, y).equals(FILL_COLOR_FACTORY.create()), `Pixels[$[x}], ${y}]`).to.be.true;
                        });
                    });
                });

                it('should fill the same area', function () {
                    canvas = fillColor(canvas, [Math.ceil(BOUND_WIDTH / 2).toString(), Math.ceil(BOUND_HEIGHT / 2).toString(), VALID_FILL_COLOR]);

                    canvas.getPixels().forEach((row: Color[], y: number) => {
                        row.forEach((p: Color, x: number) => {
                            expect(canvas.getPixel(x, y).equals(FILL_COLOR_FACTORY.create()), `Pixels[$[x}], ${y}]`).to.be.true;
                        });
                    });
                });

                it(`Boundary Test - should fill color without error if the point are with in the canvas bound`, function () {
                    generateSingleCoordinateForBoundaryCase(BOUND_WIDTH, BOUND_HEIGHT).forEach((p) => {
                        expect(() => {
                            fillColor(canvas, [p.x.toString(), p.y.toString(), VALID_FILL_COLOR]);
                        }, `(${p.x},${p.y})`).not.to.throws();
                    });
                });


                it(`Boundary Test - should throws exception if the coordinate is out of canvas bound`, function () {
                    generateSingleCoordinateForOutOfBoundaryCase(BOUND_WIDTH, BOUND_HEIGHT).forEach((p) => {
                        expect(() => {
                            fillColor(canvas, [p.x.toString(), p.y.toString(), VALID_FILL_COLOR]);
                        }, `(${p.x},${p.y})`).to.throws(`Coordinates input out of canvas bounds. Please enter again.`);
                    });
                });
            });

            if (BOUND_HEIGHT > 1) {
                describe(`Canvas - width=${BOUND_WIDTH}, height=${BOUND_HEIGHT}`, function () {

                    describe(`Canvas splitted by a horizontal line@Pixels[0,${Math.ceil(BOUND_HEIGHT / 2)}]to[${BOUND_WIDTH - 1},${Math.ceil(BOUND_HEIGHT / 2)}]`, function () {
                        let canvas: Canvas;
                        beforeEach(function () {
                            canvas = createCanvas(BOUND_WIDTH, BOUND_HEIGHT);
                            let args = ["1", (Math.ceil(BOUND_HEIGHT / 2) + 1).toString(), BOUND_WIDTH.toString(), (Math.ceil(BOUND_HEIGHT / 2) + 1).toString()];
                            canvas = drawLine(canvas, args);
                        });

                        it('should fill the upper area only', function () {
                            canvas = fillColor(canvas, ["1", Math.max(1, Math.ceil(BOUND_HEIGHT / 2)).toString(), VALID_FILL_COLOR]);

                            canvas.getPixels().forEach((row: Color[], y: number) => {
                                row.forEach((p: Color, x: number) => {
                                    if (y == Math.ceil(BOUND_HEIGHT / 2)) {
                                        expect(p.equals(LINE_COLOR_FACTORY.create()), `line-Pixels[${x}, ${y}]`).to.be.true;
                                    }
                                    else if (y < Math.ceil(BOUND_HEIGHT / 2)) {
                                        expect(p.equals(FILL_COLOR_FACTORY.create()), `fill-Pixels[${x}, ${y}]}`).to.be.true;
                                    }
                                    else {
                                        expect(p.equals(EMPTY_COLOR_FACTORY.create()), `Pixels[${x}, ${y}]}`).to.be.true;
                                    }
                                });
                            });
                        });
                    });
                });
            }
        });

        describe('should fill the closed area for the canvas(4,4) splitted diagonally', function () {
            let canvas: Canvas;

            beforeEach(function () {
                //draw a square
                canvas = createCanvas(4, 4);
                //draw a diagonal
                let args = ["1", "1", "4", "4"];
                canvas = drawLine(canvas, args);
            });

            it('should fill the left area only', function () {
                canvas = fillColor(canvas, ["1", "2", VALID_FILL_COLOR])

                canvas.getPixels().forEach((row: Color[], y: number) => {
                    row.forEach((p: Color, x: number) => {
                        if (x === y) {
                            expect(p.equals(LINE_COLOR_FACTORY.create()), `Pixels[${x}, ${y}]`).to.be.true;
                        }
                        else if (x < y) {
                            expect(p.equals(FILL_COLOR_FACTORY.create()), `Pixels[${x}, ${y}]`).to.be.true;
                        }
                        else {
                            expect(p.equals(EMPTY_COLOR_FACTORY.create()), `Pixels[${x}, ${y}]`).to.be.true;
                        }
                    });
                });
            });
        });

    });
});