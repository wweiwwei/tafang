grammar LogicBindDSL;

program: expr (';' expr)* ';'?;

blockStat: '{' expr (';' expr)* ';'? '}';
elsePart: 'else' (blockStat | expr);

expr:
	'return' expr?												# returnStat // 返回
	| ('(' (ID (',' ID)*)? ')' | ID) '=>' (blockStat | expr)	# arrowFunction // 箭头函数
	| '(' expr ')'												# parenthesesExpr // 括号
	| expr '[' expr ']' '(' exprList? ')'						# squareBracketsMethodCall // 方法调用
	| expr '.' ID '(' exprList? ')'								# methodCall // 方法调用
	| expr '(' exprList? ')'									# functionCall // 函数调用
	| expr '[' expr ']'											# squareBracketsAttribute // 数组或者对象成员
	| expr '.' ID												# dotAttribute // 对象.属性名
	| '-' expr													# unaryNegative // 取负数
	| expr '**' expr											# power // 指数
	| expr ('*' | '/' | '%') expr								# mulDiv // 乘除
	| expr ('+' | '-') expr										# addSub // 加减
	| expr ('>' | '>=' | '<' | '<=') expr						# compare // 比较
	| expr ('==' | '!=' | '===' | '!==') expr					# equal // 相等
	| expr ('&' | '^' | '|') expr								# bitwiseLogic // 位运算
	| '!' expr													# booleanNot // 布尔否
	| expr '&&' expr											# booleanOr // 与
	| expr '||' expr											# booleanAnd // 或
	| 'if' '(' expr ')' (blockStat | expr) elsePart?			# ifExpr // if表达式
	| 'while' '(' expr ')' blockStat							# whileExpr // while表达式
	| expr '?' expr ':' expr									# ternaryExpr // 三元表达式
	| 'let' ID													# variableDeclare // 变量声明
	| 'let' ID '=' expr											# variableDeclareAndAssign // 声明并赋值
	| ID '=' expr												# variableAssign // 变量赋值
	| expr '.' ID '=' expr										# propertyAssign // 属性赋值
	| expr '[' expr ']' '=' expr								# squareBracketPropertyAssign // 属性赋值
	| 'true'													# trueLiteral // true
	| 'false'													# falseLiteral // false
	| 'null'													# nullLiteral // null
	| 'undefined'												# undefined // undefined
	| ID														# identifier // 标识符
	| STRING													# stringLiteral // 字符串字面量
	| NUMBER													# numberLiteral // 数字字面量
	| '[' (expr (',' expr)*)? ']'								# arrayLiteral // 数组字面量
	| '{' (propertyAssignment (',' propertyAssignment)*)? '}'	# objectLiteral; // 对象字面量

exprList: expr (',' expr)*;
// arg list

propertyAssignment: propertyName ':' expr;
propertyName: ID | STRING | NUMBER;

ID: LETTER (LETTER | [0-9])*;
fragment LETTER: [a-zA-Z];

NUMBER:
	INT '.' [0-9]+ EXP? // 1.35, 1.35E-9, 0.3, -4.5
	| INT EXP // 1e10 -3e4
	| INT;
// -3, 45
fragment INT: '0' | [1-9] [0-9]*;
// no leading zeros
fragment EXP: [Ee] [+\-]? INT;
// \- since - means "range" inside [...]

STRING: '"' (ESC | ~["\\])* '"';
fragment ESC: '\\' (["\\/bfnrt] | UNICODE);
fragment UNICODE: 'u' HEX HEX HEX HEX;
fragment HEX: [0-9a-fA-F];

WS: [ \t\n\r]+ -> skip;

COMMENT: '/*' .*? '*/' -> skip;

LINE_COMMENT: '//' ~[\r\n]* -> skip;