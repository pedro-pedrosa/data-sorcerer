import { IDataSourceProvider } from '../datasource';
import * as op from '../operation';

export class InMemoryProvider<T = any> implements IDataSourceProvider {
    constructor(data: T[]) {
        this.data = data;
    }
    data: T[];
    execute(query: op.QueryOperation) {
        return Promise.resolve(this.visit(query));
    }
    private visit(query: op.QueryOperation): any[] {
        switch (query.operation) {
            case op.QueryOperationNodeType.dataSourceReference:
                return this.data;
            case op.QueryOperationNodeType.filter:
                return this.visitFilter(query);
        }
        throw new Error();
    }

    private visitFilter(query: op.FilterOperation) {
        const source = this.visit(query.source);
        return source.filter(e => {
            function operationVisit(operation: op.QueryOperation): any {
                switch(operation.operation) {
                    case op.QueryOperationNodeType.parameter:
                        return e;
                    case op.QueryOperationNodeType.fieldReference:
                        return operationVisit(operation.element)[operation.fieldName];
                }
                throw new Error();
            }
            return operationVisit(query.predicate);
        })
    }
}