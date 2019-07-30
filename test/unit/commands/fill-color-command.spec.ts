import { assert, expect } from 'chai';
import { Canvas, CANVAS_MAX_WIDTH, CANVAS_MAX_HEIGHT } from '../../../src/canvas';
import { AsciiColorFactory } from '../../../src/ascii-color-factory';
import { DrawCommandParameter } from '../../../src/commands/draw-command-parameter';
import { CreateCanvasCommandParameter } from '../../../src/commands/create-canvas-command-parameter';
import { CreateCanvasCommand } from '../../../src/commands/create-canvas-command';
import { FillColorCommand } from '../../../src/commands/fill-color-command';
import { DrawLineCommand } from '../../../src/commands/draw-line-command';
import { Color } from '../../../src/color';
import sinon, { SinonStub } from 'sinon';
import { EMPTY_COLOR, VALID_FILL_COLOR, EMPTY_COLOR_FACTORY, LINE_COLOR_FACTORY, FILL_COLOR_FACTORY, createCanvas, createCanvasForBoundaryCases, drawLine, fillColor } from '../../testing.util';
import { Command } from '../../../src/commands/command';
import { Graphic } from '../../../src/graphic';

describe('Unit Test - FillColorCommand', function () {

    describe('FillCOlorCommand', function () {
        let verifyArgsStub: SinonStub;
        let getParameterStub: SinonStub;
        let getArgStub: SinonStub;
        let fillColorStub: SinonStub;
        let getPixelStub: SinonStub;
        let getCanvasStub: SinonStub;
        let command: FillColorCommand;

        beforeEach(function () {
            verifyArgsStub = sinon.stub((FillColorCommand as any).prototype, '_verifyArgs');
            fillColorStub = sinon.stub((Graphic as any).prototype, 'fillColor');
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
            getParameterStub = sinon.stub(FillColorCommand.prototype, "getParameter").value(myParameter);
        });

        afterEach(function () {
            verifyArgsStub.restore();
            getParameterStub.restore();
            fillColorStub.restore();
        });

        describe('#constructor', function () {
            it('should create FillColorCommand', function () {
                command = new FillColorCommand(null);

                sinon.assert.callCount(verifyArgsStub, 1);
                sinon.assert.callCount(getArgStub, 3);
            });

        });

        describe('#getResult', function () {
            it('should getResult', function () {
                command = new FillColorCommand(null);
                command.getResult();

                sinon.assert.callCount(getCanvasStub, 1);
                sinon.assert.callCount(verifyArgsStub, 1);
                sinon.assert.callCount(getArgStub, 3);
            });

        });
        describe('#getNumberOfArguments', function () {
            it('should getNumberOfArguments', function () {
                command = new FillColorCommand(null);
                expect(command.getNumberOfArguments()).to.be.equals(3);
            });
        });

        describe('#execute', function () {
            it('should execute', function () {
                command = new FillColorCommand(null);
                command.execute();
                sinon.assert.callCount(fillColorStub, 1);
            });
        });
    });
});