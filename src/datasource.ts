import * as expr from 'ts-expressions';
import * as op from './operation';
import { SchemaNodeComplex, SchemaNode } from './schema';

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

export class DataSourceBase<T> implements IDataSource<T> {
    constructor(provider: IDataSourceProvider, query: op.QueryOperation, queryResultSchema?: SchemaNodeComplex) {
        this.provider = provider;
        this.query = query;
        this.queryResultSchema = queryResultSchema || provider.schema;
    }
    provider: IDataSourceProvider;
    query: op.QueryOperation;
    queryResultSchema: SchemaNodeComplex;

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
            const scope = new Map<string, SchemaNode>();
            scope.set(bodyOrParameterName, this.queryResultSchema);
            return {
                parameterName: bodyOrParameterName,
                body: bodyOperation!,
                bodySchema: op.getOperationResultSchema(scope, bodyOperation!)
            }
        }
        else if (expr.isLambdaExpression<K>(bodyOrParameterName) && bodyOrParameterName.root.parameters.length == 1) {
            const scope = new Map<string, SchemaNode>();
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
