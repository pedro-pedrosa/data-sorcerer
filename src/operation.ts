import * as expr from 'ts-expressions';
import * as schema from './schema';

export type QueryOperation =
    //Binary
    AddOperation | AndOperation | DivideOperation | EqualOperation | GreaterOperation | 
    GreaterOrEqualOperation | LessOperation | LessOrEqualOperation | MultiplyOperation | 
    NotEqualOperation | OrOperation | SubtractOperation |
    //Unary
    NegateOperation | NotOperation |
    //Collection
    CountOperation | FilterOperation | MapOperation | SortOperation | TakePageOperation |
    //String
    ContainsOperation | EndsWithOperation | StartsWithOperation | ToLowerCaseOperation | 
    ToUpperCaseOperation |
    //Data source / element
    DataSourceReferenceOperation | ElementLiteralOperation | FieldReferenceOperation | 
    //Misc
    LiteralOperation | ParameterOperation | IfOperation;

export enum QueryOperationNodeType {
	parameter,
	dataSourceReference,
	literal,
	count,
	filter,
	map,
	sort,
	takePage,
	elementLiteral,
	fieldReference,
	add,
	subtract,
	divide,
	multiply,
	negate,
	equal,
	notEqual,
	greater,
	greaterOrEqual,
	less,
	lessOrEqual,
	and,
	or,
	not,
	if,
	contains,
	startsWith,
	endsWith,
	toUpperCase,
	toLowerCase
}

export interface BinaryOperation {
    leftOperand: QueryOperation;
    rightOperand: QueryOperation;
}
export interface AddOperation extends BinaryOperation {
    operation: QueryOperationNodeType.add;
}
export interface AndOperation extends BinaryOperation {
    operation: QueryOperationNodeType.and;
}
export interface DivideOperation extends BinaryOperation {
    operation: QueryOperationNodeType.divide;
}
export interface EqualOperation extends BinaryOperation {
    operation: QueryOperationNodeType.equal;
}
export interface GreaterOperation extends BinaryOperation {
    operation: QueryOperationNodeType.greater;
}
export interface GreaterOrEqualOperation extends BinaryOperation {
    operation: QueryOperationNodeType.greaterOrEqual;
}
export interface LessOperation extends BinaryOperation {
    operation: QueryOperationNodeType.less;
}
export interface LessOrEqualOperation extends BinaryOperation {
    operation: QueryOperationNodeType.lessOrEqual;
}
export interface MultiplyOperation extends BinaryOperation {
    operation: QueryOperationNodeType.multiply;
}
export interface NotEqualOperation extends BinaryOperation {
    operation: QueryOperationNodeType.notEqual;
}
export interface OrOperation extends BinaryOperation {
    operation: QueryOperationNodeType.or;
}
export interface SubtractOperation extends BinaryOperation {
    operation: QueryOperationNodeType.subtract;
}

export interface UnaryOperation {
    operand: QueryOperation;
}
export interface NegateOperation extends UnaryOperation {
    operation: QueryOperationNodeType.negate;
}
export interface NotOperation extends UnaryOperation {
    operation: QueryOperationNodeType.not;
}

export interface CollectionOperation {
    source: QueryOperation;
}
export interface CountOperation extends CollectionOperation {
    operation: QueryOperationNodeType.count;
}
export interface FilterOperation extends CollectionOperation {
    operation: QueryOperationNodeType.filter;
    predicate: QueryOperation;
    parameterName: string;
}
export interface MapOperation extends CollectionOperation {
    operation: QueryOperationNodeType.map;
    projection: QueryOperation;
    parameterName: string;
}
export interface SortOperation extends CollectionOperation {
    operation: QueryOperationNodeType.sort;
    steps: SortOperationStep[];
    parameterName: string;
}
export interface SortOperationStep {
    sortBy: QueryOperation;
    ascending: boolean;
}
export interface TakePageOperation extends CollectionOperation {
    operation: QueryOperationNodeType.takePage;
    start: number;
    count: number;
}

export interface ContainsOperation {
    operation: QueryOperationNodeType.contains;
    source: QueryOperation;
    search: QueryOperation;
}
export interface EndsWithOperation {
    operation: QueryOperationNodeType.endsWith;
    source: QueryOperation;
    fragment: QueryOperation;
}
export interface StartsWithOperation {
    operation: QueryOperationNodeType.startsWith;
    source: QueryOperation;
    fragment: QueryOperation;
}
export interface ToLowerCaseOperation {
    operation: QueryOperationNodeType.toLowerCase;
    text: QueryOperation;
}
export interface ToUpperCaseOperation {
    operation: QueryOperationNodeType.toUpperCase;
    text: QueryOperation;
}

export interface DataSourceReferenceOperation {
    operation: QueryOperationNodeType.dataSourceReference;
}
export interface ElementLiteralOperation {
    operation: QueryOperationNodeType.elementLiteral;
    fields: ElementLiteralOperationField[];
}
export interface ElementLiteralOperationField {
    name: string;
    value: QueryOperation;
}
export interface FieldReferenceOperation {
    operation: QueryOperationNodeType.fieldReference;
    element: QueryOperation;
    fieldName: string;
}

export interface LiteralOperation {
    operation: QueryOperationNodeType.literal;
    value: any;
}
export interface ParameterOperation {
    operation: QueryOperationNodeType.parameter;
    name: string;
}
export interface IfOperation {
    operation: QueryOperationNodeType.if;
    condition: QueryOperation;
    trueOperation: QueryOperation;
    falseOperation: QueryOperation;
}

export function convertExpressionToQueryOperation(scope: Map<string, schema.SchemaNode>, expression: expr.ExpressionNode): QueryOperation {
    const { operation } = convertVisit(scope, expression);
    return operation;
}

function convertVisit(scope: Map<string, schema.SchemaNode>, expression: expr.ExpressionNode): { operation: QueryOperation, type: schema.SchemaNode } {
    switch (expression.kind) {
        case expr.ExpressionKind.parameter:
            return convertParameter(scope, expression);
        case expr.ExpressionKind.constant:
            return convertConstant(scope, expression);
    }
    throw new Error();
}

function convertParameter(scope: Map<string, schema.SchemaNode>, expression: expr.ParameterExpression) {
    if (!scope.has(expression.name)) {
        throw new Error();
    }
    return {
        operation: {
            operation: QueryOperationNodeType.parameter,
            name: expression.name,
        } as ParameterOperation,
        type: scope.get(expression.name)!,
    };
}
function convertConstant(scope: Map<string, schema.SchemaNode>, expression: expr.ConstantExpression) {
    let type: schema.SchemaNode;
    switch (typeof expression.value) {
        case 'boolean':
            type = { kind: schema.SchemaNodeKind.boolean } as schema.SchemaNodeBoolean;
            break;
        case 'number':
            type = { kind: schema.SchemaNodeKind.decimal } as schema.SchemaNodeDecimal;
            break;
        case 'string':
            type = { kind: schema.SchemaNodeKind.text } as schema.SchemaNodeText;
            break;
        default:
            throw new Error();
    }

    return {
        operation: {
            operation: QueryOperationNodeType.literal,
            value: expression.value
        } as LiteralOperation,
        type
    }
}