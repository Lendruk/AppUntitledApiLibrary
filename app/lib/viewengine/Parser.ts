import { ReadStream } from "fs";

type Match = {
    chunkIndex: number;
    globalIndex: number;
};

export default class Parser {
    constructor(private tokens: Array<string>) {
        this.extractChunkData = this.extractChunkData.bind(this);
    }

    parse(content: ReadStream): string {
        let output = "";
        const currentMatches = new Map<string, Match>();

        content.on("data", (data) => {
            output += this.extractChunkData(data, output.length, currentMatches);

        });

        return output;
    }

    private extractChunkData(data: string | Buffer, globalIndex: number, currentMatches: Map<string, Match>): string {
        let searchIndex = 0;
        data += "\n";
        for (let i = 0; i < data.length; i++) {
            const endLineIndex = data.indexOf("\n", searchIndex);
            console.log(endLineIndex);
            console.log(searchIndex);
            const curLine = data.slice(i, endLineIndex).toString();
            this.matchToken(curLine);
            // console.log("--->", curLine);

            if (endLineIndex === -1) break;
            searchIndex = endLineIndex + 1;
            i = i + (endLineIndex - i);

            console.log("I", i);
        }
        return "";
    }

    private matchToken(line: string ) {
        
        for(const token of this.tokens) {
            const regex = new RegExp(token, "g");
            const match = line.match(regex);
            console.log("MATCH", match);
        }
    }
}
