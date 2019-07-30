import { assert, expect } from 'chai';
import { Canvas } from '../../../src/canvas';
import { AsciiColorFactory } from '../../../src/ascii-color-factory';
import { DrawCommandParameter } from '../../../src/commands/draw-command-parameter';
import { CreateCanvasCommandParameter } from '../../../src/commands/create-canvas-command-parameter';
import { CreateCanvasCommand } from '../../../src/commands/create-canvas-command';
import { DrawRectangleCommand } from '../../../src/commands/draw-rectangle-command';
import { EMPTY_COLOR, VALID_FILL_COLOR, EMPTY_COLOR_FACTORY, LINE_COLOR_FACTORY, FILL_COLOR_FACTORY, drawRectangle, createCanvas, createCanvasForBoundaryCases, drawLine, fillColor } from '../../testing.util';
import sinon, { SinonStub } from 'sinon';
import { Graphic } from '../../../src/graphic';


describe('Unit Test - DrawRectangleCommand', function () {

    describe('DrawRectangleCommand', function () {
        let verifyArgsStub: SinonStub;
        let getParameterStub: SinonStub;
        let getArgStub: SinonStub;
        let drawRectangleStub: SinonStub;
        let getPixelStub: SinonStub;
        let getCanvasStub: SinonStub;
        let command: DrawRectangleCommand;

        beforeEach(function () {
            verifyArgsStub = sinon.stub((DrawRectangleCommand as any).prototype, '_verifyArgs');
            drawRectangleStub = sinon.stub((Graphic as any).prototype, 'drawRectangle');
            getArgStub = sinon.stub().returns([]);
            getPixelStub = sinon.stub();
            getCanvasStub = sinon.stub().returns({
                getPixel: getPixelStub
            });
            let myParameter = function () {
                return {
                    getArg: getArgStub,
                    getCanvas: getCanvasStub
                };
            }
            getParameterStub = sinon.stub(DrawRectangleCommand.prototype, "getParameter").value(myParameter);
        });

        afterEach(function () {
            verifyArgsStub.restore();
            getParameterStub.restore();
            drawRectangleStub.restore();
        });

        describe('#constructor', function () {
            it('should create DrawRectangleCommand', function () {
                command = new DrawRectangleCommand(null);

                sinon.assert.callCount(verifyArgsStub, 1);
                sinon.assert.callCount(getArgStub, 4);
            });
        });

        describe('#getResult', function () {
            it('should getResult', function () {
                command = new DrawRectangleCommand(null);
                command.getResult();

                sinon.assert.callCount(getCanvasStub, 1);
                sinon.assert.callCount(verifyArgsStub, 1);
                sinon.assert.callCount(getArgStub, 4);
            });
        });

        describe('#getNumberOfArguments', function () {
            it('should getNumberOfArguments', function () {
                command = new DrawRectangleCommand(null);
                expect(command.getNumberOfArguments()).to.be.equals(4);
            });
        });

        describe('#execute', function () {
            it('should execute', function () {
                command = new DrawRectangleCommand(null);
                command.execute();
                sinon.assert.callCount(drawRectangleStub, 1);
            });
        });
    });
});
