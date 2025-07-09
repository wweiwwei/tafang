import antlr4 = require("./antlr4");
import LogicBindDSLLexer from "./LogicBindDSLLexer";
import LogicBindDSLParser from "./LogicBindDSLParser";
import { GameLogicDSLEnv } from "./GameLogicDSLEnv";
import GameLogicDSLVisitor from "./GameLogicDSLVisitor";

export default class AstUtil {
    private parse(input: string) {
        const chars = new antlr4.InputStream(input);
        const lexer = new LogicBindDSLLexer(chars);
        const tokens = new antlr4.CommonTokenStream(lexer);
        const parser = new LogicBindDSLParser(tokens);
        // @ts-ignore
        parser.buildParseTrees = true;
        return parser;
    }

    eval(input: string, env: any[]) {
        // 数字直接返回，不再解析
        if (Number(input)) return Number(input);
        let tree: any;
        // 有缓存就读缓存，避免重复解析
        const cache = GIndex.treeCache.get(input);
        if (cache) {
            tree = cache;
        } else {
            const parser = this.parse(input);
            tree = parser.program();
            GIndex.treeCache.set(input, tree);
        }
        return tree.accept(new GameLogicDSLVisitor(new GameLogicDSLEnv(env)));
    }
}
declare global {
    /** 抽象语法树公式 */
    const AstUtil: AstUtil;
}

window["AstUtil"] = new AstUtil();
