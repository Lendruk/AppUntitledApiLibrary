import fs from "fs";
import Parser from "./Parser";
import { Match } from "./Match";

type IndexableObject = { [index: string]: any };

export default class TemplateEngine {
    viewDirectory: string;

    constructor(viewDirectory: string) {
        this.viewDirectory = viewDirectory;
    }

    async render(viewComp: string, options?: IndexableObject): Promise<string> {
        const stream = fs.createReadStream(`${process.cwd()}/app/${this.viewDirectory}/${viewComp}/index.munch`);
        const token1 = { expressionStart: "{{", expressionEnd: "}}" };
        const parser = new Parser([token1, { expressionStart: "{", expressionEnd: "}", enclosers: [token1] }]);
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
        let indexChange = 0;
        for (const match of matches) {
            //TODO - Make this generic for token types
            if (match.expressionStart === "{") {
                const variable = this.extractVariable(
                    view
                        .substring(match.chunkIndex + indexChange, match.chunkIndexEnd + indexChange)
                        .replace(/[{}]/g, ""),
                    options
                );
                if (variable) {
                    view =
                        view.slice(0, match.chunkIndex + indexChange) +
                        variable +
                        view.substr(match.chunkIndexEnd + 1 + indexChange);
                    indexChange += variable.length - (match.chunkIndexEnd - match.chunkIndex + 1);
                }
            }
        }

        return view;
    }

    private extractVariable(variable: string, options?: IndexableObject): string {
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
}
