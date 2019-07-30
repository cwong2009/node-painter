import { assert, expect } from 'chai';
import { Canvas } from '../../../src/canvas';
import { QuitCommand } from '../../../src/commands/quit-command';
import sinon, { SinonStub } from 'sinon';
import { EMPTY_COLOR, VALID_FILL_COLOR, EMPTY_COLOR_FACTORY, LINE_COLOR_FACTORY, FILL_COLOR_FACTORY, createCanvas, createCanvasForBoundaryCases, drawLine, fillColor } from '../../testing.util';

describe('Unit Test - QuitCommand', function () {

    describe('QuitCommand', function () {
        let exit: SinonStub;
        let verifyArgs: SinonStub;
        let command: QuitCommand;

        beforeEach(function () {
            verifyArgs = sinon.stub((QuitCommand as any).prototype, '_verifyArgs');
            command = new QuitCommand(null);
            exit = sinon.stub(process, 'exit');
        });

        afterEach(function () {
            exit.restore();
            verifyArgs.restore();
        });

        describe('#constructor', function () {
            it('should create QuitCommand', function () {
                sinon.assert.callCount(verifyArgs, 1);
            });
        });

        describe('#execute', function () {
            it('should exit process', function () {
                let args = [];

                command.execute();
                sinon.assert.callCount(verifyArgs, 1);
                sinon.assert.calledWith(exit, 0);
                sinon.assert.callCount(exit, 1);
            })
        });

    });
});