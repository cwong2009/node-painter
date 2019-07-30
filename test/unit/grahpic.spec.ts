
import { assert, expect } from 'chai';
import { Graphic } from '../../src/graphic';
import sinon, { SinonStub } from 'sinon';

describe('Unit Test - Graphic', function () {
    let graphic: Graphic;
    let plotLineStub: SinonStub;
    let floodFillStub: SinonStub;
    let drawRectangleStub: SinonStub;

    beforeEach(function () {
        graphic = new Graphic(null);
        plotLineStub = sinon.stub((graphic as any), '_plotLine');
        floodFillStub = sinon.stub((graphic as any), '_floodFill');
        drawRectangleStub = sinon.stub((graphic as any), '_plotRectangle');
    });

    afterEach(function () {
        plotLineStub.restore();
        floodFillStub.restore();
        drawRectangleStub.restore();
    });

    it('#drawLine', function () {
        graphic.drawLine(0, 0, 1, 1, null);
        sinon.assert.callCount(plotLineStub, 1);
    });

    it('#fillColor', function () {
        graphic.fillColor(null, null, null);
        sinon.assert.callCount(floodFillStub, 1);
    });

    it('#drawRectangle', function () {
        graphic.drawRectangle(0, 0, 0, 0, null);
        sinon.assert.callCount(drawRectangleStub, 1);
    });

});