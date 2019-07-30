import { expect } from 'chai';
import fs from 'fs'
import { Readable } from 'stream';
import { ReadableStreamStub } from '../testing.util';
import { BANNER } from "../../src/console-draw";

describe('Console Draw - e2e test', function () {
    const PROMPT_MESSAGE: string = "enter command: ";
    const SCREEN_OUTPUT: string =
        BANNER + "\n" + 
        "enter command: C 20 10" + "\n" +
        "----------------------" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "----------------------" + "\n" +
        "\n" +
        "enter command: R 3 2 7 4" + "\n" +
        "----------------------" + "\n" +
        "|                    |" + "\n" +
        "|  xxxxx             |" + "\n" +
        "|  x   x             |" + "\n" +
        "|  xxxxx             |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "----------------------" + "\n" +
        "\n" +
        "enter command: R 14 2 18 4" + "\n" +
        "----------------------" + "\n" +
        "|                    |" + "\n" +
        "|  xxxxx      xxxxx  |" + "\n" +
        "|  x   x      x   x  |" + "\n" +
        "|  xxxxx      xxxxx  |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "----------------------" + "\n" +
        "\n" +
        "enter command: L 6 8 14 8" + "\n" +
        "----------------------" + "\n" +
        "|                    |" + "\n" +
        "|  xxxxx      xxxxx  |" + "\n" +
        "|  x   x      x   x  |" + "\n" +
        "|  xxxxx      xxxxx  |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|     xxxxxxxxx      |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "----------------------" + "\n" +
        "\n" +
        "enter command: L 6 8 6 10" + "\n" +
        "----------------------" + "\n" +
        "|                    |" + "\n" +
        "|  xxxxx      xxxxx  |" + "\n" +
        "|  x   x      x   x  |" + "\n" +
        "|  xxxxx      xxxxx  |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|     xxxxxxxxx      |" + "\n" +
        "|     x              |" + "\n" +
        "|     x              |" + "\n" +
        "----------------------" + "\n" +
        "\n" +
        "enter command: L 14 8 14 10" + "\n" +
        "----------------------" + "\n" +
        "|                    |" + "\n" +
        "|  xxxxx      xxxxx  |" + "\n" +
        "|  x   x      x   x  |" + "\n" +
        "|  xxxxx      xxxxx  |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|                    |" + "\n" +
        "|     xxxxxxxxx      |" + "\n" +
        "|     x       x      |" + "\n" +
        "|     x       x      |" + "\n" +
        "----------------------" + "\n" +
        "\n" +
        "enter command: B 1 1 _" + "\n" +
        "----------------------" + "\n" +
        "|____________________|" + "\n" +
        "|__xxxxx______xxxxx__|" + "\n" +
        "|__x   x______x   x__|" + "\n" +
        "|__xxxxx______xxxxx__|" + "\n" +
        "|____________________|" + "\n" +
        "|____________________|" + "\n" +
        "|____________________|" + "\n" +
        "|_____xxxxxxxxx______|" + "\n" +
        "|_____x       x______|" + "\n" +
        "|_____x       x______|" + "\n" +
        "----------------------" + "\n" +
        "\n" +
        "enter command: Q" + "\n";

    let spawn;

    beforeEach(function () {
        spawn = require('child_process').spawn;
    });

    it('should read commands from stdin to draw a face', function (done) {
        this.timeout(30000);
        let painterProcess = spawn((process.platform === "win32") ? 'npm.cmd' : 'npm', ['start', '--silent'], { stdio: 'pipe' });
        let screenOutput: string = '';
        let commands = ["C 20 10", "R 3 2 7 4", "R 14 2 18 4", "L 6 8 14 8", "L 6 8 6 10", "L 14 8 14 10", "B 1 1 _", "Q"];

        painterProcess.on("exit", () => {
            //console.log(`******\n${screenOutput}******`);
            expect(screenOutput, "Screen outoput").to.be.equals(SCREEN_OUTPUT);
            done();
        });

        let rs = new ReadableStreamStub([]);
        rs.pipe(painterProcess.stdin);

        painterProcess.stdout.on('data', (data) => {
            screenOutput += data;
            if (data.toString().endsWith(PROMPT_MESSAGE)) {
                if (commands.length > 0) {
                    let command: string = commands.shift();
                    screenOutput += command + '\n';
                    rs.push(`${command}\n`);
                    if (commands.length == 0) {
                        rs.push(null);
                    }
                }
            }
        });

    });

    it('should read commands from "~/test/e2e/cs_logo_command_input.txt" to draw a credit suisse logo', function (done) {
        this.timeout(30000);

        let painterProcess = spawn((process.platform === "win32") ? 'npm.cmd' : 'npm', ['start', 'test/e2e/cs_logo_command_input.txt', '--silent']);
        let screenOutput: string = '';

        painterProcess.on("exit", () => {
            //console.log(`******\n${screenOutput}******`);
            fs.readFile('test/e2e/cs_logo_screen_output.txt', 'utf8', function (err, data) {
                data = data.replace(/[\n\r]+/g, '\n');
                screenOutput = screenOutput.replace(/[\n\r]+/g, '\n');
                expect(screenOutput === data, "Screen output does not match").to.be.true;
                done();
            });
        });

        painterProcess.stdout.on('data', (data) => {
            screenOutput += data.toString();
        });

    });

});

