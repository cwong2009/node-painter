import { assert, expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { CommandParameter } from '../../src/commands/command-parameter';
import { QuitCommand } from '../../src/commands/quit-command';

describe('Integration Test - QuitCommand', function () {

    describe('#constructor', function () {
        it('should create a QuitCommand', function () {
            let args = [];
            let parameter: CommandParameter = new CommandParameter(args);
            expect(() => { new QuitCommand(parameter) }).not.to.throws()
        });

        it('Boundary Check - should throws exception if there is number of  args=1', function () {
            let args = ["10"];
            let parameter: CommandParameter = new CommandParameter(args);

            expect(() => new QuitCommand(parameter)).to.throw('Invalid arguments. Expected 0 arguments, but got 1.')
        });
    });
    
    describe('#getResult', function () {
        it('should getResult', function () {
            let parameter: CommandParameter = new CommandParameter([]);
            let command: QuitCommand = new QuitCommand(null);
            expect(command.getResult()).to.be.null;
        });
    });

    describe('#getNumberOfArguments', function () {
        it('should getNumberOfArguments', function () {
            let parameter: CommandParameter = new CommandParameter([]);
            let command: QuitCommand = new QuitCommand(null);
            expect(command.getNumberOfArguments()).to.be.equals(0);
        });
    });


});