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
            console.log("MATCHES", matches);
        }
        console.log("output", output);
        // const view = fs.readFileSync(`${process.cwd()}/app/${this.viewDirectory}/${viewComp}/index.munch`);

        // if (!view) throw new Error("View not found");

        return output;
    }

    private extractTokens(view: string, matches: Array<Match>, options?: IndexableObject): string {
        const tokenRe = /(?<!({{2}(.|\n|\r)*)|{){([^{}]+)?}/gm;
        for (const match of matches) {
            const variable = this.extractVariable(
                view.slice(match.chunkIndex, match.chunkIndexEnd).replace(/[{}]/g, ""),
                options
            );
            if (match.expressionStart === "{") {
                view = view.slice(0, match.chunkIndex) + view.slice(match.chunkIndexEnd);
                view = view.slice(0, match.chunkIndex) + variable + view.slice(match.chunkIndex + variable.length - 4);
            }
        }

        // let line = tokenRe.exec(view);
        // while (line) {
        //     const rawValue = line?.values().next()!.value as string;

        //     if (line)
        //         view =
        //             view.slice(0, line.index) +
        //             this.extractVariable(rawValue.replace(/[{}]/g, ""), options) +
        //             view.slice(line.index + rawValue.length);

        //     line = tokenRe.exec(view);
        // }

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
