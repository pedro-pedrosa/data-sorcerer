import * as expr from 'ts-expressions';
import * as schema from './schema';

export type QueryOperation =
    BinaryOperation | UnaryOperation |
    //Collection
    CollectionLiteralOperation | CountOperation | FilterOperation | MapOperation | SortOperation | TakePageOperation |
    //String
    ContainsOperation | EndsWithOperation | StartsWithOperation | ToLowerCaseOperation | 
    ToUpperCaseOperation |
    //Data source / element
    DataSourceReferenceOperation | ElementLiteralOperation | FieldReferenceOperation | 
    //Misc
    LiteralOperation | ParameterOperation | IfOperation;

export type BinaryOperation = 
    AddOperation | AndOperation | DivideOperation | EqualOperation | GreaterOperation | 
    GreaterOrEqualOperation | LessOperation | LessOrEqualOperation | MultiplyOperation | 
    NotEqualOperation | OrOperation | SubtractOperation;

export type UnaryOperation = NegateOperation | NotOperation;

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
    collectionLiteral,
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

export interface BinaryOperationBase {
    leftOperand: QueryOperation;
    rightOperand: QueryOperation;
}
export interface AddOperation extends BinaryOperationBase {
    operation: QueryOperationNodeType.add;
}
export interface AndOperation extends BinaryOperationBase {
    operation: QueryOperationNodeType.and;
}
export interface DivideOperation extends BinaryOperationBase {
    operation: QueryOperationNodeType.divide;
}
export interface EqualOperation extends BinaryOperationBase {
    operation: QueryOperationNodeType.equal;
}
export interface GreaterOperation extends BinaryOperationBase {
    operation: QueryOperationNodeType.greater;
}
export interface GreaterOrEqualOperation extends BinaryOperationBase {
    operation: QueryOperationNodeType.greaterOrEqual;
}
export interface LessOperation extends BinaryOperationBase {
    operation: QueryOperationNodeType.less;
}
export interface LessOrEqualOperation extends BinaryOperationBase {
    operation: QueryOperationNodeType.lessOrEqual;
}
export interface MultiplyOperation extends BinaryOperationBase {
    operation: QueryOperationNodeType.multiply;
}
export interface NotEqualOperation extends BinaryOperationBase {
    operation: QueryOperationNodeType.notEqual;
}
export interface OrOperation extends BinaryOperationBase {
    operation: QueryOperationNodeType.or;
}
export interface SubtractOperation extends BinaryOperationBase {
    operation: QueryOperationNodeType.subtract;
}

export interface UnaryOperationBase {
    operand: QueryOperation;
}
export interface NegateOperation extends UnaryOperationBase {
    operation: QueryOperationNodeType.negate;
}
export interface NotOperation extends UnaryOperationBase {
    operation: QueryOperationNodeType.not;
}

