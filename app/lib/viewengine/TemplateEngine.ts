import fs from "fs";

type IndexableObject = { [index: string]: any };

export default class TemplateEngine {
    viewDirectory: string;

    constructor(viewDirectory: string) {
        this.viewDirectory = viewDirectory;
    }

    render(viewComp: string, options?: IndexableObject): string {
        const view = fs.readFileSync(`${process.cwd()}/app/${this.viewDirectory}/${viewComp}/index.munch`);

        if (!view) throw new Error("View not found");

        return this.extractTokens(view.toString(), options);
    }

    private extractTokens(view: string, options?: IndexableObject): string {
        const tokenRe = /(?<!({{2}(.|\n|\r)*)|{){([^{}]+)?}/gm;
        const actionRegex = /{{2}([^{}]+)?}{2}/g;

        let line = tokenRe.exec(view);
        while (line) {
            console.log("MATCH", view.match(tokenRe));
            console.log("line", line);
            const rawValue = line?.values().next()!.value as string;

            if (line)
                view =
                    view.slice(0, line.index) +
                    this.extractVariable(rawValue.replace(/[{}]/g, ""), options) +
                    view.slice(line.index + rawValue.length);

            console.log("view\n", view);
            console.log("===================");
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
