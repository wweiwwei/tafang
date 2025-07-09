import LogicBindDSLVisitor from "./LogicBindDSLVisitor";
import { GameLogicDSLEnv } from "./GameLogicDSLEnv";

export default class GameLogicDSLVisitor extends LogicBindDSLVisitor {
    constructor(private env: GameLogicDSLEnv) {
        super();
    }

    // Visit a parse tree produced by LogicBindDSLParser#identifier.
    visitIdentifier(ctx: any) {
        return this.env.get(ctx.ID().getText());
    }

    // Visit a parse tree produced by LogicBindDSLParser#compare.
    visitCompare(ctx: any) {
        const v1 = ctx.expr(0).accept(this);
        const v2 = ctx.expr(1).accept(this);
        const op = ctx.getChild(1).getText();
        switch (op) {
            case ">":
                return v1 > v2;
            case ">=":
                return v1 >= v2;
            case "<":
                return v1 < v2;
            case "<=":
                return v1 <= v2;
        }
        throw new Error(`compare ${op} unknown error`);
    }

    // Visit a parse tree produced by LogicBindDSLParser#squareBracketsAttribute.
    visitSquareBracketsAttribute(ctx: any) {
        const v1 = ctx.expr(0).accept(this);
        const v2 = ctx.expr(1).accept(this);
        return v1[v2];
    }

    // Visit a parse tree produced by LogicBindDSLParser#numberExpr.
    visitNumberLiteral(ctx: any) {
        return Number(ctx.NUMBER().getText());
    }

    // Visit a parse tree produced by LogicBindDSLParser#unaryNegative.
    visitUnaryNegative(ctx: any) {
        return -ctx.expr().accept(this);
    }

    // Visit a parse tree produced by LogicBindDSLParser#addSub.
    visitAddSub(ctx: any) {
        const v1 = ctx.expr(0).accept(this);
        const v2 = ctx.expr(1).accept(this);
        const op = ctx.getChild(1).getText();
        switch (op) {
            case "+":
                return v1 + v2;
            case "-":
                return v1 - v2;
        }
        throw new Error(`addsub ${op} unknown error`);
    }

    // Visit a parse tree produced by LogicBindDSLParser#power.
    visitPower(ctx: any) {
        const v1 = ctx.expr(0).accept(this);
        const v2 = ctx.expr(1).accept(this);
        return v1 ** v2;
    }

    // Visit a parse tree produced by LogicBindDSLParser#parenthesesExpr.
    visitParenthesesExpr(ctx: any) {
        return ctx.expr().accept(this);
    }

    // Visit a parse tree produced by LogicBindDSLParser#mulDiv.
    visitMulDiv(ctx: any) {
        const v1 = ctx.expr(0).accept(this);
        const v2 = ctx.expr(1).accept(this);
        const op = ctx.getChild(1).getText();
        switch (op) {
            case "*":
                return v1 * v2;
            case "/":
                return v1 / v2;
            case "%":
                return v1 % v2;
        }
        throw new Error(`muldiv ${op} unknown error`);
    }

    // Visit a parse tree produced by LogicBindDSLParser#stringExpr.
    visitStringLiteral(ctx: any) {
        return ctx.STRING().getText().slice(1, -1);
    }

    // Visit a parse tree produced by LogicBindDSLParser#equal.
    visitEqual(ctx: any) {
        const v1 = ctx.expr(0).accept(this);
        const v2 = ctx.expr(1).accept(this);
        const op = ctx.getChild(1).getText();
        switch (op) {
            case "==":
                return v1 == v2;
            case "!=":
                return v1 != v2;
            case "===":
                return v1 === v2;
            case "!==":
                return v1 !== v2;
        }
        throw new Error(`equal ${op} unknown error`);
    }

    // Visit a parse tree produced by LogicBindDSLParser#functionCall.
    visitFunctionCall(ctx: any) {
        const f = ctx.expr().accept(this);
        if (!ctx.exprList()) {
            return f();
        } else {
            const list = ctx.exprList().accept(this);
            return f(...list);
        }
    }

