import { assert, expect } from 'chai';
import { Canvas, CANVAS_MAX_HEIGHT, CANVAS_MAX_WIDTH } from '../../src/canvas';
import sinon, { SinonStub, SinonFake, SinonSpy } from 'sinon'
import { createCanvasForBoundaryCases, createCanvasForOutOfBoundaryCases } from '../testing.util';

describe('Unit Test - Canvas', function () {
  const VALID_HEIGHT: number = 3;
  const VALID_WIDTH: number = 4;
  const EMPTY_COLOR = ' ';
  let canvas: Canvas;

  describe('#constructor', function () {

    let createBackgroundPixelStub: SinonStub;
    let pixelsStub: SinonStub;
    let canvas: Canvas;

    beforeEach(function () {
      createBackgroundPixelStub = sinon.stub((Canvas as any).prototype, '_createBackgroundPixel');
    });

    afterEach(function () {
      createBackgroundPixelStub.restore();
    });

    it('should call createBackgroundPixel', function () {
      canvas = new Canvas(VALID_WIDTH, VALID_HEIGHT, null);
      sinon.assert.callCount(createBackgroundPixelStub, VALID_WIDTH * VALID_HEIGHT);
    });

  });

  describe('#render', function () {
    let createBackgroundPixelStub: SinonStub;
    let _renderElementStub: SinonStub;

    beforeEach(function () {
      createBackgroundPixelStub = sinon.stub((Canvas as any).prototype, '_createBackgroundPixel');
    });

    afterEach(function () {
      createBackgroundPixelStub.restore();
      _renderElementStub.restore();
    });

    it('should call render', function () {
      canvas = new Canvas(VALID_WIDTH, VALID_HEIGHT, null);
      _renderElementStub = sinon.stub((canvas as any), '_renderElement');
      canvas.render();
      sinon.assert.callCount(_renderElementStub, VALID_WIDTH * VALID_HEIGHT);
    });

    it('Boundary Test - should throws error is width and height are out of the bound', function () {
      createCanvasForOutOfBoundaryCases().forEach((canvasSize: any) => {
        expect(() => {
          canvas = new Canvas(canvasSize.width, canvasSize.height, null);
        }).to.throws('The width and height of the canvas must be integer with min=1, max=100.')
      });
    });
  });
});