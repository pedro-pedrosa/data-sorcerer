import { IDataSourceProvider } from '../datasource';
import { QueryOperation } from '../operation';
import { SchemaNodeComplex } from '../schema';

//TODO: maybe extract this to a dom-only module in the future and remove "dom" lib from ts.config
export class FetchProvider implements IDataSourceProvider {
    constructor(url: string, schema: SchemaNodeComplex) {
        this.url = url;
        this.schema = schema;
    }
    url: string;
    schema: SchemaNodeComplex;
    async execute(query: QueryOperation) {
        const response = await fetch(this.url, { 
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(query),
        });
        if (!response.ok) {
            throw new Error(`Error fetching from data source at '${this.url}': (${response.status}) ${response.statusText}`);
        }
        return response.json();
    }
}
