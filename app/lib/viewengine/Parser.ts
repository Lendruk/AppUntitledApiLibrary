import { ReadStream } from "fs";
import { Match } from "./Match";

type Token = {
    expressionStart: string;
    expressionEnd: string;
    enclosers?: Array<Token>;
};

export default class Parser {
    tokens: Array<Token>;

    constructor(tokens: Array<Token>) {
        this.tokens = tokens;
    }

    parse(chunk: string): Array<Match> {
        const currentMatches = new Map<string, number>();
        const globalIndex = 0;

        return this.extractChunkData(chunk, globalIndex, currentMatches);
    }

    private extractChunkData(
        data: string | Buffer,
        globalIndex: number,
        currentMatches: Map<string, number>
    ): Array<Match> {
        let searchIndex = 0;
        data += "\n";
        let matches = new Array<Match>();
        for (let i = 0; i < data.length; i++) {
            const endLineIndex = data.indexOf("\n", searchIndex);
            const curLine = data.slice(i, endLineIndex).toString();
            const t = this.matchToken(curLine, globalIndex + i, currentMatches);
            matches = matches.concat(t);

            if (endLineIndex === -1) break;
            searchIndex = endLineIndex + 1;
            i = i + (endLineIndex - i);
        }
        return matches;
    }

    private matchToken(line: string, globalIndex: number, currentMatches: Map<string, number>): Array<Match> {
        let lineMatches = new Array<Match>();
        for (const token of this.tokens) {
            if (currentMatches.has(token.expressionStart)) {
                const regex = this.buildTokenRegex(token.expressionEnd);
                const x = regex.exec(line);
                const index = x?.index;
                if (index != null && index !== -1) {
                    const match: Match = {
                        chunkIndex: currentMatches.get(token.expressionStart)!,
                        chunkIndexEnd: globalIndex + index,
                        globalIndex,
                        expressionStart: token.expressionStart,
                        expressionEnd: token.expressionEnd,
                    };
                    currentMatches.delete(token.expressionStart);
                    lineMatches.push(match);
                }
            } else {
                const regex = this.buildTokenRegex(token.expressionStart);
                const x = regex.exec(line);
                const index = x?.index;
                if (index != null && index !== -1 && !this.hasEnclosers(currentMatches, token.enclosers)) {
                    currentMatches.set(token.expressionStart, index + globalIndex);
                    lineMatches = lineMatches.concat(this.matchToken(line, globalIndex, currentMatches));
                }
            }
        }

        return lineMatches;
    }

    private hasEnclosers(map: Map<string, number>, enclosers?: Array<Token>): boolean {
        if (!enclosers) return false;

        for (const enclosure of enclosers.map((encloser) => encloser.expressionStart)) {
            if (map.has(enclosure)) return true;
        }

        return false;
    }

    private buildTokenRegex(token: string): RegExp {
        return new RegExp(`(?<!${token})${token}(?!${token})`, "g");
    }
}
