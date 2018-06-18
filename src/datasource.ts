import * as expr from 'ts-expressions';
import * as op from './operation';
import { SchemaNodeComplex, SchemaNode } from './schema';

export interface IDataSource<T> {
    filter(predicate: expr.Expression<(element: T) => boolean>): IDataSource<T>;
    filter(predicate: (element: T) => boolean): IDataSource<T>;
    filter(parameterName: string, predicate: op.QueryOperation): IDataSource<T>;
    //map: <K>(projection: (element: T) => K) => IDataSource<K>;
    //first: () => Promise<T>;
    //any: () => Promise<boolean>;
    toArray: () => Promise<T[]>;
}

export interface IDataSourceProvider {
    schema: SchemaNodeComplex;
    execute<T>(query: op.QueryOperation): Promise<T[]>;
}

export class DataSourceBase<T> implements IDataSource<T> {
    constructor(provider: IDataSourceProvider, query: op.QueryOperation) {
        this.provider = provider;
        this.query = query;
    }
    provider: IDataSourceProvider;
    query: op.QueryOperation;

    filter(predicateOrParameterName: expr.Expression<(element: T) => boolean> | ((element: T) => boolean) | string, predicateOperation?: op.QueryOperation): IDataSource<T> {
        const { parameterName, body: predicate } = this.extractLambdaProperties(predicateOrParameterName, predicateOperation);
        return new DataSourceBase<T>(this.provider, 
        {
            operation: op.QueryOperationNodeType.filter,
            source: this.query,
            parameterName,
            predicate,
        } as op.FilterOperation);
    }
    /*map<K>(predicate: (element: T) => K): IDataSource<K> {
        return new DataSourceBase<K>(this.provider, 
        {
            operation: op.QueryOperationNodeType.filter,
            source: this.query,
            parameterName,
            predicate,
        } as op.MapOperation);
    }
    first(): Promise<T> {

    }
    any(): Promise<boolean> {
        
    }*/
    toArray(): Promise<T[]> {
        return this.provider.execute(this.query);
    }

    private extractLambdaProperties<K extends {}>(bodyOrParameterName: expr.Expression<K> | K | string, bodyOperation?: op.QueryOperation) {
        if (typeof bodyOrParameterName == 'string') {
            return {
                parameterName: bodyOrParameterName,
                body: bodyOperation!
            }
        }
        else if (expr.isLambdaExpression<K>(bodyOrParameterName) && bodyOrParameterName.root.parameters.length == 1) {
            const scope = new Map<string, SchemaNode>();
            scope.set(bodyOrParameterName.root.parameters[0].name, this.provider.schema);
            return {
                parameterName: bodyOrParameterName.root.parameters[0].name,
                body: op.convertExpressionToQueryOperation(scope, bodyOrParameterName.root.body)
            }
        }
        else {
            throw new Error('Predicate must be a lambda expression or a query operation');
        }
    }
}
