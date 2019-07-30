import { assert, expect } from 'chai';
import { Canvas, CANVAS_MAX_HEIGHT, CANVAS_MAX_WIDTH } from '../../src/canvas';
import { AsciiColor } from '../../src/ascii-color';
import { AsciiColorFactory } from '../../src/ascii-color-factory';
import sinon, { SinonStub, SinonFake, SinonSpy } from 'sinon'
import { EMPTY_COLOR } from '../testing.util';

describe('Integration Test - Canvas', function () {
  const VALID_HEIGHT: number = 3;
  const VALID_WIDTH: number = 4;
  let canvas: Canvas;

  const MESSAGE_INVALID_SIZE: string = "The width and height of the canvas must be integer with min=1, max=100.";

  const RESULT_EMPTY_CANVAS_4W_3H: string =
    '------' + '\n' +
    '|    |' + '\n' +
    '|    |' + '\n' +
    '|    |' + '\n' +
    '------';

  describe('#getPixel', function () {

    it('should getPixels', function () {
      let canvas = new Canvas(VALID_WIDTH, VALID_HEIGHT, new AsciiColorFactory(EMPTY_COLOR));
      const EXPECTED = Array(VALID_HEIGHT).fill([]).map(() => Array(VALID_WIDTH).fill({}).map(() => new AsciiColor(EMPTY_COLOR)));
      assert.deepEqual(canvas.getPixels(), EXPECTED);
    });

    it('should getPixel', function () {
      let canvas = new Canvas(VALID_WIDTH, VALID_HEIGHT, new AsciiColorFactory(EMPTY_COLOR));
      (canvas as any).pixels[1][1] = new AsciiColor('x');
      expect(canvas.getPixel(1, 1).equals(new AsciiColor('x'))).to.be.true;
    });

  });

  describe('#setPixel', function () {

    it('should setPixel', function () {
      let canvas = new Canvas(VALID_WIDTH, VALID_HEIGHT, new AsciiColorFactory(EMPTY_COLOR));
      expect(canvas.getPixel(2, 2).equals(new AsciiColor(EMPTY_COLOR))).to.be.true;
      canvas.setPixel(2, 2, new AsciiColor('x'));
      expect(canvas.getPixel(2, 2).equals(new AsciiColor('x'))).to.be.true;
    });

  });

  describe('#getHeight', function () {

    it('should getHeight', function () {
      let canvas = new Canvas(VALID_WIDTH, VALID_HEIGHT, new AsciiColorFactory(EMPTY_COLOR));
      expect(canvas.getHeight()).to.be.equals(VALID_HEIGHT);
    });

  });

  describe('#getWidth', function () {
    it('should getWidth', function () {
      let canvas = new Canvas(VALID_WIDTH, VALID_HEIGHT, new AsciiColorFactory(EMPTY_COLOR));
      expect(canvas.getWidth()).to.be.equals(VALID_WIDTH);
    });
  });

  describe('#constructor', function () {

    it('should has height and width', function () {
      let canvas = new Canvas(VALID_WIDTH, VALID_HEIGHT, new AsciiColorFactory(EMPTY_COLOR));
      expect(canvas.getHeight()).to.equal(VALID_HEIGHT);
      expect(canvas.getWidth()).to.equal(VALID_WIDTH);
    });

    it(`should create a canvas without error if height=${VALID_HEIGHT} and width=${VALID_WIDTH}`, function () {
      expect(() => { new Canvas(VALID_WIDTH, VALID_HEIGHT, new AsciiColorFactory(EMPTY_COLOR)); }).not.to.throws();
    });

  });

  describe('#render', function () {
    beforeEach(function () {
      canvas = new Canvas(VALID_WIDTH, VALID_HEIGHT, new AsciiColorFactory(EMPTY_COLOR));
    });

    it('should render an empty canvas\n' + RESULT_EMPTY_CANVAS_4W_3H, function () {
      assert.equal((new Canvas(VALID_WIDTH, VALID_HEIGHT, new AsciiColorFactory(' '))).render(), RESULT_EMPTY_CANVAS_4W_3H);
    });
  });

});