    // Visit a parse tree produced by LogicBindDSLParser#booleanOr.
    visitBooleanOr(ctx: any) {
        return ctx.expr(0).accept(this) || ctx.expr(1).accept(this);
    }

    // Visit a parse tree produced by LogicBindDSLParser#booleanNot.
    visitBooleanNot(ctx: any) {
        return !ctx.expr();
    }

    // Visit a parse tree produced by LogicBindDSLParser#dotAttribute.
    visitDotAttribute(ctx: any) {
        return ctx.expr().accept(this)[ctx.ID().getText()] || 0;
    }

    // Visit a parse tree produced by LogicBindDSLParser#booleanAnd.
    visitBooleanAnd(ctx: any) {
        return ctx.expr(0).accept(this) && ctx.expr(1).accept(this);
    }

    // Visit a parse tree produced by LogicBindDSLParser#exprList.
    visitExprList(ctx: any) {
        return ctx.expr().map((e) => e.accept(this));
    }

    // Visit a parse tree produced by LogicBindDSLParser#arrayLiteral.
    visitArrayLiteral(ctx: any) {
        return ctx.expr().map((e) => e.accept(this));
    }

    // Visit a parse tree produced by LogicBindDSLParser#objectLiteral.
    visitObjectLiteral(ctx: any) {
        const list = ctx.propertyAssignment().map((e) => e.accept(this));
        const res = {};
        list.forEach((e) => (res[e[0]] = e[1]));
        return res;
    }

    // Visit a parse tree produced by LogicBindDSLParser#propertyAssignment.
    visitPropertyAssignment(ctx: any) {
        return [ctx.propertyName().accept(this), ctx.expr().accept(this)];
    }

    // Visit a parse tree produced by LogicBindDSLParser#propertyName.
    visitPropertyName(ctx: any) {
        const id = ctx.ID();
        if (id) {
            return id.getText();
        }
        const str = ctx.STRING();
        if (str) {
            return str.getText().slice(1, -1);
        }
        const num = ctx.NUMBER();
        if (num) {
            return Number(num.getText());
        }
    }

    // Visit a parse tree produced by LogicBindDSLParser#bitwiseLogic.
    visitBitwiseLogic(ctx) {
        const v1 = ctx.expr(0).accept(this);
        const v2 = ctx.expr(1).accept(this);
        const op = ctx.getChild(1).getText();
        switch (op) {
            case "&":
                return v1 & v2;
            case "^":
                return v1 ^ v2;
            case "|":
                return v1 | v2;
        }
        throw new Error(`bitwise ${op} unknown error`);
    }

    // Visit a parse tree produced by LogicBindDSLParser#squareBracketsMethodCall.
    visitSquareBracketsMethodCall(ctx) {
        const v1 = ctx.expr(0).accept(this);
        const v2 = ctx.expr(1).accept(this);
        if (!ctx.exprList()) {
            return v1[v2]();
        } else {
            const list = ctx.exprList().accept(this);
            return v1[v2](...list);
        }
    }

    // Visit a parse tree produced by LogicBindDSLParser#methodCall.
    visitMethodCall(ctx) {
        const v = ctx.expr().accept(this);
        const k = ctx.ID().getText();
        if (!ctx.exprList()) {
            return v[k]();
        } else {
            const list = ctx.exprList().accept(this);
            return v[k](...list);
        }
    }

    // Visit a parse tree produced by LogicBindDSLParser#variableDeclare.
    visitVariableDeclare(ctx) {
        return this.env.declare(ctx.ID().getText());
    }

    // Visit a parse tree produced by LogicBindDSLParser#variableDeclareAndAssign.
    visitVariableDeclareAndAssign(ctx) {
        this.env.declare(ctx.ID().getText());
        return this.env.assign(ctx.ID().getText(), ctx.expr().accept(this));
    }

    // Visit a parse tree produced by LogicBindDSLParser#variableAssign.
    visitVariableAssign(ctx) {
        return this.env.assign(ctx.ID().getText(), ctx.expr().accept(this));
    }

    // Visit a parse tree produced by LogicBindDSLParser#propertyAssign.
    visitPropertyAssign(ctx) {
        const v1 = ctx.expr(0).accept(this);
        const v2 = ctx.expr(1).accept(this);
        const propertyName = ctx.ID().getText();
        return (v1[propertyName] = v2);
    }

