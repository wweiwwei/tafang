// @ts-nocheck
// Generated from java-escape by ANTLR 4.11.1
// jshint ignore: start
import antlr4 = require("./antlr4");
import LogicBindDSLVisitor from "./LogicBindDSLVisitor";

const serializedATN = [
    4, 1, 48, 234, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7, 6, 1, 0, 1, 0, 3, 0,
    17, 8, 0, 1, 0, 5, 0, 20, 8, 0, 10, 0, 12, 0, 23, 9, 0, 1, 0, 3, 0, 26, 8, 0, 1, 1, 1, 1, 1, 1, 3, 1, 31, 8, 1, 1,
    1, 5, 1, 34, 8, 1, 10, 1, 12, 1, 37, 9, 1, 1, 1, 3, 1, 40, 8, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 3, 2, 47, 8, 2, 1, 3,
    1, 3, 1, 3, 3, 3, 52, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 5, 3, 58, 8, 3, 10, 3, 12, 3, 61, 9, 3, 3, 3, 63, 8, 3, 1, 3, 1,
    3, 3, 3, 67, 8, 3, 1, 3, 1, 3, 1, 3, 3, 3, 72, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1,
    3, 1, 3, 1, 3, 1, 3, 3, 3, 88, 8, 3, 1, 3, 3, 3, 91, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1,
    3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 5, 3, 119, 8, 3,
    10, 3, 12, 3, 122, 9, 3, 3, 3, 124, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 5, 3, 131, 8, 3, 10, 3, 12, 3, 134, 9, 3, 3,
    3, 136, 8, 3, 1, 3, 3, 3, 139, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3,
    1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1,
    3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3, 189, 8, 3, 1, 3,
    1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3, 198, 8, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3, 204, 8, 3, 1, 3, 1, 3, 1, 3, 1,
    3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 5, 3, 215, 8, 3, 10, 3, 12, 3, 218, 9, 3, 1, 4, 1, 4, 1, 4, 5, 4, 223, 8, 4, 10, 4,
    12, 4, 226, 9, 4, 1, 5, 1, 5, 1, 5, 1, 5, 1, 6, 1, 6, 1, 6, 0, 1, 6, 7, 0, 2, 4, 6, 8, 10, 12, 0, 6, 1, 0, 15, 17,
    2, 0, 13, 13, 18, 18, 1, 0, 19, 22, 1, 0, 23, 26, 1, 0, 27, 29, 1, 0, 43, 45, 282, 0, 14, 1, 0, 0, 0, 2, 27, 1, 0,
    0, 0, 4, 43, 1, 0, 0, 0, 6, 138, 1, 0, 0, 0, 8, 219, 1, 0, 0, 0, 10, 227, 1, 0, 0, 0, 12, 231, 1, 0, 0, 0, 14, 21,
    3, 6, 3, 0, 15, 17, 5, 1, 0, 0, 16, 15, 1, 0, 0, 0, 16, 17, 1, 0, 0, 0, 17, 18, 1, 0, 0, 0, 18, 20, 3, 6, 3, 0, 19,
    16, 1, 0, 0, 0, 20, 23, 1, 0, 0, 0, 21, 19, 1, 0, 0, 0, 21, 22, 1, 0, 0, 0, 22, 25, 1, 0, 0, 0, 23, 21, 1, 0, 0, 0,
    24, 26, 5, 1, 0, 0, 25, 24, 1, 0, 0, 0, 25, 26, 1, 0, 0, 0, 26, 1, 1, 0, 0, 0, 27, 28, 5, 2, 0, 0, 28, 35, 3, 6, 3,
    0, 29, 31, 5, 1, 0, 0, 30, 29, 1, 0, 0, 0, 30, 31, 1, 0, 0, 0, 31, 32, 1, 0, 0, 0, 32, 34, 3, 6, 3, 0, 33, 30, 1, 0,
    0, 0, 34, 37, 1, 0, 0, 0, 35, 33, 1, 0, 0, 0, 35, 36, 1, 0, 0, 0, 36, 39, 1, 0, 0, 0, 37, 35, 1, 0, 0, 0, 38, 40, 5,
    1, 0, 0, 39, 38, 1, 0, 0, 0, 39, 40, 1, 0, 0, 0, 40, 41, 1, 0, 0, 0, 41, 42, 5, 3, 0, 0, 42, 3, 1, 0, 0, 0, 43, 46,
    5, 4, 0, 0, 44, 47, 3, 2, 1, 0, 45, 47, 3, 6, 3, 0, 46, 44, 1, 0, 0, 0, 46, 45, 1, 0, 0, 0, 47, 5, 1, 0, 0, 0, 48,
    49, 6, 3, -1, 0, 49, 51, 5, 5, 0, 0, 50, 52, 3, 6, 3, 0, 51, 50, 1, 0, 0, 0, 51, 52, 1, 0, 0, 0, 52, 139, 1, 0, 0,
    0, 53, 62, 5, 6, 0, 0, 54, 59, 5, 43, 0, 0, 55, 56, 5, 7, 0, 0, 56, 58, 5, 43, 0, 0, 57, 55, 1, 0, 0, 0, 58, 61, 1,
    0, 0, 0, 59, 57, 1, 0, 0, 0, 59, 60, 1, 0, 0, 0, 60, 63, 1, 0, 0, 0, 61, 59, 1, 0, 0, 0, 62, 54, 1, 0, 0, 0, 62, 63,
    1, 0, 0, 0, 63, 64, 1, 0, 0, 0, 64, 67, 5, 8, 0, 0, 65, 67, 5, 43, 0, 0, 66, 53, 1, 0, 0, 0, 66, 65, 1, 0, 0, 0, 67,
    68, 1, 0, 0, 0, 68, 71, 5, 9, 0, 0, 69, 72, 3, 2, 1, 0, 70, 72, 3, 6, 3, 0, 71, 69, 1, 0, 0, 0, 71, 70, 1, 0, 0, 0,
    72, 139, 1, 0, 0, 0, 73, 74, 5, 6, 0, 0, 74, 75, 3, 6, 3, 0, 75, 76, 5, 8, 0, 0, 76, 139, 1, 0, 0, 0, 77, 78, 5, 13,
    0, 0, 78, 139, 3, 6, 3, 27, 79, 80, 5, 30, 0, 0, 80, 139, 3, 6, 3, 20, 81, 82, 5, 33, 0, 0, 82, 83, 5, 6, 0, 0, 83,
    84, 3, 6, 3, 0, 84, 87, 5, 8, 0, 0, 85, 88, 3, 2, 1, 0, 86, 88, 3, 6, 3, 0, 87, 85, 1, 0, 0, 0, 87, 86, 1, 0, 0, 0,
    88, 90, 1, 0, 0, 0, 89, 91, 3, 4, 2, 0, 90, 89, 1, 0, 0, 0, 90, 91, 1, 0, 0, 0, 91, 139, 1, 0, 0, 0, 92, 93, 5, 34,
    0, 0, 93, 94, 5, 6, 0, 0, 94, 95, 3, 6, 3, 0, 95, 96, 5, 8, 0, 0, 96, 97, 3, 2, 1, 0, 97, 139, 1, 0, 0, 0, 98, 99,
    5, 37, 0, 0, 99, 139, 5, 43, 0, 0, 100, 101, 5, 37, 0, 0, 101, 102, 5, 43, 0, 0, 102, 103, 5, 38, 0, 0, 103, 139, 3,
    6, 3, 13, 104, 105, 5, 43, 0, 0, 105, 106, 5, 38, 0, 0, 106, 139, 3, 6, 3, 12, 107, 139, 5, 39, 0, 0, 108, 139, 5,
    40, 0, 0, 109, 139, 5, 41, 0, 0, 110, 139, 5, 42, 0, 0, 111, 139, 5, 43, 0, 0, 112, 139, 5, 45, 0, 0, 113, 139, 5,
    44, 0, 0, 114, 123, 5, 10, 0, 0, 115, 120, 3, 6, 3, 0, 116, 117, 5, 7, 0, 0, 117, 119, 3, 6, 3, 0, 118, 116, 1, 0,
    0, 0, 119, 122, 1, 0, 0, 0, 120, 118, 1, 0, 0, 0, 120, 121, 1, 0, 0, 0, 121, 124, 1, 0, 0, 0, 122, 120, 1, 0, 0, 0,
    123, 115, 1, 0, 0, 0, 123, 124, 1, 0, 0, 0, 124, 125, 1, 0, 0, 0, 125, 139, 5, 11, 0, 0, 126, 135, 5, 2, 0, 0, 127,
    132, 3, 10, 5, 0, 128, 129, 5, 7, 0, 0, 129, 131, 3, 10, 5, 0, 130, 128, 1, 0, 0, 0, 131, 134, 1, 0, 0, 0, 132, 130,
    1, 0, 0, 0, 132, 133, 1, 0, 0, 0, 133, 136, 1, 0, 0, 0, 134, 132, 1, 0, 0, 0, 135, 127, 1, 0, 0, 0, 135, 136, 1, 0,
    0, 0, 136, 137, 1, 0, 0, 0, 137, 139, 5, 3, 0, 0, 138, 48, 1, 0, 0, 0, 138, 66, 1, 0, 0, 0, 138, 73, 1, 0, 0, 0,
    138, 77, 1, 0, 0, 0, 138, 79, 1, 0, 0, 0, 138, 81, 1, 0, 0, 0, 138, 92, 1, 0, 0, 0, 138, 98, 1, 0, 0, 0, 138, 100,
    1, 0, 0, 0, 138, 104, 1, 0, 0, 0, 138, 107, 1, 0, 0, 0, 138, 108, 1, 0, 0, 0, 138, 109, 1, 0, 0, 0, 138, 110, 1, 0,
    0, 0, 138, 111, 1, 0, 0, 0, 138, 112, 1, 0, 0, 0, 138, 113, 1, 0, 0, 0, 138, 114, 1, 0, 0, 0, 138, 126, 1, 0, 0, 0,
    139, 216, 1, 0, 0, 0, 140, 141, 10, 26, 0, 0, 141, 142, 5, 14, 0, 0, 142, 215, 3, 6, 3, 27, 143, 144, 10, 25, 0, 0,
    144, 145, 7, 0, 0, 0, 145, 215, 3, 6, 3, 26, 146, 147, 10, 24, 0, 0, 147, 148, 7, 1, 0, 0, 148, 215, 3, 6, 3, 25,
    149, 150, 10, 23, 0, 0, 150, 151, 7, 2, 0, 0, 151, 215, 3, 6, 3, 24, 152, 153, 10, 22, 0, 0, 153, 154, 7, 3, 0, 0,
    154, 215, 3, 6, 3, 23, 155, 156, 10, 21, 0, 0, 156, 157, 7, 4, 0, 0, 157, 215, 3, 6, 3, 22, 158, 159, 10, 19, 0, 0,
    159, 160, 5, 31, 0, 0, 160, 215, 3, 6, 3, 20, 161, 162, 10, 18, 0, 0, 162, 163, 5, 32, 0, 0, 163, 215, 3, 6, 3, 19,
    164, 165, 10, 15, 0, 0, 165, 166, 5, 35, 0, 0, 166, 167, 3, 6, 3, 0, 167, 168, 5, 36, 0, 0, 168, 169, 3, 6, 3, 16,
    169, 215, 1, 0, 0, 0, 170, 171, 10, 11, 0, 0, 171, 172, 5, 12, 0, 0, 172, 173, 5, 43, 0, 0, 173, 174, 5, 38, 0, 0,
    174, 215, 3, 6, 3, 12, 175, 176, 10, 10, 0, 0, 176, 177, 5, 10, 0, 0, 177, 178, 3, 6, 3, 0, 178, 179, 5, 11, 0, 0,
    179, 180, 5, 38, 0, 0, 180, 181, 3, 6, 3, 11, 181, 215, 1, 0, 0, 0, 182, 183, 10, 32, 0, 0, 183, 184, 5, 10, 0, 0,
    184, 185, 3, 6, 3, 0, 185, 186, 5, 11, 0, 0, 186, 188, 5, 6, 0, 0, 187, 189, 3, 8, 4, 0, 188, 187, 1, 0, 0, 0, 188,
    189, 1, 0, 0, 0, 189, 190, 1, 0, 0, 0, 190, 191, 5, 8, 0, 0, 191, 215, 1, 0, 0, 0, 192, 193, 10, 31, 0, 0, 193, 194,
    5, 12, 0, 0, 194, 195, 5, 43, 0, 0, 195, 197, 5, 6, 0, 0, 196, 198, 3, 8, 4, 0, 197, 196, 1, 0, 0, 0, 197, 198, 1,
    0, 0, 0, 198, 199, 1, 0, 0, 0, 199, 215, 5, 8, 0, 0, 200, 201, 10, 30, 0, 0, 201, 203, 5, 6, 0, 0, 202, 204, 3, 8,
    4, 0, 203, 202, 1, 0, 0, 0, 203, 204, 1, 0, 0, 0, 204, 205, 1, 0, 0, 0, 205, 215, 5, 8, 0, 0, 206, 207, 10, 29, 0,
    0, 207, 208, 5, 10, 0, 0, 208, 209, 3, 6, 3, 0, 209, 210, 5, 11, 0, 0, 210, 215, 1, 0, 0, 0, 211, 212, 10, 28, 0, 0,
    212, 213, 5, 12, 0, 0, 213, 215, 5, 43, 0, 0, 214, 140, 1, 0, 0, 0, 214, 143, 1, 0, 0, 0, 214, 146, 1, 0, 0, 0, 214,
    149, 1, 0, 0, 0, 214, 152, 1, 0, 0, 0, 214, 155, 1, 0, 0, 0, 214, 158, 1, 0, 0, 0, 214, 161, 1, 0, 0, 0, 214, 164,
    1, 0, 0, 0, 214, 170, 1, 0, 0, 0, 214, 175, 1, 0, 0, 0, 214, 182, 1, 0, 0, 0, 214, 192, 1, 0, 0, 0, 214, 200, 1, 0,
    0, 0, 214, 206, 1, 0, 0, 0, 214, 211, 1, 0, 0, 0, 215, 218, 1, 0, 0, 0, 216, 214, 1, 0, 0, 0, 216, 217, 1, 0, 0, 0,
    217, 7, 1, 0, 0, 0, 218, 216, 1, 0, 0, 0, 219, 224, 3, 6, 3, 0, 220, 221, 5, 7, 0, 0, 221, 223, 3, 6, 3, 0, 222,
    220, 1, 0, 0, 0, 223, 226, 1, 0, 0, 0, 224, 222, 1, 0, 0, 0, 224, 225, 1, 0, 0, 0, 225, 9, 1, 0, 0, 0, 226, 224, 1,
    0, 0, 0, 227, 228, 3, 12, 6, 0, 228, 229, 5, 36, 0, 0, 229, 230, 3, 6, 3, 0, 230, 11, 1, 0, 0, 0, 231, 232, 7, 5, 0,
    0, 232, 13, 1, 0, 0, 0, 25, 16, 21, 25, 30, 35, 39, 46, 51, 59, 62, 66, 71, 87, 90, 120, 123, 132, 135, 138, 188,
    197, 203, 214, 216, 224,
];

