import { Match } from "./Match";

export type Token = {
    expStart: string;
    expEnd: string;
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
        if (line.length === 0) return [];

        for (const token of this.tokens) {
            if (currentMatches.has(token.expStart)) {
                const regex = this.buildTokenRegex(token.expEnd);
                const x = regex.exec(line);
                const index = x?.index;
                if (index != null && index !== -1) {
                    const match: Match = {
                        chunkIndex: currentMatches.get(token.expStart)!,
                        chunkIndexEnd: globalIndex + index,
                        globalIndex,
                        expStart: token.expStart,
                        expEnd: token.expEnd,
                    };
                    currentMatches.delete(token.expStart);
                    lineMatches.push(match);
                    lineMatches = lineMatches.concat(
                        this.matchToken(line.substr(index + 1), globalIndex + index + 1, currentMatches)
                    );
                }
            } else {
                const regex = this.buildTokenRegex(token.expStart);
                const x = regex.exec(line);
                const index = x?.index;
                if (index != null && index !== -1 && !this.hasEnclosers(currentMatches, token.enclosers)) {
                    currentMatches.set(token.expStart, index + globalIndex);
                    lineMatches = lineMatches.concat(this.matchToken(line, globalIndex, currentMatches));
                }
            }
        }

        return lineMatches;
    }

    private hasEnclosers(map: Map<string, number>, enclosers?: Array<Token>): boolean {
        if (!enclosers) return false;

        for (const enclosure of enclosers.map((encloser) => encloser.expStart)) {
            if (map.has(enclosure)) return true;
        }

        return false;
    }

    private buildTokenRegex(token: string): RegExp {
        return new RegExp(`(?<!${token})${token}(?!${token})`, "g");
    }
}
