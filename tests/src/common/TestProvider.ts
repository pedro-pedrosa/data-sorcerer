import { IDataSourceProvider } from '../../../lib/datasource';
import { QueryOperation } from '../../../lib/operation';
import { SchemaNodeComplex } from '../../../lib/schema';

export class TestProvider implements IDataSourceProvider {
    constructor(schema: SchemaNodeComplex) {
        this.schema = schema;
    }
    schema: SchemaNodeComplex;
    async execute(query: QueryOperation) {
        return [];
    }
}
