
//let assert = require('assert');
import { assert, expect } from 'chai';
import { Color } from '../../src/color';
import { AsciiColor } from '../../src/ascii-color';
import { AsciiColorFactory } from '../../src/ascii-color-factory';
import { ColorFactory } from '../../src/color-factory';

describe('AsciiColorFactory', function () {

    describe('#constructor', function () {
        it('should create a AsciiColorFactory', function () {
            expect(() => { new AsciiColorFactory('x') }).not.to.throws()
        });

    });

    describe('#create', function () {
        it('should create a AsciiColor', function () {
            const LINE_COLOR = "x";
            let factory: ColorFactory = new AsciiColorFactory(LINE_COLOR);
            let color: Color = factory.create();
            expect(LINE_COLOR).to.be.equals(color.getColor());
        });

    });

});