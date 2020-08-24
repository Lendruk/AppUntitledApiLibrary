import fs from "fs";
import Parser, { Token } from "./Parser";
import { Match } from "./Match";

export type IndexableObject = { [index: string]: any };

type ActionFunction = (input: string, match: Match, options?: IndexableObject) => string;

export type Action = {
    function: ActionFunction;
    handler: string;
    token: Token;
};

export default class TemplateEngine {
    viewDirectory: string;
    actions: Array<Action>;

    private indexChange = 0;

    constructor(viewDirectory: string) {
        this.variableTokenAction = this.variableTokenAction.bind(this);
        this.viewDirectory = viewDirectory;
        this.actions = [];
    }

    registerAction(action: ActionFunction, handler: string): void {
        if (this.actions.find((act) => act.handler === handler))
            throw new Error("Cannot have more than one action with the same handler");

        this.actions.push({ function: action, handler, token: { expStart: "{{", expEnd: "}}" } });
    }

    registerToken(action: ActionFunction, token: Token): void {
        this.actions.push({ function: action, token, handler: "" });
    }

    /**
     * Creates a ReadStream from the supplied view component and renders it.
     * @param viewComp The name of the view component. (Refers to the name of the folder)
     * @param options Object containing properties that will be used by the template
     */
    async render(viewComp: string, options?: IndexableObject): Promise<string> {
        const stream = fs.createReadStream(`${process.cwd()}/app/${this.viewDirectory}/${viewComp}/index.munch`);
        const tokens = this.actions.map((act) => act.token);
        const token1 = { expStart: "{{", expEnd: "}}" };
        const parser = new Parser(tokens.concat(token1));
        let output = "";
        for await (const chunk of stream) {
            const matches = parser.parse(chunk);
            output += this.extractTokens(chunk.toString(), matches, options);
        }
        return output;
    }

    /**
     * TODO Implement the index change in another way
     * @param view
     * @param matches
     * @param options
     */
    private extractTokens(view: string, matches: Array<Match>, options?: IndexableObject): string {
        // const tokenRe = /(?<!({{2}(.|\n|\r)*)|{){([^{}]+)?}/gm;
        this.indexChange = 0;
        for (const match of matches) {
            const action = this.actions.find((act) => act.token.expStart === match.expStart);
            if (action) {
                view = action.function(view, match, options);
            }
        }

        return view;
    }

    /**
     * Parses the variable string and matches it with the options object in order to retrieve the value
     * of the variable. Ex "user.name"
     * @param variable the name of the variable
     * @param options the object which contains variables to be used on the view
     */
    extractVariable(variable: string, options?: IndexableObject): string {
        if (!options) return "";
        const variableParts = variable.split(".");
        const baseVariable = variableParts.shift();
        return variableParts.length > 0
            ? this.extractVariable(variableParts.join("."), baseVariable && options[baseVariable])
            : this.convertVariable(options[variable]);
    }

    private convertVariable(obj: any): string {
        return typeof obj === "object" ? JSON.stringify(obj) : obj;
    }

    /**
     * TEMPORALLY made public until indexchange issue is resolved
     * @param input 
     * @param match 
     * @param options 
     */
    variableTokenAction(input: string, match: Match, options?: IndexableObject): string {
        const variable = this.extractVariable(
            input
                .substring(match.chunkIndex + this.indexChange, match.chunkIndexEnd + this.indexChange)
                .replace(/[{}]/g, ""),
            options
        );
        if (variable) {
            input =
                input.slice(0, match.chunkIndex + this.indexChange) +
                variable +
                input.substr(match.chunkIndexEnd + 1 + this.indexChange);
            this.indexChange += variable.length - (match.chunkIndexEnd - match.chunkIndex + 1);
        }
        return input;
    }
}
