import * as op from './operation';

export interface IDataSource<T> {
    filter: (predicate: (element: T) => boolean) => IDataSource<T>;
    //map: <K>(projection: (element: T) => K) => IDataSource<K>;
    //first: () => Promise<T>;
    //any: () => Promise<boolean>;
    toArray: () => Promise<T[]>;
}

export interface IDataSourceProvider {
    execute: <T>(query: op.QueryOperation) => Promise<T[]>;
}

export class DataSourceBase<T> implements IDataSource<T> {
    constructor(provider: IDataSourceProvider, query: op.QueryOperation) {
        this.provider = provider;
        this.query = query;
    }
    provider: IDataSourceProvider;
    query: op.QueryOperation;

    filter(predicate: (element: T) => boolean): IDataSource<T> {
        return new DataSourceBase<T>(this.provider, 
        {
            operation: op.QueryOperationNodeType.filter,
            source: this.query,
            parameterName: 'p',
            predicate: this.query,
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
}