export interface CollectionLiteralOperation {
    operation: QueryOperationNodeType.collectionLiteral;
    elements: QueryOperation[];
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

export type ConvertExpressionToQueryOperationResult = {
    operation: QueryOperation, 
    type: schema.SchemaNode
}
export function convertExpressionToQueryOperation(scope: Map<string, schema.SchemaNode>, expression: expr.ExpressionNode): ConvertExpressionToQueryOperationResult {
    return convertVisit(scope, expression);
}

function convertVisit(scope: Map<string, schema.SchemaNode>, expression: expr.ExpressionNode): ConvertExpressionToQueryOperationResult {
    switch (expression.kind) {
        case expr.ExpressionKind.parameter:
            return convertParameter(scope, expression);
        case expr.ExpressionKind.constant:
            return convertConstant(expression);
        case expr.ExpressionKind.objectLiteral:
            return convertObjectLiteral(scope, expression);
        case expr.ExpressionKind.arrayLiteral:
            return convertArrayLiteral(scope, expression);
        case expr.ExpressionKind.propertyAccess:
            return convertPropertyAccess(scope, expression);
        case expr.ExpressionKind.binary:
            return convertBinary(scope, expression);
        case expr.ExpressionKind.call:
            return convertCall(scope, expression);
    }
    throw new Error();
}

function convertParameter(scope: Map<string, schema.SchemaNode>, expression: expr.ParameterExpression): ConvertExpressionToQueryOperationResult {
    if (!scope.has(expression.name)) {
        throw new Error();
    }
    return {
        operation: {
            operation: QueryOperationNodeType.parameter, 
            name: expression.name,
        },
        type: scope.get(expression.name)!,
    };
}
function convertConstant(expression: expr.ConstantExpression): ConvertExpressionToQueryOperationResult {
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
function convertObjectLiteral(scope: Map<string, schema.SchemaNode>, expression: expr.ObjectLiteralExpression): ConvertExpressionToQueryOperationResult {
    const propertiesVisitResult = expression.properties.map(p => ({ name: p.name, ...convertVisit(scope, p.expression) }));
    return {
        operation: {
            operation: QueryOperationNodeType.elementLiteral,
            fields: propertiesVisitResult.map(p => ({
                name: p.name,
                value: p.operation
            }) as ElementLiteralOperationField),
        } as ElementLiteralOperation,
        type: {
            kind: schema.SchemaNodeKind.complex,
            fields: propertiesVisitResult.map(r => ({
                name: r.name,
                title: r.name,
                type: r.type
            }) as schema.SchemaNodeComplexField),
            key: [],
        } as schema.SchemaNodeComplex,
    };
}
function convertArrayLiteral(scope: Map<string, schema.SchemaNode>, expression: expr.ArrayLiteralExpression): ConvertExpressionToQueryOperationResult {
    const elementsVisitResult = expression.elements.map(e => convertVisit(scope, e));
    const type = elementsVisitResult.length > 0 ? elementsVisitResult[0].type : undefined;
    if (elementsVisitResult.find(e => !schema.nodesEqual(type!, e.type))) {
        throw new Error();
    }
    return {
        operation: {
            operation: QueryOperationNodeType.collectionLiteral,
            elements: elementsVisitResult.map(r => r.operation),
        } as CollectionLiteralOperation,
        type: type || { kind: schema.SchemaNodeKind.complex, fields:[], key:[] } as schema.SchemaNodeComplex
    };
}
function convertPropertyAccess(scope: Map<string, schema.SchemaNode>, expression: expr.PropertyAccessExpression): ConvertExpressionToQueryOperationResult {
    const target = convertVisit(scope, expression.expression);
    if (target.type.kind != schema.SchemaNodeKind.complex) {
        //TODO: handle other types like text.length
        throw new Error();
    }
    const field = target.type.fields.find(f => f.name == expression.name);
    if (!field) {
        throw new Error();
    }
    return {
        operation: {
            operation: QueryOperationNodeType.fieldReference,
            element: target.operation,
            fieldName: expression.name,
        } as FieldReferenceOperation,
        type: field.type,
    };
}
function convertBinary(scope: Map<string, schema.SchemaNode>, expression: expr.BinaryExpression): ConvertExpressionToQueryOperationResult {
    const left = convertVisit(scope, expression.left);
    const right = convertVisit(scope, expression.right);
    let operationKind;
    switch (expression.operator) {
        case expr.BinaryOperator.equals:
        case expr.BinaryOperator.strictEquals:
            operationKind = QueryOperationNodeType.equal;
            break;
        case expr.BinaryOperator.notEquals:
        case expr.BinaryOperator.notStrictEquals:
            operationKind = QueryOperationNodeType.notEqual;
            break;
        default:
            throw new Error();
    }
    return {
        operation: {
            operation: operationKind,
            leftOperand: left.operation,
            rightOperand: right.operation,
        } as BinaryOperation,
        type: getSchemaTypeForBinaryOperation(operationKind, left.type, right.type),
    };
}
function getSchemaTypeForBinaryOperation(operationKind: QueryOperationNodeType, leftOperandSchema: schema.SchemaNode, rightOperandSchema: schema.SchemaNode): schema.SchemaNode
{
    switch (operationKind)
    {
        case QueryOperationNodeType.add:
        case QueryOperationNodeType.subtract:
            switch (leftOperandSchema.kind)
            {
                case schema.SchemaNodeKind.integer:
                    switch (rightOperandSchema.kind)
                    {
                        case schema.SchemaNodeKind.integer:
                            return { kind: schema.SchemaNodeKind.integer };
                        case schema.SchemaNodeKind.decimal:
                            return { kind: schema.SchemaNodeKind.decimal, showAsPercent: rightOperandSchema.showAsPercent };
                        case schema.SchemaNodeKind.currency:
                            return { kind: schema.SchemaNodeKind.currency, lcid: rightOperandSchema.lcid };
                        default:
                            throw new Error();
                    }
                case schema.SchemaNodeKind.decimal:
                    switch (rightOperandSchema.kind)
                    {
                        case schema.SchemaNodeKind.integer:
                            return { kind: schema.SchemaNodeKind.decimal, showAsPercent: leftOperandSchema.showAsPercent };
                        case schema.SchemaNodeKind.decimal:
                            return { kind: schema.SchemaNodeKind.decimal, showAsPercent: leftOperandSchema.showAsPercent || rightOperandSchema.showAsPercent };
                        case schema.SchemaNodeKind.currency:
                            return { kind: schema.SchemaNodeKind.currency, lcid: rightOperandSchema.lcid };
                        default:
                            throw new Error();
                    }
                case schema.SchemaNodeKind.currency:
                    switch (rightOperandSchema.kind)
                    {
                        case schema.SchemaNodeKind.integer:
                        case schema.SchemaNodeKind.decimal:
                            return { kind: schema.SchemaNodeKind.currency, lcid: leftOperandSchema.lcid };
                        case schema.SchemaNodeKind.currency:
                            if (leftOperandSchema.lcid != rightOperandSchema.lcid)
                            {
                                throw new Error();
                            }
                            return { kind: schema.SchemaNodeKind.currency, lcid: leftOperandSchema.lcid };
                        default:
                            throw new Error();
                    }
                default:
                    throw new Error();
            } 
        case QueryOperationNodeType.divide:
            switch (leftOperandSchema.kind)
            {
                case schema.SchemaNodeKind.integer:
                    switch (rightOperandSchema.kind)
                    {
                        case schema.SchemaNodeKind.integer:
                            return { kind: schema.SchemaNodeKind.integer };
                        case schema.SchemaNodeKind.decimal:
                        case schema.SchemaNodeKind.currency:
                            return { kind: schema.SchemaNodeKind.decimal };
                        default:
                            throw new Error();
                    }
                case schema.SchemaNodeKind.decimal:
                    switch (rightOperandSchema.kind)
                    {
                        case schema.SchemaNodeKind.integer:
                        case schema.SchemaNodeKind.decimal:
                        case schema.SchemaNodeKind.currency:
                            return { kind: schema.SchemaNodeKind.decimal, showAsPercent: leftOperandSchema.showAsPercent };
                        default:
                            throw new Error();
                    }
                case schema.SchemaNodeKind.currency:
                    switch (rightOperandSchema.kind)
                    {
                        case schema.SchemaNodeKind.integer:
                        case schema.SchemaNodeKind.decimal:
                            return { kind: schema.SchemaNodeKind.currency, lcid: leftOperandSchema.lcid };
                        case schema.SchemaNodeKind.currency:
                            return { kind: schema.SchemaNodeKind.decimal };
                        default:
                            throw new Error();
                    }
                default:
                    throw new Error();
            }
        case QueryOperationNodeType.multiply:
            switch (leftOperandSchema.kind)
            {
                case schema.SchemaNodeKind.integer:
                    switch (rightOperandSchema.kind)
                    {
                        case schema.SchemaNodeKind.integer:
                            return { kind: schema.SchemaNodeKind.integer };
                        case schema.SchemaNodeKind.decimal:
                            return { kind: schema.SchemaNodeKind.decimal, showAsPercent: rightOperandSchema.showAsPercent };
                        case schema.SchemaNodeKind.currency:
                            return { kind: schema.SchemaNodeKind.currency, lcid: rightOperandSchema.lcid };
                        default:
                            throw new Error();
                    }
                case schema.SchemaNodeKind.decimal:
                    switch (rightOperandSchema.kind)
                    {
                        case schema.SchemaNodeKind.integer:
                            return { kind: schema.SchemaNodeKind.decimal, showAsPercent: leftOperandSchema.showAsPercent };
                        case schema.SchemaNodeKind.decimal:
                            return { kind: schema.SchemaNodeKind.decimal, showAsPercent: leftOperandSchema.showAsPercent || rightOperandSchema.showAsPercent };
                        case schema.SchemaNodeKind.currency:
                            return { kind: schema.SchemaNodeKind.currency, lcid: rightOperandSchema.lcid };
                        default:
                            throw new Error();
                    }
                case schema.SchemaNodeKind.currency:
                    switch (rightOperandSchema.kind)
                    {
                        case schema.SchemaNodeKind.integer:
                        case schema.SchemaNodeKind.decimal:
                            return { kind: schema.SchemaNodeKind.currency, lcid: leftOperandSchema.lcid };
                        default:
                            throw new Error();
                    }
                default:
                    throw new Error();
            }
        case QueryOperationNodeType.equal:
        case QueryOperationNodeType.notEqual:
            return { kind: schema.SchemaNodeKind.boolean };
        case QueryOperationNodeType.greater:
        case QueryOperationNodeType.greaterOrEqual:
        case QueryOperationNodeType.less:
        case QueryOperationNodeType.lessOrEqual:
            if ((leftOperandSchema.kind == schema.SchemaNodeKind.integer || leftOperandSchema.kind == schema.SchemaNodeKind.decimal || leftOperandSchema.kind == schema.SchemaNodeKind.currency) &&
                (rightOperandSchema.kind == schema.SchemaNodeKind.integer || rightOperandSchema.kind == schema.SchemaNodeKind.decimal || rightOperandSchema.kind == schema.SchemaNodeKind.currency))
            {
                return { kind: schema.SchemaNodeKind.boolean };
            }
            else
            {
                throw new Error();
            }
        case QueryOperationNodeType.and:
        case QueryOperationNodeType.or:
            if (leftOperandSchema.kind == schema.SchemaNodeKind.boolean && rightOperandSchema.kind == schema.SchemaNodeKind.boolean)
            {
                return { kind: schema.SchemaNodeKind.boolean, format: leftOperandSchema.format == schema.SchemaNodeBooleanFormat.yesNo && rightOperandSchema.format == schema.SchemaNodeBooleanFormat.yesNo ? schema.SchemaNodeBooleanFormat.yesNo : schema.SchemaNodeBooleanFormat.checkbox };
            }
            else
            {
                throw new Error();
            }
        default:
            throw new Error();
    }
}
function convertCall(scope: Map<string, schema.SchemaNode>, expression: expr.CallExpression): ConvertExpressionToQueryOperationResult {
    if (expression.callee.kind != expr.ExpressionKind.propertyAccess) {
        throw new Error();
    }
    const calleeTargetResult = convertVisit(scope, expression.callee.expression);
    switch (calleeTargetResult.type.kind) {
        case schema.SchemaNodeKind.collection:
            switch (expression.callee.name) {
                case 'filter':
                    if (expression.arguments.length != 1) {
                        throw new Error();
                    }
                    const lambdaExpression = expression.arguments[0];
                    if (lambdaExpression.kind != expr.ExpressionKind.lambda || lambdaExpression.parameters.length != 1) {
                        throw new Error();
                    }
                    const newScope = new Map(scope);
                    newScope.set(lambdaExpression.parameters[0].name, calleeTargetResult.type.elementType);
                    const { operation: predicate } = convertVisit(newScope, lambdaExpression.body);
                    return {
                        operation: {
                            operation: QueryOperationNodeType.filter,
                            source: calleeTargetResult.operation,
                            parameterName: lambdaExpression.parameters[0].name,
                            predicate,
                        },
                        type: {
                            kind: schema.SchemaNodeKind.collection,
                            elementType: calleeTargetResult.type.elementType,
                        }
                    }
                default:
                    throw new Error();
            }
        default:
        throw new Error();
    }
}
