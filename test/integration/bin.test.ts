
import { assert, expect } from 'chai';
import sinon, { SinonStub, SinonFake, SinonSpy } from 'sinon'
import { Readable } from 'stream';
import fs from 'fs';
import { ReadableStreamStub } from '../testing.util';

describe('Integration Test - bin', function () {

    let processArgsOrg;
    let stdinStub: SinonStub;
    let stdoutStub: SinonStub;
    let fileStreamStub: SinonStub;
    let consoleLogStub: SinonStub;

    beforeEach(function () {
        processArgsOrg = process.argv;
        fileStreamStub = sinon.stub(fs, "createReadStream");
        consoleLogStub =  sinon.stub(console, "log");
    });

    this.afterEach(function () {
        process.argv = processArgsOrg;
        fileStreamStub.restore();
        if (stdinStub) {
            stdinStub.restore();
        }
        if (stdoutStub) {
            stdoutStub.restore();
        }
        if (consoleLogStub) {
            consoleLogStub.restore();
        }
    });

    describe('Integration Test - bin', function () {
        it('should handle null stream', function () {
            process.argv = ['npm', 'start', ''];
            stdinStub = sinon.stub(process, 'stdin').value(null);
            stdoutStub = sinon.stub(process, 'stdout').value(null);
            expect(() => require('../../src/bin')).to.throw('inStream cannot be null or undefined.');
        });
    });

    describe('Integration Test - bin', function () {
        it('should execute', function () {
            process.argv = ['npm', 'start'];
            stdinStub = sinon.stub(process, 'stdin').value(new ReadableStreamStub([]));
            stdoutStub = sinon.stub(process, 'stdout').value(null);
            expect(() => require('../../src/bin')).not.to.throw();
        });
    });


});