const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map((ds, index) => new antlr4.dfa.DFA(ds, index));

const sharedContextCache = new antlr4.PredictionContextCache();

export default class LogicBindDSLParser extends antlr4.Parser {
    static grammarFileName = "java-escape";
    static literalNames = [
        null,
        "';'",
        "'{'",
        "'}'",
        "'else'",
        "'return'",
        "'('",
        "','",
        "')'",
        "'=>'",
        "'['",
        "']'",
        "'.'",
        "'-'",
        "'**'",
        "'*'",
        "'/'",
        "'%'",
        "'+'",
        "'>'",
        "'>='",
        "'<'",
        "'<='",
        "'=='",
        "'!='",
        "'==='",
        "'!=='",
        "'&'",
        "'^'",
        "'|'",
        "'!'",
        "'&&'",
        "'||'",
        "'if'",
        "'while'",
        "'?'",
        "':'",
        "'let'",
        "'='",
        "'true'",
        "'false'",
        "'null'",
        "'undefined'",
    ];
    static symbolicNames = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "ID",
        "NUMBER",
        "STRING",
        "WS",
        "COMMENT",
        "LINE_COMMENT",
    ];
    static ruleNames = ["program", "blockStat", "elsePart", "expr", "exprList", "propertyAssignment", "propertyName"];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = LogicBindDSLParser.ruleNames;
        this.literalNames = LogicBindDSLParser.literalNames;
        this.symbolicNames = LogicBindDSLParser.symbolicNames;
    }

    get atn() {
        return atn;
    }

    sempred(localctx, ruleIndex, predIndex) {
        switch (ruleIndex) {
            case 3:
                return this.expr_sempred(localctx, predIndex);
            default:
                throw "No predicate with index:" + ruleIndex;
        }
    }

    expr_sempred(localctx, predIndex) {
        switch (predIndex) {
            case 0:
                return this.precpred(this._ctx, 26);
            case 1:
                return this.precpred(this._ctx, 25);
            case 2:
                return this.precpred(this._ctx, 24);
            case 3:
                return this.precpred(this._ctx, 23);
            case 4:
                return this.precpred(this._ctx, 22);
            case 5:
                return this.precpred(this._ctx, 21);
            case 6:
                return this.precpred(this._ctx, 19);
            case 7:
                return this.precpred(this._ctx, 18);
            case 8:
                return this.precpred(this._ctx, 15);
            case 9:
                return this.precpred(this._ctx, 11);
            case 10:
                return this.precpred(this._ctx, 10);
            case 11:
                return this.precpred(this._ctx, 32);
            case 12:
                return this.precpred(this._ctx, 31);
            case 13:
                return this.precpred(this._ctx, 30);
            case 14:
                return this.precpred(this._ctx, 29);
            case 15:
                return this.precpred(this._ctx, 28);
            default:
                throw "No predicate with index:" + predIndex;
        }
    }

    program() {
        let localctx = new ProgramContext(this, this._ctx, this.state);
        this.enterRule(localctx, 0, LogicBindDSLParser.RULE_program);
        var _la = 0; // Token type
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 14;
            this.expr(0);
            this.state = 21;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
            while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if (_alt === 1) {
                    this.state = 16;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if (_la === 1) {
                        this.state = 15;
                        this.match(LogicBindDSLParser.T__0);
                    }

                    this.state = 18;
                    this.expr(0);
                }
                this.state = 23;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
            }

            this.state = 25;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 1) {
                this.state = 24;
                this.match(LogicBindDSLParser.T__0);
            }
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    blockStat() {
        let localctx = new BlockStatContext(this, this._ctx, this.state);
        this.enterRule(localctx, 2, LogicBindDSLParser.RULE_blockStat);
        var _la = 0; // Token type
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 27;
            this.match(LogicBindDSLParser.T__1);
            this.state = 28;
            this.expr(0);
            this.state = 35;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
            while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if (_alt === 1) {
                    this.state = 30;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if (_la === 1) {
                        this.state = 29;
                        this.match(LogicBindDSLParser.T__0);
                    }

                    this.state = 32;
                    this.expr(0);
                }
                this.state = 37;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
            }

            this.state = 39;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 1) {
                this.state = 38;
                this.match(LogicBindDSLParser.T__0);
            }

            this.state = 41;
            this.match(LogicBindDSLParser.T__2);
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    elsePart() {
        let localctx = new ElsePartContext(this, this._ctx, this.state);
        this.enterRule(localctx, 4, LogicBindDSLParser.RULE_elsePart);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 43;
            this.match(LogicBindDSLParser.T__3);
            this.state = 46;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input, 6, this._ctx);
            switch (la_) {
                case 1:
                    this.state = 44;
                    this.blockStat();
                    break;

                case 2:
                    this.state = 45;
                    this.expr(0);
                    break;
            }
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    expr(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        const _parentctx = this._ctx;
        const _parentState = this.state;
        let localctx = new ExprContext(this, this._ctx, _parentState);
        let _prevctx = localctx;
        const _startState = 6;
        this.enterRecursionRule(localctx, 6, LogicBindDSLParser.RULE_expr, _p);
        var _la = 0; // Token type
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 138;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input, 18, this._ctx);
            switch (la_) {
                case 1:
                    localctx = new ReturnStatContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;

                    this.state = 49;
                    this.match(LogicBindDSLParser.T__4);
                    this.state = 51;
                    this._errHandler.sync(this);
                    var la_ = this._interp.adaptivePredict(this._input, 7, this._ctx);
                    if (la_ === 1) {
                        this.state = 50;
                        this.expr(0);
                    }
                    break;

                case 2:
                    localctx = new ArrowFunctionContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;
                    this.state = 66;
                    this._errHandler.sync(this);
                    switch (this._input.LA(1)) {
                        case 6:
                            this.state = 53;
                            this.match(LogicBindDSLParser.T__5);
                            this.state = 62;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === 43) {
                                this.state = 54;
                                this.match(LogicBindDSLParser.ID);
                                this.state = 59;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                                while (_la === 7) {
                                    this.state = 55;
                                    this.match(LogicBindDSLParser.T__6);
                                    this.state = 56;
                                    this.match(LogicBindDSLParser.ID);
                                    this.state = 61;
                                    this._errHandler.sync(this);
                                    _la = this._input.LA(1);
                                }
                            }

                            this.state = 64;
                            this.match(LogicBindDSLParser.T__7);
                            break;
                        case 43:
                            this.state = 65;
                            this.match(LogicBindDSLParser.ID);
                            break;
                        default:
                            throw new antlr4.error.NoViableAltException(this);
                    }
                    this.state = 68;
                    this.match(LogicBindDSLParser.T__8);
                    this.state = 71;
                    this._errHandler.sync(this);
                    var la_ = this._interp.adaptivePredict(this._input, 11, this._ctx);
                    switch (la_) {
                        case 1:
                            this.state = 69;
                            this.blockStat();
                            break;

                        case 2:
                            this.state = 70;
                            this.expr(0);
                            break;
                    }
                    break;

                case 3:
                    localctx = new ParenthesesExprContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;
                    this.state = 73;
                    this.match(LogicBindDSLParser.T__5);
                    this.state = 74;
                    this.expr(0);
                    this.state = 75;
                    this.match(LogicBindDSLParser.T__7);
                    break;

                case 4:
                    localctx = new UnaryNegativeContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;
                    this.state = 77;
                    this.match(LogicBindDSLParser.T__12);
                    this.state = 78;
                    this.expr(27);
                    break;

                case 5:
                    localctx = new BooleanNotContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;
                    this.state = 79;
                    this.match(LogicBindDSLParser.T__29);
                    this.state = 80;
                    this.expr(20);
                    break;

                case 6:
                    localctx = new IfExprContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;
                    this.state = 81;
                    this.match(LogicBindDSLParser.T__32);
                    this.state = 82;
                    this.match(LogicBindDSLParser.T__5);
                    this.state = 83;
                    this.expr(0);
                    this.state = 84;
                    this.match(LogicBindDSLParser.T__7);
                    this.state = 87;
                    this._errHandler.sync(this);
                    var la_ = this._interp.adaptivePredict(this._input, 12, this._ctx);
                    switch (la_) {
                        case 1:
                            this.state = 85;
                            this.blockStat();
                            break;

                        case 2:
                            this.state = 86;
                            this.expr(0);
                            break;
                    }
                    this.state = 90;
                    this._errHandler.sync(this);
                    var la_ = this._interp.adaptivePredict(this._input, 13, this._ctx);
                    if (la_ === 1) {
                        this.state = 89;
                        this.elsePart();
                    }
                    break;

                case 7:
                    localctx = new WhileExprContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;
                    this.state = 92;
                    this.match(LogicBindDSLParser.T__33);
                    this.state = 93;
                    this.match(LogicBindDSLParser.T__5);
                    this.state = 94;
                    this.expr(0);
                    this.state = 95;
                    this.match(LogicBindDSLParser.T__7);
                    this.state = 96;
                    this.blockStat();
                    break;

                case 8:
                    localctx = new VariableDeclareContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;
                    this.state = 98;
                    this.match(LogicBindDSLParser.T__36);
                    this.state = 99;
                    this.match(LogicBindDSLParser.ID);
                    break;

                case 9:
                    localctx = new VariableDeclareAndAssignContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;
                    this.state = 100;
                    this.match(LogicBindDSLParser.T__36);
                    this.state = 101;
                    this.match(LogicBindDSLParser.ID);
                    this.state = 102;
                    this.match(LogicBindDSLParser.T__37);
                    this.state = 103;
                    this.expr(13);
                    break;

                case 10:
                    localctx = new VariableAssignContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;
                    this.state = 104;
                    this.match(LogicBindDSLParser.ID);
                    this.state = 105;
                    this.match(LogicBindDSLParser.T__37);
                    this.state = 106;
                    this.expr(12);
                    break;

                case 11:
                    localctx = new TrueLiteralContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;
                    this.state = 107;
                    this.match(LogicBindDSLParser.T__38);
                    break;

                case 12:
                    localctx = new FalseLiteralContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;
                    this.state = 108;
                    this.match(LogicBindDSLParser.T__39);
                    break;

                case 13:
                    localctx = new NullLiteralContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;
                    this.state = 109;
                    this.match(LogicBindDSLParser.T__40);
                    break;

                case 14:
                    localctx = new UndefinedContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;
                    this.state = 110;
                    this.match(LogicBindDSLParser.T__41);
                    break;

                case 15:
                    localctx = new IdentifierContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;
                    this.state = 111;
                    this.match(LogicBindDSLParser.ID);
                    break;

                case 16:
                    localctx = new StringLiteralContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;
                    this.state = 112;
                    this.match(LogicBindDSLParser.STRING);
                    break;

                case 17:
                    localctx = new NumberLiteralContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;
                    this.state = 113;
                    this.match(LogicBindDSLParser.NUMBER);
                    break;

                case 18:
                    localctx = new ArrayLiteralContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;
                    this.state = 114;
                    this.match(LogicBindDSLParser.T__9);
                    this.state = 123;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if (
                        ((_la & ~0x1f) == 0 && ((1 << _la) & 1073751140) !== 0) ||
                        (((_la - 33) & ~0x1f) == 0 && ((1 << (_la - 33)) & 8147) !== 0)
                    ) {
                        this.state = 115;
                        this.expr(0);
                        this.state = 120;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === 7) {
                            this.state = 116;
                            this.match(LogicBindDSLParser.T__6);
                            this.state = 117;
                            this.expr(0);
                            this.state = 122;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                    }

                    this.state = 125;
                    this.match(LogicBindDSLParser.T__10);
                    break;

                case 19:
                    localctx = new ObjectLiteralContext(this, localctx);
                    this._ctx = localctx;
                    _prevctx = localctx;
                    this.state = 126;
                    this.match(LogicBindDSLParser.T__1);
                    this.state = 135;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if (((_la - 43) & ~0x1f) == 0 && ((1 << (_la - 43)) & 7) !== 0) {
                        this.state = 127;
                        this.propertyAssignment();
                        this.state = 132;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === 7) {
                            this.state = 128;
                            this.match(LogicBindDSLParser.T__6);
                            this.state = 129;
                            this.propertyAssignment();
                            this.state = 134;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                    }

                    this.state = 137;
                    this.match(LogicBindDSLParser.T__2);
                    break;
            }
            this._ctx.stop = this._input.LT(-1);
            this.state = 216;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input, 23, this._ctx);
            while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if (_alt === 1) {
                    if (this._parseListeners !== null) {
                        this.triggerExitRuleEvent();
                    }
                    _prevctx = localctx;
                    this.state = 214;
                    this._errHandler.sync(this);
                    var la_ = this._interp.adaptivePredict(this._input, 22, this._ctx);
                    switch (la_) {
                        case 1:
                            localctx = new PowerContext(this, new ExprContext(this, _parentctx, _parentState));
                            this.pushNewRecursionContext(localctx, _startState, LogicBindDSLParser.RULE_expr);
                            this.state = 140;
                            if (!this.precpred(this._ctx, 26)) {
                                throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 26)");
                            }
                            this.state = 141;
                            this.match(LogicBindDSLParser.T__13);
                            this.state = 142;
                            this.expr(27);
                            break;

                        case 2:
                            localctx = new MulDivContext(this, new ExprContext(this, _parentctx, _parentState));
                            this.pushNewRecursionContext(localctx, _startState, LogicBindDSLParser.RULE_expr);
                            this.state = 143;
                            if (!this.precpred(this._ctx, 25)) {
                                throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 25)");
                            }
                            this.state = 144;
                            _la = this._input.LA(1);
                            if (!((_la & ~0x1f) == 0 && ((1 << _la) & 229376) !== 0)) {
                                this._errHandler.recoverInline(this);
                            } else {
                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 145;
                            this.expr(26);
                            break;

                        case 3:
                            localctx = new AddSubContext(this, new ExprContext(this, _parentctx, _parentState));
                            this.pushNewRecursionContext(localctx, _startState, LogicBindDSLParser.RULE_expr);
                            this.state = 146;
                            if (!this.precpred(this._ctx, 24)) {
                                throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 24)");
                            }
                            this.state = 147;
                            _la = this._input.LA(1);
                            if (!(_la === 13 || _la === 18)) {
                                this._errHandler.recoverInline(this);
                            } else {
                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 148;
                            this.expr(25);
                            break;

                        case 4:
                            localctx = new CompareContext(this, new ExprContext(this, _parentctx, _parentState));
                            this.pushNewRecursionContext(localctx, _startState, LogicBindDSLParser.RULE_expr);
                            this.state = 149;
                            if (!this.precpred(this._ctx, 23)) {
                                throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 23)");
                            }
                            this.state = 150;
                            _la = this._input.LA(1);
                            if (!((_la & ~0x1f) == 0 && ((1 << _la) & 7864320) !== 0)) {
                                this._errHandler.recoverInline(this);
                            } else {
                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 151;
                            this.expr(24);
                            break;

                        case 5:
                            localctx = new EqualContext(this, new ExprContext(this, _parentctx, _parentState));
                            this.pushNewRecursionContext(localctx, _startState, LogicBindDSLParser.RULE_expr);
                            this.state = 152;
                            if (!this.precpred(this._ctx, 22)) {
                                throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 22)");
                            }
                            this.state = 153;
                            _la = this._input.LA(1);
                            if (!((_la & ~0x1f) == 0 && ((1 << _la) & 125829120) !== 0)) {
                                this._errHandler.recoverInline(this);
                            } else {
                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 154;
                            this.expr(23);
                            break;

                        case 6:
                            localctx = new BitwiseLogicContext(this, new ExprContext(this, _parentctx, _parentState));
                            this.pushNewRecursionContext(localctx, _startState, LogicBindDSLParser.RULE_expr);
                            this.state = 155;
                            if (!this.precpred(this._ctx, 21)) {
                                throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 21)");
                            }
                            this.state = 156;
                            _la = this._input.LA(1);
                            if (!((_la & ~0x1f) == 0 && ((1 << _la) & 939524096) !== 0)) {
                                this._errHandler.recoverInline(this);
                            } else {
                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 157;
                            this.expr(22);
                            break;

                        case 7:
                            localctx = new BooleanOrContext(this, new ExprContext(this, _parentctx, _parentState));
                            this.pushNewRecursionContext(localctx, _startState, LogicBindDSLParser.RULE_expr);
                            this.state = 158;
                            if (!this.precpred(this._ctx, 19)) {
                                throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 19)");
                            }
                            this.state = 159;
                            this.match(LogicBindDSLParser.T__30);
                            this.state = 160;
                            this.expr(20);
                            break;

                        case 8:
                            localctx = new BooleanAndContext(this, new ExprContext(this, _parentctx, _parentState));
                            this.pushNewRecursionContext(localctx, _startState, LogicBindDSLParser.RULE_expr);
                            this.state = 161;
                            if (!this.precpred(this._ctx, 18)) {
                                throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 18)");
                            }
                            this.state = 162;
                            this.match(LogicBindDSLParser.T__31);
                            this.state = 163;
                            this.expr(19);
                            break;

                        case 9:
                            localctx = new TernaryExprContext(this, new ExprContext(this, _parentctx, _parentState));
                            this.pushNewRecursionContext(localctx, _startState, LogicBindDSLParser.RULE_expr);
                            this.state = 164;
                            if (!this.precpred(this._ctx, 15)) {
                                throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 15)");
                            }
                            this.state = 165;
                            this.match(LogicBindDSLParser.T__34);
                            this.state = 166;
                            this.expr(0);
                            this.state = 167;
                            this.match(LogicBindDSLParser.T__35);
                            this.state = 168;
                            this.expr(16);
                            break;

                        case 10:
                            localctx = new PropertyAssignContext(this, new ExprContext(this, _parentctx, _parentState));
                            this.pushNewRecursionContext(localctx, _startState, LogicBindDSLParser.RULE_expr);
                            this.state = 170;
                            if (!this.precpred(this._ctx, 11)) {
                                throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 11)");
                            }
                            this.state = 171;
                            this.match(LogicBindDSLParser.T__11);
                            this.state = 172;
                            this.match(LogicBindDSLParser.ID);
                            this.state = 173;
                            this.match(LogicBindDSLParser.T__37);
                            this.state = 174;
                            this.expr(12);
                            break;

                        case 11:
                            localctx = new SquareBracketPropertyAssignContext(
                                this,
                                new ExprContext(this, _parentctx, _parentState)
                            );
                            this.pushNewRecursionContext(localctx, _startState, LogicBindDSLParser.RULE_expr);
                            this.state = 175;
                            if (!this.precpred(this._ctx, 10)) {
                                throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
                            }
                            this.state = 176;
                            this.match(LogicBindDSLParser.T__9);
                            this.state = 177;
                            this.expr(0);
                            this.state = 178;
                            this.match(LogicBindDSLParser.T__10);
                            this.state = 179;
                            this.match(LogicBindDSLParser.T__37);
                            this.state = 180;
                            this.expr(11);
                            break;

                        case 12:
                            localctx = new SquareBracketsMethodCallContext(
                                this,
                                new ExprContext(this, _parentctx, _parentState)
                            );
                            this.pushNewRecursionContext(localctx, _startState, LogicBindDSLParser.RULE_expr);
                            this.state = 182;
                            if (!this.precpred(this._ctx, 32)) {
                                throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 32)");
                            }
                            this.state = 183;
                            this.match(LogicBindDSLParser.T__9);
                            this.state = 184;
                            this.expr(0);
                            this.state = 185;
                            this.match(LogicBindDSLParser.T__10);
                            this.state = 186;
                            this.match(LogicBindDSLParser.T__5);
                            this.state = 188;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (
                                ((_la & ~0x1f) == 0 && ((1 << _la) & 1073751140) !== 0) ||
                                (((_la - 33) & ~0x1f) == 0 && ((1 << (_la - 33)) & 8147) !== 0)
                            ) {
                                this.state = 187;
                                this.exprList();
                            }

                            this.state = 190;
                            this.match(LogicBindDSLParser.T__7);
                            break;

                        case 13:
                            localctx = new MethodCallContext(this, new ExprContext(this, _parentctx, _parentState));
                            this.pushNewRecursionContext(localctx, _startState, LogicBindDSLParser.RULE_expr);
                            this.state = 192;
                            if (!this.precpred(this._ctx, 31)) {
                                throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 31)");
                            }
                            this.state = 193;
                            this.match(LogicBindDSLParser.T__11);
                            this.state = 194;
                            this.match(LogicBindDSLParser.ID);
                            this.state = 195;
                            this.match(LogicBindDSLParser.T__5);
                            this.state = 197;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (
                                ((_la & ~0x1f) == 0 && ((1 << _la) & 1073751140) !== 0) ||
                                (((_la - 33) & ~0x1f) == 0 && ((1 << (_la - 33)) & 8147) !== 0)
                            ) {
                                this.state = 196;
                                this.exprList();
                            }

                            this.state = 199;
                            this.match(LogicBindDSLParser.T__7);
                            break;

                        case 14:
                            localctx = new FunctionCallContext(this, new ExprContext(this, _parentctx, _parentState));
                            this.pushNewRecursionContext(localctx, _startState, LogicBindDSLParser.RULE_expr);
                            this.state = 200;
                            if (!this.precpred(this._ctx, 30)) {
                                throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 30)");
                            }
                            this.state = 201;
                            this.match(LogicBindDSLParser.T__5);
                            this.state = 203;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (
                                ((_la & ~0x1f) == 0 && ((1 << _la) & 1073751140) !== 0) ||
                                (((_la - 33) & ~0x1f) == 0 && ((1 << (_la - 33)) & 8147) !== 0)
                            ) {
                                this.state = 202;
                                this.exprList();
                            }

                            this.state = 205;
                            this.match(LogicBindDSLParser.T__7);
                            break;

                        case 15:
                            localctx = new SquareBracketsAttributeContext(
                                this,
                                new ExprContext(this, _parentctx, _parentState)
                            );
                            this.pushNewRecursionContext(localctx, _startState, LogicBindDSLParser.RULE_expr);
                            this.state = 206;
                            if (!this.precpred(this._ctx, 29)) {
                                throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 29)");
                            }
                            this.state = 207;
                            this.match(LogicBindDSLParser.T__9);
                            this.state = 208;
                            this.expr(0);
                            this.state = 209;
                            this.match(LogicBindDSLParser.T__10);
                            break;

                        case 16:
                            localctx = new DotAttributeContext(this, new ExprContext(this, _parentctx, _parentState));
                            this.pushNewRecursionContext(localctx, _startState, LogicBindDSLParser.RULE_expr);
                            this.state = 211;
                            if (!this.precpred(this._ctx, 28)) {
                                throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 28)");
                            }
                            this.state = 212;
                            this.match(LogicBindDSLParser.T__11);
                            this.state = 213;
                            this.match(LogicBindDSLParser.ID);
                            break;
                    }
                }
                this.state = 218;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 23, this._ctx);
            }
        } catch (error) {
            if (error instanceof antlr4.error.RecognitionException) {
                localctx.exception = error;
                this._errHandler.reportError(this, error);
                this._errHandler.recover(this, error);
            } else {
                throw error;
            }
        } finally {
            this.unrollRecursionContexts(_parentctx);
        }
        return localctx;
    }

    exprList() {
        let localctx = new ExprListContext(this, this._ctx, this.state);
        this.enterRule(localctx, 8, LogicBindDSLParser.RULE_exprList);
        var _la = 0; // Token type
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 219;
            this.expr(0);
            this.state = 224;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === 7) {
                this.state = 220;
                this.match(LogicBindDSLParser.T__6);
                this.state = 221;
                this.expr(0);
                this.state = 226;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    propertyAssignment() {
        let localctx = new PropertyAssignmentContext(this, this._ctx, this.state);
        this.enterRule(localctx, 10, LogicBindDSLParser.RULE_propertyAssignment);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 227;
            this.propertyName();
            this.state = 228;
            this.match(LogicBindDSLParser.T__35);
            this.state = 229;
            this.expr(0);
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    propertyName() {
        let localctx = new PropertyNameContext(this, this._ctx, this.state);
        this.enterRule(localctx, 12, LogicBindDSLParser.RULE_propertyName);
        var _la = 0; // Token type
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 231;
            _la = this._input.LA(1);
            if (!(((_la - 43) & ~0x1f) == 0 && ((1 << (_la - 43)) & 7) !== 0)) {
                this._errHandler.recoverInline(this);
            } else {
                this._errHandler.reportMatch(this);
                this.consume();
            }
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }
}

LogicBindDSLParser.EOF = antlr4.Token.EOF;
LogicBindDSLParser.T__0 = 1;
LogicBindDSLParser.T__1 = 2;
LogicBindDSLParser.T__2 = 3;
LogicBindDSLParser.T__3 = 4;
LogicBindDSLParser.T__4 = 5;
LogicBindDSLParser.T__5 = 6;
LogicBindDSLParser.T__6 = 7;
LogicBindDSLParser.T__7 = 8;
LogicBindDSLParser.T__8 = 9;
LogicBindDSLParser.T__9 = 10;
LogicBindDSLParser.T__10 = 11;
LogicBindDSLParser.T__11 = 12;
LogicBindDSLParser.T__12 = 13;
LogicBindDSLParser.T__13 = 14;
LogicBindDSLParser.T__14 = 15;
LogicBindDSLParser.T__15 = 16;
LogicBindDSLParser.T__16 = 17;
LogicBindDSLParser.T__17 = 18;
LogicBindDSLParser.T__18 = 19;
LogicBindDSLParser.T__19 = 20;
LogicBindDSLParser.T__20 = 21;
LogicBindDSLParser.T__21 = 22;
LogicBindDSLParser.T__22 = 23;
LogicBindDSLParser.T__23 = 24;
LogicBindDSLParser.T__24 = 25;
LogicBindDSLParser.T__25 = 26;
LogicBindDSLParser.T__26 = 27;
LogicBindDSLParser.T__27 = 28;
LogicBindDSLParser.T__28 = 29;
LogicBindDSLParser.T__29 = 30;
LogicBindDSLParser.T__30 = 31;
LogicBindDSLParser.T__31 = 32;
LogicBindDSLParser.T__32 = 33;
LogicBindDSLParser.T__33 = 34;
LogicBindDSLParser.T__34 = 35;
LogicBindDSLParser.T__35 = 36;
LogicBindDSLParser.T__36 = 37;
LogicBindDSLParser.T__37 = 38;
LogicBindDSLParser.T__38 = 39;
LogicBindDSLParser.T__39 = 40;
LogicBindDSLParser.T__40 = 41;
LogicBindDSLParser.T__41 = 42;
LogicBindDSLParser.ID = 43;
LogicBindDSLParser.NUMBER = 44;
LogicBindDSLParser.STRING = 45;
LogicBindDSLParser.WS = 46;
LogicBindDSLParser.COMMENT = 47;
LogicBindDSLParser.LINE_COMMENT = 48;

LogicBindDSLParser.RULE_program = 0;
LogicBindDSLParser.RULE_blockStat = 1;
LogicBindDSLParser.RULE_elsePart = 2;
LogicBindDSLParser.RULE_expr = 3;
LogicBindDSLParser.RULE_exprList = 4;
LogicBindDSLParser.RULE_propertyAssignment = 5;
LogicBindDSLParser.RULE_propertyName = 6;

class ProgramContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicBindDSLParser.RULE_program;
    }

    expr = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(ExprContext);
        } else {
            return this.getTypedRuleContext(ExprContext, i);
        }
    };

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitProgram(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

class BlockStatContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicBindDSLParser.RULE_blockStat;
    }

    expr = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(ExprContext);
        } else {
            return this.getTypedRuleContext(ExprContext, i);
        }
    };

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitBlockStat(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

class ElsePartContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicBindDSLParser.RULE_elsePart;
    }

    blockStat() {
        return this.getTypedRuleContext(BlockStatContext, 0);
    }

    expr() {
        return this.getTypedRuleContext(ExprContext, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitElsePart(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

class ExprContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicBindDSLParser.RULE_expr;
    }

    copyFrom(ctx) {
        super.copyFrom(ctx);
    }
}

class CompareContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(ExprContext);
        } else {
            return this.getTypedRuleContext(ExprContext, i);
        }
    };

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitCompare(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.CompareContext = CompareContext;

class SquareBracketPropertyAssignContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(ExprContext);
        } else {
            return this.getTypedRuleContext(ExprContext, i);
        }
    };

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitSquareBracketPropertyAssign(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.SquareBracketPropertyAssignContext = SquareBracketPropertyAssignContext;

class BitwiseLogicContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(ExprContext);
        } else {
            return this.getTypedRuleContext(ExprContext, i);
        }
    };

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitBitwiseLogic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.BitwiseLogicContext = BitwiseLogicContext;

class ArrayLiteralContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(ExprContext);
        } else {
            return this.getTypedRuleContext(ExprContext, i);
        }
    };

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitArrayLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.ArrayLiteralContext = ArrayLiteralContext;

class TrueLiteralContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitTrueLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.TrueLiteralContext = TrueLiteralContext;

class ParenthesesExprContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr() {
        return this.getTypedRuleContext(ExprContext, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitParenthesesExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.ParenthesesExprContext = ParenthesesExprContext;

class VariableDeclareContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    ID() {
        return this.getToken(LogicBindDSLParser.ID, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitVariableDeclare(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.VariableDeclareContext = VariableDeclareContext;

class MulDivContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(ExprContext);
        } else {
            return this.getTypedRuleContext(ExprContext, i);
        }
    };

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitMulDiv(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.MulDivContext = MulDivContext;

class UndefinedContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitUndefined(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.UndefinedContext = UndefinedContext;

class VariableDeclareAndAssignContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    ID() {
        return this.getToken(LogicBindDSLParser.ID, 0);
    }

    expr() {
        return this.getTypedRuleContext(ExprContext, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitVariableDeclareAndAssign(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.VariableDeclareAndAssignContext = VariableDeclareAndAssignContext;

class VariableAssignContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    ID() {
        return this.getToken(LogicBindDSLParser.ID, 0);
    }

    expr() {
        return this.getTypedRuleContext(ExprContext, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitVariableAssign(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.VariableAssignContext = VariableAssignContext;

class FalseLiteralContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitFalseLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.FalseLiteralContext = FalseLiteralContext;

class TernaryExprContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(ExprContext);
        } else {
            return this.getTypedRuleContext(ExprContext, i);
        }
    };

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitTernaryExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.TernaryExprContext = TernaryExprContext;

class ReturnStatContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr() {
        return this.getTypedRuleContext(ExprContext, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitReturnStat(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.ReturnStatContext = ReturnStatContext;

class IfExprContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(ExprContext);
        } else {
            return this.getTypedRuleContext(ExprContext, i);
        }
    };

    blockStat() {
        return this.getTypedRuleContext(BlockStatContext, 0);
    }

    elsePart() {
        return this.getTypedRuleContext(ElsePartContext, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitIfExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.IfExprContext = IfExprContext;

class BooleanOrContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(ExprContext);
        } else {
            return this.getTypedRuleContext(ExprContext, i);
        }
    };

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitBooleanOr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.BooleanOrContext = BooleanOrContext;

class PowerContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(ExprContext);
        } else {
            return this.getTypedRuleContext(ExprContext, i);
        }
    };

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitPower(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.PowerContext = PowerContext;

class PropertyAssignContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(ExprContext);
        } else {
            return this.getTypedRuleContext(ExprContext, i);
        }
    };

    ID() {
        return this.getToken(LogicBindDSLParser.ID, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitPropertyAssign(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.PropertyAssignContext = PropertyAssignContext;

class DotAttributeContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr() {
        return this.getTypedRuleContext(ExprContext, 0);
    }

    ID() {
        return this.getToken(LogicBindDSLParser.ID, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitDotAttribute(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.DotAttributeContext = DotAttributeContext;

class SquareBracketsMethodCallContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(ExprContext);
        } else {
            return this.getTypedRuleContext(ExprContext, i);
        }
    };

    exprList() {
        return this.getTypedRuleContext(ExprListContext, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitSquareBracketsMethodCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.SquareBracketsMethodCallContext = SquareBracketsMethodCallContext;

class IdentifierContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    ID() {
        return this.getToken(LogicBindDSLParser.ID, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitIdentifier(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.IdentifierContext = IdentifierContext;

class NullLiteralContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitNullLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.NullLiteralContext = NullLiteralContext;

class ObjectLiteralContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    propertyAssignment = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(PropertyAssignmentContext);
        } else {
            return this.getTypedRuleContext(PropertyAssignmentContext, i);
        }
    };

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitObjectLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.ObjectLiteralContext = ObjectLiteralContext;

class SquareBracketsAttributeContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(ExprContext);
        } else {
            return this.getTypedRuleContext(ExprContext, i);
        }
    };

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitSquareBracketsAttribute(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.SquareBracketsAttributeContext = SquareBracketsAttributeContext;

class UnaryNegativeContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr() {
        return this.getTypedRuleContext(ExprContext, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitUnaryNegative(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.UnaryNegativeContext = UnaryNegativeContext;

class AddSubContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(ExprContext);
        } else {
            return this.getTypedRuleContext(ExprContext, i);
        }
    };

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitAddSub(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.AddSubContext = AddSubContext;

class ArrowFunctionContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    ID = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTokens(LogicBindDSLParser.ID);
        } else {
            return this.getToken(LogicBindDSLParser.ID, i);
        }
    };

    blockStat() {
        return this.getTypedRuleContext(BlockStatContext, 0);
    }

    expr() {
        return this.getTypedRuleContext(ExprContext, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitArrowFunction(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.ArrowFunctionContext = ArrowFunctionContext;

class EqualContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(ExprContext);
        } else {
            return this.getTypedRuleContext(ExprContext, i);
        }
    };

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitEqual(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.EqualContext = EqualContext;

class WhileExprContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr() {
        return this.getTypedRuleContext(ExprContext, 0);
    }

    blockStat() {
        return this.getTypedRuleContext(BlockStatContext, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitWhileExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.WhileExprContext = WhileExprContext;

class StringLiteralContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    STRING() {
        return this.getToken(LogicBindDSLParser.STRING, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitStringLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.StringLiteralContext = StringLiteralContext;

class FunctionCallContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr() {
        return this.getTypedRuleContext(ExprContext, 0);
    }

    exprList() {
        return this.getTypedRuleContext(ExprListContext, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.FunctionCallContext = FunctionCallContext;

class BooleanNotContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr() {
        return this.getTypedRuleContext(ExprContext, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitBooleanNot(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.BooleanNotContext = BooleanNotContext;

class NumberLiteralContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    NUMBER() {
        return this.getToken(LogicBindDSLParser.NUMBER, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitNumberLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.NumberLiteralContext = NumberLiteralContext;

class BooleanAndContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(ExprContext);
        } else {
            return this.getTypedRuleContext(ExprContext, i);
        }
    };

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitBooleanAnd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.BooleanAndContext = BooleanAndContext;

class MethodCallContext extends ExprContext {
    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    expr() {
        return this.getTypedRuleContext(ExprContext, 0);
    }

    ID() {
        return this.getToken(LogicBindDSLParser.ID, 0);
    }

    exprList() {
        return this.getTypedRuleContext(ExprListContext, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitMethodCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.MethodCallContext = MethodCallContext;

class ExprListContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicBindDSLParser.RULE_exprList;
    }

    expr = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(ExprContext);
        } else {
            return this.getTypedRuleContext(ExprContext, i);
        }
    };

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitExprList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

class PropertyAssignmentContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicBindDSLParser.RULE_propertyAssignment;
    }

    propertyName() {
        return this.getTypedRuleContext(PropertyNameContext, 0);
    }

    expr() {
        return this.getTypedRuleContext(ExprContext, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitPropertyAssignment(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

class PropertyNameContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicBindDSLParser.RULE_propertyName;
    }

    ID() {
        return this.getToken(LogicBindDSLParser.ID, 0);
    }

    STRING() {
        return this.getToken(LogicBindDSLParser.STRING, 0);
    }

    NUMBER() {
        return this.getToken(LogicBindDSLParser.NUMBER, 0);
    }

    accept(visitor) {
        if (visitor instanceof LogicBindDSLVisitor) {
            return visitor.visitPropertyName(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

LogicBindDSLParser.ProgramContext = ProgramContext;
LogicBindDSLParser.BlockStatContext = BlockStatContext;
LogicBindDSLParser.ElsePartContext = ElsePartContext;
LogicBindDSLParser.ExprContext = ExprContext;
LogicBindDSLParser.ExprListContext = ExprListContext;
LogicBindDSLParser.PropertyAssignmentContext = PropertyAssignmentContext;
LogicBindDSLParser.PropertyNameContext = PropertyNameContext;
