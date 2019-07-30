
//let assert = require('assert');
import { assert, expect } from 'chai';
import { Color } from '../../src/color';
import { AsciiColor } from '../../src/ascii-color';
import { AsciiColorFactory } from '../../src/ascii-color-factory';
import { ColorFactory } from '../../src/color-factory';

describe('AsciiColor', function () {
    const X_COLOR = "x";
    const C_COLOR = "c";

    describe('#constructor', function () {
        it('should create AsciiColor', function () {
            expect(() => { new AsciiColor(X_COLOR) }).not.to.throws()
        });

        it('Boundary Check - should throws error if use a non-ascii char to create a AsciiColor', function () {
            let NON_ASCII_CHAR: string = String.fromCharCode(180);
            expect(() => { new AsciiColor(NON_ASCII_CHAR) }).to.throws("Only ASCII character is supported. Please enter again.")
        });
    });

    describe('#_isPrintableAscii()', function () {
        it('should return false if the string is a non-ascii char', function () {
            let NON_ASCII_CHAR: string = String.fromCharCode(180);
            let color: AsciiColor = new AsciiColor(' ');
            expect((color as any)._isPrintableAscii(NON_ASCII_CHAR, false)).to.be.false;
        });

        it('should return true if the string is a non-ascii char', function () {
            let ASCII_CHAR: string = String.fromCharCode(80);
            let color: AsciiColor = new AsciiColor(' ');
            expect((color as any)._isPrintableAscii(ASCII_CHAR, false)).to.be.true;
        });

        it('should return false if the string is a non-extended-ascii char', function () {
            let NON_EXT_ASCII_CHAR: string = String.fromCharCode(800);
            let color: AsciiColor = new AsciiColor(' ');
            expect((color as any)._isPrintableAscii(NON_EXT_ASCII_CHAR, true)).to.be.false;
        });

        it('should return true if the string is a non-extended-ascii char', function () {
            let EXT_ASCII_CHAR: string = String.fromCharCode(180);
            let color: AsciiColor = new AsciiColor(' ');
            expect((color as any)._isPrintableAscii(EXT_ASCII_CHAR, true)).to.be.true;
        });
    });

    describe('#equals()', function () {
        it('should return true if the string value is the same', function () {
            let colorA: AsciiColor = new AsciiColor(X_COLOR);
            let colorB: AsciiColor = new AsciiColor(X_COLOR);
            expect(colorA.equals(colorB)).to.be.true;
            expect(colorB.equals(colorA)).to.be.true;
        });
        it('should return false if the string value is not the same', function () {
            const X_COLOR = "x";
            let colorA: AsciiColor = new AsciiColor(X_COLOR);
            let colorB: AsciiColor = new AsciiColor(C_COLOR);
            let colorC: AsciiColor = null;
            expect(colorA.equals(colorB)).to.be.false;
            expect(colorB.equals(colorA)).to.be.false;
            expect(colorA.equals(colorC)).to.be.false;
        });
    });

    describe('#getColor', function () {
        it('should getColor', function () {
            let color: AsciiColor = new AsciiColor(X_COLOR);
            expect(color.getColor()).to.equals(X_COLOR);
        });
    });

});