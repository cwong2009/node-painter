import { assert, expect } from 'chai';
import { ConsoleDraw } from '../../src/console-draw';
import sinon, { SinonStub, SinonFake, SinonSpy } from 'sinon'
import { Readable, Writable } from 'stream';
import readline from 'readline';
import { ReadableStreamStub, WritableStreamStub } from '../testing.util';
import { Canvas } from '../../src/canvas';

const MESSAGE_UNRECOGNIZED_COMMAND: string = "Unrecognized command. Please enter again.";
const MESSAGE_INVALID_INSTREAM: string = "inStream cannot be null or undefined.";

describe('Unit Test - ConsoleDraw', function () {
  let painter: ConsoleDraw;
  let outStreamStub: SinonStub;
  let exit: SinonStub;
  const writeableStreamStub: WritableStreamStub = new WritableStreamStub();
  let readableStreamStub: ReadableStreamStub;
  let processStdinStub: SinonStub;

  beforeEach(function () {
    exit = sinon.stub(process, 'exit');
    processStdinStub = sinon.stub(process, "stdin").value(new ReadableStreamStub([]));
    readableStreamStub = new ReadableStreamStub([]);
    outStreamStub = sinon.stub(writeableStreamStub, "write");
    painter = new ConsoleDraw(readableStreamStub, writeableStreamStub);
  });

  afterEach(function () {
    exit.restore();
    processStdinStub.restore();
    outStreamStub.restore();
  });

  describe('#printLine', function () {
    it('should printLine', function () {
      painter.printLine("123456")
      sinon.assert.calledWith(outStreamStub, '123456\n');
      sinon.assert.callCount(outStreamStub, 1);
    });

    it('should not crash if no outStream when calling printLine', function () {
      let painter = new ConsoleDraw(new ReadableStreamStub([]), null);
      painter.printLine("123");
    });
  });
  describe('#print', function () {

    it('should print', function () {
      painter.print("123456")
      sinon.assert.calledWith(outStreamStub, '123456');
      sinon.assert.callCount(outStreamStub, 1);
    });

    it('should not crash if no outStream when calling print', function () {
      let painter = new ConsoleDraw(new ReadableStreamStub([]), null);
      painter.print("123");
    });
  });

  describe('#parseLine', function () {
    let runCommandStub: SinonStub;
    let renderStub: SinonStub;
    let printLineStub: SinonStub;
    let painter: ConsoleDraw;
    const RENDER_CONTENT: string = "RENDER CONTENT";
    beforeEach(function () {
      readableStreamStub = new ReadableStreamStub([]);
      painter = new ConsoleDraw(readableStreamStub, null);

      renderStub = sinon.stub(painter, "render").callsFake(() => RENDER_CONTENT);
      printLineStub = sinon.stub(painter, "printLine");
    });

    afterEach(function () {
      if (runCommandStub) {
        runCommandStub.restore();
      }
      renderStub.restore();
      printLineStub.restore();
    });

    it('should parseLine', function () {
      runCommandStub = sinon.stub(painter, "runCommand");
      //
      painter.parseLine("C 20 20\n");
      sinon.assert.callCount(runCommandStub, 1);
      sinon.assert.callCount(renderStub, 1);
      sinon.assert.callCount(printLineStub, 2);
      sinon.assert.calledWithExactly(printLineStub.getCall(0), "C 20 20\n");
      sinon.assert.calledWithExactly(printLineStub.getCall(1), RENDER_CONTENT + "\n");
      sinon.assert.callOrder(runCommandStub, renderStub, printLineStub);
    });

    it('should readLine with process.stdin', function () {
      painter = new ConsoleDraw(process.stdin, null);
      runCommandStub = sinon.stub(painter, "runCommand");
      renderStub = sinon.stub(painter, "render").callsFake(() => RENDER_CONTENT);
      printLineStub = sinon.stub(painter, "printLine");
      //
      painter.parseLine("C 20 20\n");
      sinon.assert.callCount(runCommandStub, 1);
      sinon.assert.callCount(renderStub, 1);
      sinon.assert.callCount(printLineStub, 1);
      sinon.assert.calledWithExactly(printLineStub, RENDER_CONTENT + "\n");
      sinon.assert.callOrder(runCommandStub, renderStub, printLineStub);
    });

    it('should handle exception for invalid input', function () {
      painter.parseLine("G\n");
      sinon.assert.callCount(printLineStub, 2);
      sinon.assert.calledWithExactly(printLineStub.getCall(0), "G\n");
      sinon.assert.calledWithExactly(printLineStub.getCall(1), "Error: " + MESSAGE_UNRECOGNIZED_COMMAND);
    });

  });

  describe('#run', function () {

    let promptStub: SinonStub;
    let parseLineStub: SinonStub;
    let printLineStub: SinonStub;
    let customReadable: ReadableStreamStub;
    let processStdinStub: SinonStub;

    beforeEach(function () {
      let commands = [
        "C 20 20\n",
        "Q\n"
      ];
      customReadable = new ReadableStreamStub(commands);
      processStdinStub = sinon.stub(process, "stdin").value(customReadable);
    });

    afterEach(function () {
      if (promptStub) {
        promptStub.restore();
      }
      if (parseLineStub) {
        parseLineStub.restore();
      }
      if (printLineStub) {
        printLineStub.restore();
      }

      processStdinStub.restore();
    });

    it('should run without crash', function () {
      painter.run();
    });

    it('should read from input stream and call parseLine()', function (done) {
      let customReadable = new ReadableStreamStub([]);
      let painter = new ConsoleDraw(customReadable, null);
      parseLineStub = sinon.stub(painter, "parseLine");
      painter.run();
      customReadable.on('end', () => {
        sinon.assert.callCount(parseLineStub, 2);
        done();
      });
      customReadable.push("C 20 20\n");
      customReadable.push("Q\n");
      customReadable.push(null);
    });

    it('should read from process.stdin parseLine()', function (done) {
      let painter = new ConsoleDraw(process.stdin, null);
      parseLineStub = sinon.stub(painter, "parseLine");
      process.stdin.on('end', () => {
        sinon.assert.callCount(parseLineStub, 2);
        done();
      });
      painter.run();
      customReadable.push("C 20 20\n");
      customReadable.push("Q\n");
      customReadable.push(null);
    });

    it('should throws exception if input stream is not provided', function () {
      expect(() => new ConsoleDraw(null, null)).to.throw(MESSAGE_INVALID_INSTREAM)
    });

    it('should print the information for the thrown exception', function () {
      printLineStub = sinon.stub(painter, "printLine");
      promptStub = sinon.stub(readline, "createInterface").callsFake(() => null);
      painter.run();
      sinon.assert.callCount(printLineStub, 1);
      sinon.assert.neverCalledWith(outStreamStub, "enter command: ");
      sinon.assert.calledWith(exit, 1);
      sinon.assert.callCount(exit, 1);
    });

  });

  describe('#runCommand', function () {
    let painter: ConsoleDraw;

    beforeEach(function () {
      readableStreamStub = new ReadableStreamStub([]);
      painter = new ConsoleDraw(readableStreamStub, null);
      painter.runCommand(["C", "20", "20"]);
    });

    it('should throws exception if input nothing as command', function () {
      expect(() => painter.runCommand([])).to.throw(MESSAGE_UNRECOGNIZED_COMMAND)
    });

    it('should handle unrecognized command', function () {
      expect(() => painter.runCommand(["X"])).to.throw(MESSAGE_UNRECOGNIZED_COMMAND)
    });

    it('should run the QuitCommand', function () {
      painter.runCommand(["Q"]);
      sinon.assert.calledWith(exit, 0);
      sinon.assert.callCount(exit, 1);
    });

    it('should run the CreateCanvasCommand', function () {
      painter.runCommand(["C", "20", "20"]);
      expect(painter.getCanvas()).not.to.be.null;
    });

    it('should throws run the DrawLineCommand', function () {
      let e = expect(() => {
        painter.runCommand(["L", "20"]);
      });

      e.to.throws("Invalid arguments. Expected 4 arguments, but got 1.");
      e.not.to.throws(MESSAGE_UNRECOGNIZED_COMMAND);
    });

    it('should run the DrawLineCommand', function () {
      painter.runCommand(["C", "20", "20"]);

      let e = expect(() => {
        painter.runCommand(["L", "1", "1", "1", "2"]);
      });

      e.not.to.throws();
    });

    it('should throws error run the DrawRectangleCommand', function () {
      let e = expect(() => {
        painter.runCommand(["R", "20"]);
      });

      e.to.throws("Invalid arguments. Expected 4 arguments, but got 1.");
      e.not.to.throws(MESSAGE_UNRECOGNIZED_COMMAND);
    });

    it('should run the DrawRectangleCommand', function () {
      painter.runCommand(["C", "20", "20"]);

      let e = expect(() => {
        painter.runCommand(["R", "1", "1", "2", "2"]);
      });

      e.not.to.throws();
    });

    it('should throws run the FillColorCommand', function () {
      let e = expect(() => {
        painter.runCommand(["B", "20"]);
      });

      e.to.throws("Invalid arguments. Expected 3 arguments, but got 1.");
      e.not.to.throws(MESSAGE_UNRECOGNIZED_COMMAND);
    });

    it('should run the FillColorCommand', function () {

      let e = expect(() => {
        painter.runCommand(["B", "1", "1", "c"]);
      });

      e.not.to.throws();
    });
  });


  describe('#render', function () {
    const RESULT_EMPTY_CANVAS_2W_2H: string =
      '----' + '\n' +
      '|  |' + '\n' +
      '|  |' + '\n' +
      '----';

    beforeEach(function () {
      readableStreamStub = new ReadableStreamStub([]);
    });

    it('should render a cavnas', function () {
      painter = new ConsoleDraw(readableStreamStub, null);
      painter.runCommand(["C", "2", "2"]);
      expect(painter.render()).to.equal(RESULT_EMPTY_CANVAS_2W_2H);
    });

  });
});
