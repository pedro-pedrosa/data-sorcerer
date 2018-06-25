import * as expr from 'ts-expressions';
import * as s from './schema';

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
    schema: s.SchemaNode
}
export function convertExpressionToQueryOperation(scope: Map<string, s.SchemaNode>, expression: expr.ExpressionNode): ConvertExpressionToQueryOperationResult {
    return convertVisit(scope, expression);
}
function convertVisit(scope: Map<string, s.SchemaNode>, expression: expr.ExpressionNode): ConvertExpressionToQueryOperationResult {
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

function convertParameter(scope: Map<string, s.SchemaNode>, expression: expr.ParameterExpression): ConvertExpressionToQueryOperationResult {
    if (!scope.has(expression.name)) {
        throw new Error();
    }
    return {
        operation: {
            operation: QueryOperationNodeType.parameter, 
            name: expression.name,
        },
        schema: scope.get(expression.name)!,
    };
}
function convertConstant(expression: expr.ConstantExpression): ConvertExpressionToQueryOperationResult {
    const operation: LiteralOperation = {
        operation: QueryOperationNodeType.literal,
        value: expression.value
    };
    return {
        operation,
        schema: getSchemaNodeForValue(operation.value),
    }
}
function convertObjectLiteral(scope: Map<string, s.SchemaNode>, expression: expr.ObjectLiteralExpression): ConvertExpressionToQueryOperationResult {
    const propertiesVisitResult = expression.properties.map(p => ({ name: p.name, ...convertVisit(scope, p.expression) }));
    return {
        operation: {
            operation: QueryOperationNodeType.elementLiteral,
            fields: propertiesVisitResult.map(p => ({
                name: p.name,
                value: p.operation
            })),
        },
        schema: {
            kind: s.SchemaNodeKind.complex,
            fields: propertiesVisitResult.map(r => ({
                name: r.name,
                title: r.name,
                schema: r.schema,
                isNullable: true
            })),
            key: [],
        },
    };
}
function convertArrayLiteral(scope: Map<string, s.SchemaNode>, expression: expr.ArrayLiteralExpression): ConvertExpressionToQueryOperationResult {
    const elementsVisitResult = expression.elements.map(e => convertVisit(scope, e));
    return {
        operation: {
            operation: QueryOperationNodeType.collectionLiteral,
            elements: elementsVisitResult.map(r => r.operation),
        },
        schema: getSchemaNodeForCollection(elementsVisitResult.map(r => r.schema))
    };
}
function convertPropertyAccess(scope: Map<string, s.SchemaNode>, expression: expr.PropertyAccessExpression): ConvertExpressionToQueryOperationResult {
    const target = convertVisit(scope, expression.expression);
    return {
        operation: {
            operation: QueryOperationNodeType.fieldReference,
            element: target.operation,
            fieldName: expression.name,
        },
        schema: getSchemaNodeForFieldReference(target.schema, expression.name),
    };
}
function convertBinary(scope: Map<string, s.SchemaNode>, expression: expr.BinaryExpression): ConvertExpressionToQueryOperationResult {
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
        schema: getSchemaNodeForBinaryOperation(operationKind, left.schema, right.schema),
    };
}
function convertCall(scope: Map<string, s.SchemaNode>, expression: expr.CallExpression): ConvertExpressionToQueryOperationResult {
    if (expression.callee.kind != expr.ExpressionKind.propertyAccess) {
        throw new Error();
    }
    const calleeTargetResult = convertVisit(scope, expression.callee.expression);
    switch (calleeTargetResult.schema.kind) {
        case s.SchemaNodeKind.collection:
            switch (expression.callee.name) {
                case 'filter':
                    return convertCollectionFilterCall(scope, calleeTargetResult.operation, calleeTargetResult.schema.elementSchema, expression.arguments);
                case 'map':
                    return convertCollectionMapCall(scope, calleeTargetResult.operation, calleeTargetResult.schema.elementSchema, expression.arguments);
                default:
                    throw new Error();
            }
        default:
        throw new Error();
    }
}
function convertCollectionFilterCall(scope: Map<string, s.SchemaNode>, source: QueryOperation, sourceElementSchema: s.SchemaNode, args: expr.ExpressionNode[]): ConvertExpressionToQueryOperationResult {
    if (args.length != 1) {
        throw new Error();
    }
    const { parameterName, operation: predicate } = tryConvertCollectionCallLambda(scope, args[0], sourceElementSchema)
    return {
        operation: {
            operation: QueryOperationNodeType.filter,
            source,
            parameterName,
            predicate,
        },
        schema: {
            kind: s.SchemaNodeKind.collection,
            elementSchema: sourceElementSchema,
        }
    };
}
function convertCollectionMapCall(scope: Map<string, s.SchemaNode>, source: QueryOperation, sourceElementSchema: s.SchemaNode, args: expr.ExpressionNode[]): ConvertExpressionToQueryOperationResult {
    if (args.length != 1) {
        throw new Error();
    }
    const { parameterName, operation: projection, schema: elementSchema } = tryConvertCollectionCallLambda(scope, args[0], sourceElementSchema);
    return {
        operation: {
            operation: QueryOperationNodeType.map,
            source,
            parameterName: parameterName,
            projection
        },
        schema: {
            kind: s.SchemaNodeKind.collection,
            elementSchema,
        }
    };
}
function tryConvertCollectionCallLambda(scope: Map<string, s.SchemaNode>, expression: expr.ExpressionNode, collectionElementSchema: s.SchemaNode) {
    if (expression.kind != expr.ExpressionKind.lambda || expression.parameters.length != 1) {
        throw new Error();
    }
    const parameterName = expression.parameters[0].name;
    const newScope = new Map(scope);
    newScope.set(expression.parameters[0].name, collectionElementSchema);
    return { parameterName, ...convertVisit(newScope, expression.body) };
}

