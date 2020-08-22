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
        console.log("output", output);
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

                console.log("index change", indexChange);
                console.log("match", match);
                console.log("variable", variable);
                console.log("begin", view.slice(0, match.chunkIndex + indexChange));
                console.log("end", view.substr(match.chunkIndexEnd + indexChange));
                if (variable) {
                    view =
                        view.slice(0, match.chunkIndex + indexChange) +
                        variable +
                        view.substr(match.chunkIndexEnd + indexChange);
                    indexChange += variable.length - (match.chunkIndexEnd - match.chunkIndex);
                }
            }
        }

        return view;
    }

    private extractVariable(variable: string, options?: IndexableObject): string {
        if (!options) return "";
        console.log("variable input", variable);
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
