import { AsciiColorFactory } from "../src/ascii-color-factory";
import { Canvas, CANVAS_MAX_WIDTH, CANVAS_MAX_HEIGHT } from "../src/canvas";
import { DrawCommandParameter } from "../src/commands/draw-command-parameter";
import { FillColorCommand } from "../src/commands/fill-color-command";
import { CreateCanvasCommandParameter } from "../src/commands/create-canvas-command-parameter";
import { CreateCanvasCommand } from "../src/commands/create-canvas-command";
import { DrawLineCommand } from "../src/commands/draw-line-command";
import { DrawRectangleCommand } from "../src/commands/draw-rectangle-command";
import { Readable, Writable } from "stream";

export const EMPTY_COLOR = ' ';
export const VALID_FILL_COLOR: string = "c";
export const EMPTY_COLOR_FACTORY: AsciiColorFactory = new AsciiColorFactory(EMPTY_COLOR);
export const LINE_COLOR_FACTORY: AsciiColorFactory = new AsciiColorFactory("x");
export const FILL_COLOR_FACTORY: AsciiColorFactory = new AsciiColorFactory(VALID_FILL_COLOR);


export class ReadableStreamStub extends Readable {
    constructor(private commands: string[]) {
        super();
    }
    _read(size) {
        if (this.commands.length) {
            this.push(this.commands.shift());
        }
    }
}

export class WritableStreamStub extends Writable {
    chunks: any[];

    constructor() {
        super();
        this.chunks = [];
    }

    _write(chunk, encoding, done): void {
        this.chunks.push(chunk);
        done();
    }
}

export function createCanvas(width: number, height: number): Canvas {
    let canvas: Canvas;
    let backgroundColorFactory: AsciiColorFactory = new AsciiColorFactory(EMPTY_COLOR);
    let args = [width.toString(), height.toString()];
    let createCanvasContext: CreateCanvasCommandParameter = new CreateCanvasCommandParameter(backgroundColorFactory, args);
    let createCanvasCommand: CreateCanvasCommand = new CreateCanvasCommand(createCanvasContext);
    createCanvasCommand.execute();
    canvas = createCanvasCommand.getResult();

    return canvas;
}

export function createCanvasForBoundaryCases(): any[] {
    let result: any[] = [];
    let widthValues: number[] = [1, 2, CANVAS_MAX_WIDTH - 1, CANVAS_MAX_WIDTH];
    let heightValues: number[] = [1, 2, CANVAS_MAX_HEIGHT - 1, CANVAS_MAX_HEIGHT];

    widthValues.forEach((width: number) => {
        heightValues.forEach((height: number) => {
            //create canvas for boundary cases
            result.push({ width, height });
        });
    });

    return result;
};

export function createCanvasForOutOfBoundaryCases(): any[] {
    let result: any[] = [];
    let widthValues: number[] = [0, CANVAS_MAX_WIDTH + 1];
    let heightValues: number[] = [0, CANVAS_MAX_HEIGHT + 1];

    widthValues.forEach((width: number) => {
        heightValues.forEach((height: number) => {
            result.push({ width, height });
        });
        result.push({ width, height: 1 });
    });
    heightValues.forEach((height: number) => {
        result.push({ width: 1, height });
    });

    return result;
};

export function generateSingleCoordinateForOutOfBoundaryCase(width: number, height: number): any[] {
    let result: any[] = [];

    for (let x = 0; x <= width + 1; x++) {
        [0, height + 1].forEach((y) => {
            result.push({ x, y });
        })
    }
    for (let y = 1; y <= height; y++) {
        [0, width + 1].forEach((x) => {
            result.push({ x, y });
        })
    }

    return result;
}

export function generateSingleCoordinateForBoundaryCase(width: number, height: number): any[] {
    let result: any[] = [];

    let yValues: number[] = [1, 2, height - 1, height];
    let xValues: number[] = [1, 2, width - 1, width];

    //remove invalid test value
    yValues = yValues.filter(y => (y > 0 && y <= height));
    yValues = yValues.filter((y, idx) => yValues.indexOf(y) === idx);
    xValues = xValues.filter(x => (x > 0 && x <= width));
    xValues = xValues.filter((x, idx) => xValues.indexOf(x) === idx);

    for (let x = 1; x <= width; x++) {
        yValues.forEach((y) => {
            result.push({ x, y });
        })
    }
    for (let y = 3; y <= height - 2; y++) {
        xValues.forEach((x) => {
            result.push({ x, y });
        })
    }

    return result;
}

export function fillColor(canvas: Canvas, args: string[]): Canvas {
    let parameter: DrawCommandParameter = new DrawCommandParameter(canvas, args);
    let command: FillColorCommand = new FillColorCommand(parameter);
    command.execute();

    return command.getResult();
}

export function drawLine(canvas: Canvas, args: string[]): Canvas {
    let parameter: DrawCommandParameter = new DrawCommandParameter(canvas, args);
    let command: DrawLineCommand = new DrawLineCommand(parameter);
    command.execute();

    return command.getResult();
}

export function drawRectangle(canvas: Canvas, args: string[]): Canvas {
    let parameter: DrawCommandParameter = new DrawCommandParameter(canvas, args);
    let command: DrawRectangleCommand = new DrawRectangleCommand(parameter);

    command.execute();

    return command.getResult();
}