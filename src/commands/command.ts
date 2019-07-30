import { Canvas } from "../canvas";
import { CommandParameter } from "./command-parameter";

/**
 * A abstract factory class for creating a Command.
 * @class
 * @abstract
 */
export abstract class Command {

    /** @protectedThe command context */
    protected _parameter: CommandParameter;

    /**
     * Create a Command and verify the command arguemnts
     * @constructor
     * @param {CommandParameter} context - A command context
     */
    constructor(parameter: CommandParameter) {
        this._parameter = parameter;
        this._verifyArgs();
    }

    /**
     * Return the number of arguments of the command
     * @abstract
     * @return {number}
     */
    public abstract getNumberOfArguments(): number;

    /**
     * Execute the command
     * @abstract
     * @return {void}
     */
    public abstract execute(): void;

    /**
     * Return the canvas result
     * @abstract
     * @return {Canvas}
     */
    public abstract getResult(): Canvas;

    /**
     * Return the command parameter
     * @return {CommandParameter}
     */
    public getParameter(): CommandParameter {
        return this._parameter;
    }

    /**
     * Verify the command arguments
     * @protected
     * @param {string[]} args - The command arguments
     * @throws {Error}  throws error if the number of arguments is not correct
     */
    protected _verifyArgs(): void {
        const parameter: CommandParameter = this.getParameter();
        const args: string[] = (parameter) ? parameter.getArgs() : [];
        if (!args || args.length !== this.getNumberOfArguments()) {
            throw new Error(`Invalid arguments. Expected ${this.getNumberOfArguments()} arguments, but got ${args.length}.`);
        }
    }

}
