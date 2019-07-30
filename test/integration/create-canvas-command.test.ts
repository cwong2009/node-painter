import { assert, expect } from 'chai';
import { Canvas } from '../../src/canvas';
import { AsciiColor } from '../../src/ascii-color';
import { AsciiColorFactory } from '../../src/ascii-color-factory';
import { CreateCanvasCommandParameter } from '../../src/commands/create-canvas-command-parameter';
import { CreateCanvasCommand } from '../../src/commands/create-canvas-command';
import { EMPTY_COLOR, VALID_FILL_COLOR, EMPTY_COLOR_FACTORY, LINE_COLOR_FACTORY, FILL_COLOR_FACTORY, createCanvas, createCanvasForBoundaryCases, drawLine, fillColor, createCanvasForOutOfBoundaryCases } from '../testing.util';
import sinon, { SinonStub } from 'sinon';

describe('Integration Test - CreateCanvasCommand', function () {

    describe('#constructor', function () {
        it('should create a CreateCanvasCommand', function () {
            let c: Canvas;
            let colorFactory: AsciiColorFactory = new AsciiColorFactory(' ');
            let args = ["20", "20"];
            let parameter: CreateCanvasCommandParameter = new CreateCanvasCommandParameter(colorFactory, args);
            let command: CreateCanvasCommand = new CreateCanvasCommand(parameter);

            expect(parameter).to.be.equals(command.getParameter());
        });

        it('should throws exception if args is missing', function () {
            let c: Canvas;
            let colorFactory: AsciiColorFactory = new AsciiColorFactory(' ');
            let args = ["20"];
            let parameter: CreateCanvasCommandParameter = new CreateCanvasCommandParameter(colorFactory, args);

            expect(() => new CreateCanvasCommand(parameter)).to.throw('Invalid arguments. Expected 2 arguments, but got 1.')
        });


        it('Input Check - should throws exception if args is invalid', function () {
            let c: Canvas;
            let colorFactory: AsciiColorFactory = new AsciiColorFactory(' ');
            let args = ["A", "20"];
            let parameter: CreateCanvasCommandParameter = new CreateCanvasCommandParameter(colorFactory, args);
            expect(() => new CreateCanvasCommand(parameter)).to.throw('The width and height of the canvas must be integer with min=1, max=100. Please enter again.')
        });

    });

    describe('#execute()', function () {
        const WIDTH: number = 20;
        const HEIGHT: number = 10;
        let canvas: Canvas;

        beforeEach(function () {
            canvas = createCanvas(WIDTH, HEIGHT)
        });

        it('should has height and width', function () {
            expect(canvas.getHeight()).to.equal(HEIGHT);
            expect(canvas.getWidth()).to.equal(WIDTH);
        });

        it('should create a 2D array with size [height][width] and each element stored a whitespace', function () {
            const EXPECTED = Array(HEIGHT).fill([]).map(() => Array(WIDTH).fill(new AsciiColor(EMPTY_COLOR)));
            assert.deepEqual(canvas.getPixels(), EXPECTED);
        });

        
        it('Boundary Test - should create a canvas without error for width and height within the bound', function () {
            createCanvasForBoundaryCases().forEach((canvasSize: any) => {
                const BOUND_WIDTH: number = canvasSize.width;
                const BOUND_HEIGHT: number = canvasSize.height;
                const EXPECTED = Array(BOUND_HEIGHT).fill([]).map(() => Array(BOUND_WIDTH).fill({}).map(() => new AsciiColor(EMPTY_COLOR)));
                expect(() => {
                    canvas = createCanvas(BOUND_WIDTH, BOUND_HEIGHT);
                    assert.deepEqual(canvas.getPixels(), EXPECTED);
                }, `(${BOUND_WIDTH},${BOUND_HEIGHT})`).not.to.throws();

                expect(canvas.getWidth(), 'Width').to.be.equals(BOUND_WIDTH);
                expect(canvas.getHeight(), 'Height').to.be.equals(BOUND_HEIGHT);
            })
        });

        it('Boundary Test - should throws error for width and height out of the bound', function () {
            createCanvasForOutOfBoundaryCases().forEach((canvasSize: any) => {
                const BOUND_WIDTH: number = canvasSize.width;
                const BOUND_HEIGHT: number = canvasSize.height;
                expect(() => {
                    createCanvas(BOUND_WIDTH, BOUND_HEIGHT);
                }, `(${BOUND_WIDTH},${BOUND_HEIGHT})`).to.throws('The width and height of the canvas must be integer with min=1, max=100. Please enter again.');
            })
        });

    });
});