export const dataSourceReferenceScopeName = '$datasource';
export function getOperationResultSchema(scope: Map<string, s.SchemaNode>, queryOperation: QueryOperation): s.SchemaNode {
    return schemaVisit(scope, queryOperation);
}
function schemaVisit(scope: Map<string, s.SchemaNode>, queryOperation: QueryOperation): s.SchemaNode {
    switch (queryOperation.operation) {
        case QueryOperationNodeType.dataSourceReference:
            return schemaVisitDataSourceReference(scope);
        case QueryOperationNodeType.parameter:
            return schemaVisitParameter(scope, queryOperation);
        case QueryOperationNodeType.literal:
            return schemaVisitLiteral(queryOperation);
        case QueryOperationNodeType.elementLiteral:
            return schemaVisitElementLiteral(scope, queryOperation);
        case QueryOperationNodeType.collectionLiteral:
            return schemaVisitCollectionLiteral(scope, queryOperation);
        case QueryOperationNodeType.fieldReference:
            return schemaVisitFieldReference(scope, queryOperation);
        case QueryOperationNodeType.add:
        case QueryOperationNodeType.and:
        case QueryOperationNodeType.divide:
        case QueryOperationNodeType.equal:
        case QueryOperationNodeType.greater:
        case QueryOperationNodeType.greaterOrEqual:
        case QueryOperationNodeType.less:
        case QueryOperationNodeType.lessOrEqual:
        case QueryOperationNodeType.multiply:
        case QueryOperationNodeType.notEqual:
        case QueryOperationNodeType.or:
        case QueryOperationNodeType.subtract:
            return schemaVisitBinary(scope, queryOperation);
        case QueryOperationNodeType.filter:
            return schemaVisitFilter(scope, queryOperation);
        case QueryOperationNodeType.map:
            return schemaVisitMap(scope, queryOperation);
    }
    throw new Error();
}