    // Visit a parse tree produced by LogicBindDSLParser#squareBracketPropertyAssign.
    visitSquareBracketPropertyAssign(ctx) {
        const v1 = ctx.expr(0).accept(this);
        const v2 = ctx.expr(1).accept(this);
        const v3 = ctx.expr(2).accept(this);
        return (v1[v2] = v3);
    }

    // Visit a parse tree produced by LogicBindDSLParser#returnStat.
    visitReturnStat(ctx) {
        const e = ctx.expr();
        if (e) {
            return { _returnValue: e.accept(this) };
        } else {
            return { _returnValue: undefined };
        }
    }

    // Visit a parse tree produced by LogicBindDSLParser#arrowFunction.
    visitArrowFunction(ctx) {
        return (...args) => {
            const argNameList = ctx.ID().map((id) => id.getText());
            this.env.pushStack();
            argNameList.forEach((n, i) => {
                this.env.declare(n);
                this.env.assign(n, args[i]);
            });
            let returnValue = undefined;
            if (ctx.blockStat()) {
                const stats = ctx.blockStat().accept(this);
                for (let i = 0; i < stats.length; i++) {
                    const res = stats[i].accept(this);
                    if (res instanceof Object && "_returnValue" in res) {
                        returnValue = res._returnValue;
                        break;
                    }
                }
            } else {
                returnValue = ctx.expr().accept(this);
            }
            this.env.popStack();
            return returnValue;
        };
    }

    // Visit a parse tree produced by LogicBindDSLParser#blockStat.
    visitBlockStat(ctx: any) {
        return ctx.expr();
    }

    // Visit a parse tree produced by LogicBindDSLParser#TernaryExpr.
    visitTernaryExpr(ctx: any) {
        return ctx.expr(0).accept(this) ? ctx.expr(1).accept(this) : ctx.expr(2).accept(this);
    }

    // Visit a parse tree produced by LogicBindDSLParser#program.
    visitProgram(ctx: any) {
        let curValue = undefined;
        ctx.expr().forEach((s) => (curValue = s.accept(this)));
        return curValue;
    }

    // Visit a parse tree produced by LogicBindDSLParser#trueLiteral.
    visitTrueLiteral(ctx) {
        return true;
    }

    // Visit a parse tree produced by LogicBindDSLParser#falseLiteral.
    visitFalseLiteral(ctx) {
        return false;
    }

    // Visit a parse tree produced by LogicBindDSLParser#nullLiteral.
    visitNullLiteral(ctx) {
        return null;
    }

    // Visit a parse tree produced by LogicBindDSLParser#undefined.
    visitUndefined(ctx) {
        return undefined;
    }

    // Visit a parse tree produced by LogicBindDSLParser#whileExpr.
    visitWhileExpr(ctx) {
        const conditionExpr = ctx.expr();
        const blockStat = ctx.blockStat().accept(this);
        while (conditionExpr.accept(this)) {
            blockStat.forEach((e) => e.accept(this));
        }
        return undefined;
    }

    // Visit a parse tree produced by LogicBindDSLParser#ifExpr.
    visitIfExpr(ctx) {
        const conditionExpr = ctx.expr(0);
        let returnValue = undefined;
        if (conditionExpr.accept(this)) {
            const blockStat = ctx.blockStat();
            if (blockStat) {
                blockStat.accept(this).forEach((e) => (returnValue = e.accept(this)));
            } else {
                returnValue = ctx.expr(1).accept(this);
            }
        } else {
            const elsePart = ctx.elsePart();
            if (elsePart) {
                const blockStat = elsePart.blockStat();
                if (blockStat) {
                    blockStat.accept(this).forEach((e) => (returnValue = e.accept(this)));
                } else {
                    returnValue = elsePart.expr().accept(this);
                }
            }
        }
        return returnValue;
    }

    // Visit a parse tree produced by LogicBindDSLParser#elsePart.
    visitElsePart(ctx) {
        return ctx.blockStat() || ctx.expr();
    }
}
