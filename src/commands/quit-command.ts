import { Command } from "./command";
import { Canvas } from "../canvas";
import { CommandParameter } from "./command-parameter";

// The command prefix for QuitCommand
export const QUIT_COMMAND: string = "Q";

/**
 * QuitCommand
 * @class
 */
export class QuitCommand extends Command {

    /**
     * Create a QuitCommand
     * @constructor
     * @param {CommandParameter} context - The command context
     */
    constructor(parameter: CommandParameter) {
        super(parameter);
    }

    /**
     * Return the number of arguments of the command
     * @return {number}
     */
    public getNumberOfArguments(): number {
        return 0;
    }

    /**
     * Execute the command to quit the program
     * @return {void}
     */
    public execute(): void {
        process.exit(0);
    }

    /**
     * Return null
     * @return {void}
     */
    public getResult(): Canvas {
        return null;
    }

    /**
     * Verify the command arguments
     * @protected
     * @param {string[]} args - The command arguments
     * @throws {Error}  throws error if there is any argument
     */
    protected _verifyArgs(): void {
        super._verifyArgs();
    }

}
