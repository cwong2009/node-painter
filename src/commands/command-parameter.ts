/**
 * CommandParameter - It contains the command arguments
 * @class
 */
export class CommandParameter {

    /**
     * Create a CommandParameter.
     * @constructor
     * @param {string[]} args - The command arguments
     */
    constructor(private args: string[]) {
        this.args = args;
    }

    /**
     * Return the command arguments
     * @return {string[]}
     */
    public getArgs(): string[] {
        return this.args;
    }

    /**
     * Return a command argument
     * @return {string}
     */
    public getArg(index: number): string {
        return this.args[index];
    }
}
