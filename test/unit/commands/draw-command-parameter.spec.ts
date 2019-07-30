import { assert } from 'chai';
import { Color } from '../../../src/color';
import { Canvas } from '../../../src/canvas';
import { AsciiColorFactory } from '../../../src/ascii-color-factory';
import { DrawCommandParameter } from '../../../src/commands/draw-command-parameter';
import sinon, { SinonStub } from 'sinon';

describe('Unit Test - DrawCommandParameter', function () {

    let canvasStub: SinonStub;

    afterEach(function () {
        if (canvasStub) {
            canvasStub.restore();
        }
    });

    describe('#constructor', function () {
        it('should create a DrawCommandParameter', function () {
            let args = ["1", "2", "5", "8"];
            let parameter: DrawCommandParameter = new DrawCommandParameter(null, args);

            canvasStub = sinon.stub((parameter as any), "canvas").value("TEST");

            assert.equal((parameter.getCanvas() as any), "TEST");
            assert.deepEqual(parameter.getArgs(), args);
            assert.equal(parameter.getArg(0), args[0]);
            assert.equal(parameter.getArg(1), args[1]);
            assert.equal(parameter.getArg(2), args[2]);
            assert.equal(parameter.getArg(3), args[3]);
        });
    });

});