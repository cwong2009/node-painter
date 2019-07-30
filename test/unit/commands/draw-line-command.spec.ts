import { assert, expect } from 'chai';
import { Color } from '../../../src/color';
import { Canvas } from '../../../src/canvas';
import { AsciiColor } from '../../../src/ascii-color';
import { AsciiColorFactory } from '../../../src/ascii-color-factory';
import { DrawCommandParameter } from '../../../src/commands/draw-command-parameter';
import { CreateCanvasCommandParameter } from '../../../src/commands/create-canvas-command-parameter';
import { CreateCanvasCommand } from '../../../src/commands/create-canvas-command';
import { DrawLineCommand } from '../../../src/commands/draw-line-command';
import { EMPTY_COLOR, VALID_FILL_COLOR, EMPTY_COLOR_FACTORY, LINE_COLOR_FACTORY, FILL_COLOR_FACTORY, drawRectangle, createCanvas, createCanvasForBoundaryCases, drawLine, fillColor } from '../../testing.util';
import sinon, { SinonStub } from 'sinon';
import { Graphic } from '../../../src/graphic';

describe('Unit Test - DrawLineCommand', function () {

    describe('DrawLineCommand', function () {
        let verifyArgsStub: SinonStub;
        let getParameterStub: SinonStub;
        let getArgStub: SinonStub;
        let getPixelStub: SinonStub;
        let getCanvasStub: SinonStub;
        let drawLineStub: SinonStub;
        let command: DrawLineCommand;

        beforeEach(function () {
            verifyArgsStub = sinon.stub((DrawLineCommand as any).prototype, '_verifyArgs');
            drawLineStub = sinon.stub((Graphic as any).prototype, 'drawLine');
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
            getParameterStub = sinon.stub(DrawLineCommand.prototype, "getParameter").value(myParameter);
        });

        afterEach(function () {
            verifyArgsStub.restore();
            drawLineStub.restore();
            getParameterStub.restore();
        });

        describe('#constructor', function () {
            it('should create DrawLineCommand', function () {
                command = new DrawLineCommand(null);

                sinon.assert.callCount(verifyArgsStub, 1);
                sinon.assert.callCount(getArgStub, 4);
            });
        });

        describe('#getResult', function () {

            it('should getResult', function () {
                command = new DrawLineCommand(null);
                command.getResult();
                //getCanvas
                sinon.assert.callCount(getCanvasStub, 1);
                sinon.assert.callCount(verifyArgsStub, 1);
                sinon.assert.callCount(getArgStub, 4);
            });
        });

        describe('#getNumberOfArguments', function () {
            it('should getNumberOfArguments', function () {
                command = new DrawLineCommand(null);
                expect(command.getNumberOfArguments()).to.be.equals(4);
            });
        });

        describe('#execute', function () {
            it('should execute', function () {
                command = new DrawLineCommand(null);
                command.execute();
                sinon.assert.callCount(drawLineStub, 1);
            });
        });
        
    });

});