function schemaVisitDataSourceReference(scope: Map<string, s.SchemaNode>): s.SchemaNode {
    if (!scope.has(dataSourceReferenceScopeName)) {
        throw new Error();
    }
    return scope.get(dataSourceReferenceScopeName)!
}
function schemaVisitParameter(scope: Map<string, s.SchemaNode>, queryOperation: ParameterOperation): s.SchemaNode {
    if (!scope.has(queryOperation.name)) {
        throw new Error();
    }
    return scope.get(queryOperation.name)!
}
function schemaVisitLiteral(queryOperation: LiteralOperation): s.SchemaNode {
    return getSchemaNodeForValue(queryOperation.value);
}
function schemaVisitElementLiteral(scope: Map<string, s.SchemaNode>, queryOperation: ElementLiteralOperation): s.SchemaNode {
    return {
        kind: s.SchemaNodeKind.complex,
        fields: queryOperation.fields.map(r => ({
            name: r.name,
            title: r.name,
            schema: schemaVisit(scope, r.value),
            isNullable: true
        })),
        key: [],
    }
}
function schemaVisitCollectionLiteral(scope: Map<string, s.SchemaNode>, queryOperation: CollectionLiteralOperation): s.SchemaNode {
    return getSchemaNodeForCollection(queryOperation.elements.map(e => schemaVisit(scope, e)));
}
function schemaVisitFieldReference(scope: Map<string, s.SchemaNode>, queryOperation: FieldReferenceOperation): s.SchemaNode {
    return getSchemaNodeForFieldReference(schemaVisit(scope, queryOperation.element), queryOperation.fieldName);
}
function schemaVisitBinary(scope: Map<string, s.SchemaNode>, queryOperation: BinaryOperation): s.SchemaNode {
    const left = schemaVisit(scope, queryOperation.leftOperand);
    const right = schemaVisit(scope, queryOperation.rightOperand);
    return getSchemaNodeForBinaryOperation(queryOperation.operation, left, right);
}
function schemaVisitFilter(scope: Map<string, s.SchemaNode>, queryOperation: FilterOperation): s.SchemaNode {
    const source = schemaVisit(scope, queryOperation.source);
    const newScope = new Map(scope);
    newScope.set(queryOperation.parameterName, getSchemaNodeForCollectionSourceElement(source));
    if (schemaVisit(newScope, queryOperation.predicate).kind != s.SchemaNodeKind.boolean) {
        throw new Error();
    }
    return source;
}
function schemaVisitMap(scope: Map<string, s.SchemaNode>, queryOperation: MapOperation): s.SchemaNode {
    const source = schemaVisit(scope, queryOperation.source);
    const newScope = new Map(scope);
    newScope.set(queryOperation.parameterName, getSchemaNodeForCollectionSourceElement(source));
    return {
        kind: s.SchemaNodeKind.collection,
        elementSchema: schemaVisit(newScope, queryOperation.projection),
    };
}

