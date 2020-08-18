import fs from "fs";
import Parser from "./Parser";

type IndexableObject = { [index: string]: any };

export default class TemplateEngine {
    viewDirectory: string;

    constructor(viewDirectory: string) {
        this.viewDirectory = viewDirectory;
    }

    render(viewComp: string, options?: IndexableObject): string {
        const stream = fs.createReadStream(`${process.cwd()}/app/${this.viewDirectory}/${viewComp}/index.munch`);

        stream.on("data", (chunk) => console.log("ch", chunk.toString()));
        const view = fs.readFileSync(`${process.cwd()}/app/${this.viewDirectory}/${viewComp}/index.munch`);

        const parser = new Parser(["{{", "{"]);

        parser.parse(stream);

        if (!view) throw new Error("View not found");

        return this.extractTokens(view.toString(), options);
    }

    private extractTokens(view: string, options?: IndexableObject): string {
        const tokenRe = /(?<!({{2}(.|\n|\r)*)|{){([^{}]+)?}/gm;

        let line = tokenRe.exec(view);
        while (line) {
            const rawValue = line?.values().next()!.value as string;

            if (line)
                view =
                    view.slice(0, line.index) +
                    this.extractVariable(rawValue.replace(/[{}]/g, ""), options) +
                    view.slice(line.index + rawValue.length);

            line = tokenRe.exec(view);
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
