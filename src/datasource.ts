import * as expr from 'ts-expressions';
import * as op from './operation';
import { SchemaNodeComplex, SchemaNode, SchemaNodeKind, SchemaNodeCollection } from './schema';

export interface IDataSource<T> {
    filter(predicate: expr.Expression<(element: T) => boolean>): IDataSource<T>;
    filter(predicate: (element: T) => boolean): IDataSource<T>;
    filter(parameterName: string, predicate: op.QueryOperation): IDataSource<T>;
    map<K>(projection: expr.Expression<(element: T) => K>): IDataSource<K>;
    map<K>(projection: (element: T) => K): IDataSource<K>;
    map<K>(parameterName: string, projection: op.QueryOperation): IDataSource<K>;
    //first(): Promise<T>;
    //any(): Promise<boolean>;
    toArray(): Promise<T[]>;
}

export interface IDataSourceProvider {
    schema: SchemaNodeComplex;
    execute<T>(query: op.QueryOperation): Promise<T[]>;
}

export class DataSourceBase<T = any> implements IDataSource<T> {
    constructor(provider: IDataSourceProvider, query: op.QueryOperation, queryResultSchema?: SchemaNodeCollection) {
        this.provider = provider;
        this.query = query;
        this.queryResultSchema = queryResultSchema || this.calculateInitialSchema(query);
    }
    provider: IDataSourceProvider;
    query: op.QueryOperation;
    queryResultSchema: SchemaNodeCollection;

    private calculateInitialSchema(query: op.QueryOperation) {
        const schema = op.getOperationResultSchema(this.createScope(), query);
        if (schema.kind != SchemaNodeKind.collection) {
            throw new Error();
        }
        return schema;
    }
    private createScope() {
        return new Map<string, SchemaNode>([[ op.dataSourceReferenceScopeName, {
            kind: SchemaNodeKind.collection,
            elementSchema: this.provider.schema,
         }]]);
    }

    filter(predicate: expr.Expression<(element: T) => boolean>): IDataSource<T>;
    filter(predicate: (element: T) => boolean): IDataSource<T>;
    filter(parameterName: string, predicate: op.QueryOperation): IDataSource<T>;
    filter(predicateOrParameterName: expr.Expression<(element: T) => boolean> | ((element: T) => boolean) | string, predicateOperation?: op.QueryOperation): IDataSource<T> {
        const { parameterName, body: predicate } = this.extractLambdaProperties(predicateOrParameterName, predicateOperation);
        return new DataSourceBase<T>(this.provider, 
        {
            operation: op.QueryOperationNodeType.filter,
            source: this.query,
            parameterName,
            predicate,
        }, this.queryResultSchema);
    }
    map<K>(projection: expr.Expression<(element: T) => K>): IDataSource<K>;
    map<K>(projection: (element: T) => K): IDataSource<K>;
    map<K>(parameterName: string, projection: op.QueryOperation): IDataSource<K>;
    map<K>(projectionOrParameterName: expr.Expression<(element: T) => K> | ((element: T) => K) | string, projectionOperation?: op.QueryOperation): IDataSource<T> {
        const { parameterName, body: projection } = this.extractLambdaProperties(projectionOrParameterName, projectionOperation);
        return new DataSourceBase<T>(this.provider, 
        {
            operation: op.QueryOperationNodeType.map,
            source: this.query,
            parameterName,
            projection,
        }, this.queryResultSchema);
    }
    toArray(): Promise<T[]> {
        return this.provider.execute(this.query);
    }

    private extractLambdaProperties<K extends {}>(bodyOrParameterName: expr.Expression<K> | K | string, bodyOperation?: op.QueryOperation): { parameterName: string, body: op.QueryOperation, bodySchema: SchemaNode } {
        if (typeof bodyOrParameterName == 'string') {
            const scope = this.createScope();
            scope.set(bodyOrParameterName, this.queryResultSchema);
            return {
                parameterName: bodyOrParameterName,
                body: bodyOperation!,
                bodySchema: op.getOperationResultSchema(scope, bodyOperation!)
            }
        }
        else if (expr.isLambdaExpression<K>(bodyOrParameterName) && bodyOrParameterName.root.parameters.length == 1) {
            const scope = this.createScope();
            scope.set(bodyOrParameterName.root.parameters[0].name, this.queryResultSchema);
            const convertResult = op.convertExpressionToQueryOperation(scope, bodyOrParameterName.root.body);
            return {
                parameterName: bodyOrParameterName.root.parameters[0].name,
                body: convertResult.operation,
                bodySchema: convertResult.schema,
            }
        }
        else {
            throw new Error('Argument must be a lambda expression or a query operation');
        }
    }
}

export interface INestedDataSource<T> {
    filter(predicate: expr.Expression<(element: T) => boolean>): INestedDataSource<T>;
    filter(predicate: (element: T) => boolean): INestedDataSource<T>;
    filter(parameterName: string, predicate: op.QueryOperation): INestedDataSource<T>;
    map<K>(projection: expr.Expression<(element: T) => K>): INestedDataSource<K>;
    map<K>(projection: (element: T) => K): INestedDataSource<K>;
    map<K>(parameterName: string, projection: op.QueryOperation): INestedDataSource<K>;
    //first(): T;
    //any(): boolean;
    toArray(): T[];
}