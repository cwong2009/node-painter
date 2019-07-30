import sinon, { SinonStub, SinonFake, SinonSpy } from 'sinon'
import { ConsoleDraw } from '../../src/console-draw';
import { ReadableStreamStub, createCanvasForBoundaryCases, EMPTY_COLOR, createCanvas } from '../testing.util';
import { AsciiColor } from '../../src/ascii-color';
import { assert, expect } from 'chai';

describe('Integration Test - ConsoleDraw', function () {
    let customReadable: ReadableStreamStub
    let parseLineStub: SinonStub;
    let painter: ConsoleDraw;
    let processStdinStub: SinonStub;

    const RENDER_CONTENT: string = "RENDER CONTENT";

    before(function () {
        processStdinStub = sinon.stub(process, "stdin").value(new ReadableStreamStub([]));
    });

    after(function () {
        processStdinStub.restore();
    })

    beforeEach(function () {
        customReadable = new ReadableStreamStub([]);
        painter = new ConsoleDraw(customReadable, null);
        parseLineStub = sinon.stub(painter, "parseLine");
    });

    afterEach(function () {
        parseLineStub.restore();
    });

    it('should read from input stream and call parseLine()', function () {
        customReadable.on('end', () => {
            sinon.assert.callCount(parseLineStub, 2);
        });
        painter.run();
        customReadable.push("C 20 20\n");
        customReadable.push("Q\n");
        customReadable.push(null);
    })

    describe('#runCommand', function () {
        let readableStreamStub: ReadableStreamStub;

        beforeEach(function () {
            readableStreamStub = new ReadableStreamStub([]);
        });

        it('Boundary Test - should run the command to create a canvas without error for width and height within the bound', function () {
            var painter = new ConsoleDraw(readableStreamStub, null);
            createCanvasForBoundaryCases().forEach((canvasSize: any) => {
                const BOUND_WIDTH: number = canvasSize.width;
                const BOUND_HEIGHT: number = canvasSize.height;
                const EXPECTED = Array(BOUND_HEIGHT).fill([]).map(() => Array(BOUND_WIDTH).fill({}).map(() => new AsciiColor(EMPTY_COLOR)));
                painter.runCommand(["C", BOUND_WIDTH.toString(), BOUND_HEIGHT.toString()]);
                assert.deepEqual(painter.getCanvas().getPixels(), EXPECTED, `width=${BOUND_WIDTH}, height=${BOUND_HEIGHT}`);
            })
        });

    });


});