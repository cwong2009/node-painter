import { assert } from 'chai';
import { Canvas } from '../../src/canvas';
import { DrawCommandParameter } from '../../src/commands/draw-command-parameter';
import { EMPTY_COLOR_FACTORY } from '../testing.util';

describe('DrawCommandParameter', function () {

    describe('#constructor', function () {
        it('should create a DrawCommandParameter', function () {
            let c: Canvas = new Canvas(10, 10, EMPTY_COLOR_FACTORY);
            let args = ["1", "2", "5", "8"];
            let parameter: DrawCommandParameter = new DrawCommandParameter(c, args);

            assert.equal(parameter.getCanvas(), c);
            assert.deepEqual(parameter.getArgs(), args);
        });
    });

});