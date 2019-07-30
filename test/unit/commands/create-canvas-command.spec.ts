import { assert, expect } from 'chai';
import { Color } from '../../../src/color';
import { Canvas } from '../../../src/canvas';
import { AsciiColor } from '../../../src/ascii-color';
import { AsciiColorFactory } from '../../../src/ascii-color-factory';
import { CreateCanvasCommandParameter } from '../../../src/commands/create-canvas-command-parameter';
import { CreateCanvasCommand } from '../../../src/commands/create-canvas-command';
import { EMPTY_COLOR, VALID_FILL_COLOR, EMPTY_COLOR_FACTORY, LINE_COLOR_FACTORY, FILL_COLOR_FACTORY, createCanvas, createCanvasForBoundaryCases, drawLine, fillColor } from '../../testing.util';
import sinon, { SinonStub } from 'sinon';

describe('Unit Test - CreateCanvasCommand', function () {

    describe('#CreateCanvasCommand', function () {
        let verifyArgs: SinonStub;
        let getParameter: SinonStub;
        let getArgStub: SinonStub;
        let createCanvasStub: SinonStub;
        let getPixelStub: SinonStub;
        let command: CreateCanvasCommand;

        beforeEach(function () {
            verifyArgs = sinon.stub((CreateCanvasCommand as any).prototype, '_verifyArgs');
            getArgStub = sinon.stub().returns([]);
            getPixelStub = sinon.stub();

            let myParameter = function () {
                return {
                    getArg: getArgStub,
                    getBackgroundColorFactory: sinon.stub().returns({})
                };
            }
            getParameter = sinon.stub(CreateCanvasCommand.prototype, "getParameter").value(myParameter);
            createCanvasStub = sinon.stub((CreateCanvasCommand.prototype as any), "_createCanvas");
        });

        afterEach(function () {
            verifyArgs.restore();
            getParameter.restore();
            createCanvasStub.restore();
        });

        describe('#constructor', function () {
            it('should create CreateCanvasCommand', function () {
                command = new CreateCanvasCommand(null);

                sinon.assert.callCount(verifyArgs, 1);
                sinon.assert.callCount(getArgStub, 2);
            });
        });

        describe('#getResult', function () {
            it('should getResult', function () {
                command = new CreateCanvasCommand(null);
                command.getResult();
            });
        });

        describe('#getNumberOfArguments', function () {
            it('should getNumberOfArguments', function () {
                command = new CreateCanvasCommand(null);
                expect(command.getNumberOfArguments()).to.be.equals(2);
            });
        });

        describe('#execute', function () {
            it('should execute', function () {
                command = new CreateCanvasCommand(null);
                command.execute();
                sinon.assert.callCount(createCanvasStub, 1);
            });
        });
    });

});