function getSchemaNodeForValue(value: any): s.SchemaNode {
    switch (typeof value) {
        case 'boolean':
            return { kind: s.SchemaNodeKind.boolean } as s.SchemaNodeBoolean;
        case 'number':
            return { kind: s.SchemaNodeKind.decimal } as s.SchemaNodeDecimal;
        case 'string':
            return { kind: s.SchemaNodeKind.text } as s.SchemaNodeText;
        default:
            throw new Error();
    }
}
function getSchemaNodeForCollection(elementSchemas: s.SchemaNode[]): s.SchemaNode {
    const schema = elementSchemas.length > 0 ? elementSchemas[0] : undefined;
    if (elementSchemas.find(e => !s.nodesEqual(schema!, e))) {
        throw new Error();
    }
    return {
        kind: s.SchemaNodeKind.collection,
        elementSchema: schema || { kind: s.SchemaNodeKind.complex, fields:[], key:[] }
    };
}
function getSchemaNodeForCollectionSourceElement(sourceSchema: s.SchemaNode): s.SchemaNode {
    switch (sourceSchema.kind) {
        case s.SchemaNodeKind.collection:
            return sourceSchema.elementSchema;
        case s.SchemaNodeKind.lookupContains:
            return sourceSchema.lookupSchema;
        case s.SchemaNodeKind.lookupHasMany:
            return sourceSchema.lookupSchema;
    }
    throw new Error();
}
function getSchemaNodeForFieldReference(target: s.SchemaNode, fieldName: string): s.SchemaNode {
    switch (target.kind) {
        case s.SchemaNodeKind.complex:
            return getSchemaNodeForComplexFieldReference(target, fieldName);
        case s.SchemaNodeKind.lookupBelongs:
        return getSchemaNodeForLookupBelongsFieldReference(target, fieldName);
    }
    throw new Error();
}
function getSchemaNodeForLookupBelongsFieldReference(lookup: s.SchemaNodeLookupBelongs, fieldName: string): s.SchemaNode {
    return getSchemaNodeForComplexFieldReference(lookup.lookupSchema, fieldName);
}
function getSchemaNodeForComplexFieldReference(complexElement: s.SchemaNodeComplex, fieldName: string): s.SchemaNode {
    const field = complexElement.fields.find(f => f.name == fieldName);
    if (!field) {
        throw new Error();
    }
    return field.schema;
}
function getSchemaNodeForBinaryOperation(operationKind: QueryOperationNodeType, leftOperandSchema: s.SchemaNode, rightOperandSchema: s.SchemaNode): s.SchemaNode
{
    switch (operationKind)
    {
        case QueryOperationNodeType.add:
        case QueryOperationNodeType.subtract:
            switch (leftOperandSchema.kind)
            {
                case s.SchemaNodeKind.integer:
                    switch (rightOperandSchema.kind)
                    {
                        case s.SchemaNodeKind.integer:
                            return { kind: s.SchemaNodeKind.integer };
                        case s.SchemaNodeKind.decimal:
                            return { kind: s.SchemaNodeKind.decimal, showAsPercent: rightOperandSchema.showAsPercent };
                        case s.SchemaNodeKind.currency:
                            return { kind: s.SchemaNodeKind.currency, lcid: rightOperandSchema.lcid };
                        default:
                            throw new Error();
                    }
                case s.SchemaNodeKind.decimal:
                    switch (rightOperandSchema.kind)
                    {
                        case s.SchemaNodeKind.integer:
                            return { kind: s.SchemaNodeKind.decimal, showAsPercent: leftOperandSchema.showAsPercent };
                        case s.SchemaNodeKind.decimal:
                            return { kind: s.SchemaNodeKind.decimal, showAsPercent: leftOperandSchema.showAsPercent || rightOperandSchema.showAsPercent };
                        case s.SchemaNodeKind.currency:
                            return { kind: s.SchemaNodeKind.currency, lcid: rightOperandSchema.lcid };
                        default:
                            throw new Error();
                    }
                case s.SchemaNodeKind.currency:
                    switch (rightOperandSchema.kind)
                    {
                        case s.SchemaNodeKind.integer:
                        case s.SchemaNodeKind.decimal:
                            return { kind: s.SchemaNodeKind.currency, lcid: leftOperandSchema.lcid };
                        case s.SchemaNodeKind.currency:
                            if (leftOperandSchema.lcid != rightOperandSchema.lcid)
                            {
                                throw new Error();
                            }
                            return { kind: s.SchemaNodeKind.currency, lcid: leftOperandSchema.lcid };
                        default:
                            throw new Error();
                    }
                default:
                    throw new Error();
            } 
        case QueryOperationNodeType.divide:
            switch (leftOperandSchema.kind)
            {
                case s.SchemaNodeKind.integer:
                    switch (rightOperandSchema.kind)
                    {
                        case s.SchemaNodeKind.integer:
                            return { kind: s.SchemaNodeKind.integer };
                        case s.SchemaNodeKind.decimal:
                        case s.SchemaNodeKind.currency:
                            return { kind: s.SchemaNodeKind.decimal };
                        default:
                            throw new Error();
                    }
                case s.SchemaNodeKind.decimal:
                    switch (rightOperandSchema.kind)
                    {
                        case s.SchemaNodeKind.integer:
                        case s.SchemaNodeKind.decimal:
                        case s.SchemaNodeKind.currency:
                            return { kind: s.SchemaNodeKind.decimal, showAsPercent: leftOperandSchema.showAsPercent };
                        default:
                            throw new Error();
                    }
                case s.SchemaNodeKind.currency:
                    switch (rightOperandSchema.kind)
                    {
                        case s.SchemaNodeKind.integer:
                        case s.SchemaNodeKind.decimal:
                            return { kind: s.SchemaNodeKind.currency, lcid: leftOperandSchema.lcid };
                        case s.SchemaNodeKind.currency:
                            return { kind: s.SchemaNodeKind.decimal };
                        default:
                            throw new Error();
                    }
                default:
                    throw new Error();
            }
        case QueryOperationNodeType.multiply:
            switch (leftOperandSchema.kind)
            {
                case s.SchemaNodeKind.integer:
                    switch (rightOperandSchema.kind)
                    {
                        case s.SchemaNodeKind.integer:
                            return { kind: s.SchemaNodeKind.integer };
                        case s.SchemaNodeKind.decimal:
                            return { kind: s.SchemaNodeKind.decimal, showAsPercent: rightOperandSchema.showAsPercent };
                        case s.SchemaNodeKind.currency:
                            return { kind: s.SchemaNodeKind.currency, lcid: rightOperandSchema.lcid };
                        default:
                            throw new Error();
                    }
                case s.SchemaNodeKind.decimal:
                    switch (rightOperandSchema.kind)
                    {
                        case s.SchemaNodeKind.integer:
                            return { kind: s.SchemaNodeKind.decimal, showAsPercent: leftOperandSchema.showAsPercent };
                        case s.SchemaNodeKind.decimal:
                            return { kind: s.SchemaNodeKind.decimal, showAsPercent: leftOperandSchema.showAsPercent || rightOperandSchema.showAsPercent };
                        case s.SchemaNodeKind.currency:
                            return { kind: s.SchemaNodeKind.currency, lcid: rightOperandSchema.lcid };
                        default:
                            throw new Error();
                    }
                case s.SchemaNodeKind.currency:
                    switch (rightOperandSchema.kind)
                    {
                        case s.SchemaNodeKind.integer:
                        case s.SchemaNodeKind.decimal:
                            return { kind: s.SchemaNodeKind.currency, lcid: leftOperandSchema.lcid };
                        default:
                            throw new Error();
                    }
                default:
                    throw new Error();
            }
        case QueryOperationNodeType.equal:
        case QueryOperationNodeType.notEqual:
            return { kind: s.SchemaNodeKind.boolean };
        case QueryOperationNodeType.greater:
        case QueryOperationNodeType.greaterOrEqual:
        case QueryOperationNodeType.less:
        case QueryOperationNodeType.lessOrEqual:
            if ((leftOperandSchema.kind == s.SchemaNodeKind.integer || leftOperandSchema.kind == s.SchemaNodeKind.decimal || leftOperandSchema.kind == s.SchemaNodeKind.currency) &&
                (rightOperandSchema.kind == s.SchemaNodeKind.integer || rightOperandSchema.kind == s.SchemaNodeKind.decimal || rightOperandSchema.kind == s.SchemaNodeKind.currency))
            {
                return { kind: s.SchemaNodeKind.boolean };
            }
            else
            {
                throw new Error();
            }
        case QueryOperationNodeType.and:
        case QueryOperationNodeType.or:
            if (leftOperandSchema.kind == s.SchemaNodeKind.boolean && rightOperandSchema.kind == s.SchemaNodeKind.boolean)
            {
                return { kind: s.SchemaNodeKind.boolean, format: leftOperandSchema.format == s.SchemaNodeBooleanFormat.yesNo && rightOperandSchema.format == s.SchemaNodeBooleanFormat.yesNo ? s.SchemaNodeBooleanFormat.yesNo : s.SchemaNodeBooleanFormat.checkbox };
            }
            else
            {
                throw new Error();
            }
        default:
            throw new Error();
    }
}