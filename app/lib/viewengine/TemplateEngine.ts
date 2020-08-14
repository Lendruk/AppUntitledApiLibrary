import fs from "fs";

export default class TemplateEngine {
    viewDirectory: string;

    constructor(viewDirectory: string) {
        this.viewDirectory = viewDirectory;
    }

    render(viewComp: string): string {
        const view = fs.readFileSync(`${process.cwd()}/app/${this.viewDirectory}/${viewComp}/index.munch`);

        if (!view) throw new Error("View not found");

        return this.extractTokens(view.toString());
    }

    private extractTokens(view: string): string {
        return view;
    }
}
