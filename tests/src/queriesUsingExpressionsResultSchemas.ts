import { DataSourceBase } from "../../lib/datasource";
import { TestProvider } from './common/TestProvider';
import * as northwind from './common/northwind';
import { QueryOperation, QueryOperationNodeType } from '../../lib/operation';
import * as s from '../../lib/schema';

describe('queries through datasource result schemas', () => {
    test('filter', () => {
        const query: QueryOperation = { operation: QueryOperationNodeType.dataSourceReference };
        const ds: any = new DataSourceBase<northwind.Product>(new TestProvider(northwind.productSchema), query)
            .filter(product => product.unitsInStock == 0);
        const expected: s.SchemaNodeCollection = {
            kind: s.SchemaNodeKind.collection,
            elementSchema: northwind.productSchema
        };
        expect(ds.queryResultSchema).toEqual(expected);
    });
    test('map to string', () => {
        const query: QueryOperation = { operation: QueryOperationNodeType.dataSourceReference };
        const ds: any = new DataSourceBase<northwind.Employee>(new TestProvider(northwind.employeeSchema), query)
            .map(employee => employee.firstName);
        const expected: s.SchemaNodeCollection = {
            kind: s.SchemaNodeKind.collection,
            elementSchema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 10
            }
        };
        expect(ds.queryResultSchema).toEqual(expected);
    });
    test('map to element literal', () => {
        const query: QueryOperation = { operation: QueryOperationNodeType.dataSourceReference };
        const ds: any = new DataSourceBase<northwind.Order>(new TestProvider(northwind.orderSchema), query)
            .map(order => ({
                id: order.orderId,
                customer: order.customerId,
                employee: order.employeeId,
            }));
        const expected: s.SchemaNodeCollection = {
            kind: s.SchemaNodeKind.collection,
            elementSchema: {
                kind: s.SchemaNodeKind.complex,
                fields: [
                    {
                        name: 'id',
                        title: 'id',
                        schema: {
                            kind: s.SchemaNodeKind.integer,
                        },
                        isNullable: true
                    },
                    {
                        name: 'customer',
                        title: 'customer',
                        schema: {
                            kind: s.SchemaNodeKind.integer,
                        },
                        isNullable: true
                    },
                    {
                        name: 'employee',
                        title: 'employee',
                        schema: {
                            kind: s.SchemaNodeKind.integer,
                        },
                        isNullable: true
                    },
                ],
                key: []
            }
        };
        expect(ds.queryResultSchema).toEqual(expected);
    });
    test('filter and map', () => {
        const query: QueryOperation = { operation: QueryOperationNodeType.dataSourceReference };
        const ds: any = new DataSourceBase<northwind.Product>(new TestProvider(northwind.productSchema), query)
            .filter(product => product.unitsInStock == 0)
            .map(product => product.productId);
        const expected: s.SchemaNodeCollection = {
            kind: s.SchemaNodeKind.collection,
            elementSchema: {
                kind: s.SchemaNodeKind.integer
            }
        };
        expect(ds.queryResultSchema).toEqual(expected);
    });
    test('map and filter', () => {
        const query: QueryOperation = { operation: QueryOperationNodeType.dataSourceReference };
        const ds: any = new DataSourceBase<northwind.Order>(new TestProvider(northwind.orderSchema), query)
            .map(order => ({
                id: order.orderId,
                customer: order.customerId,
                employee: order.employeeId,
            }))
            .filter(order => order.customer == 1);
        const expected: s.SchemaNodeCollection = {
            kind: s.SchemaNodeKind.collection,
            elementSchema: {
                kind: s.SchemaNodeKind.complex,
                fields: [
                    {
                        name: 'id',
                        title: 'id',
                        schema: {
                            kind: s.SchemaNodeKind.integer,
                        },
                        isNullable: true
                    },
                    {
                        name: 'customer',
                        title: 'customer',
                        schema: {
                            kind: s.SchemaNodeKind.integer,
                        },
                        isNullable: true
                    },
                    {
                        name: 'employee',
                        title: 'employee',
                        schema: {
                            kind: s.SchemaNodeKind.integer,
                        },
                        isNullable: true
                    },
                ],
                key: []
            }
        };
        expect(ds.queryResultSchema).toEqual(expected);
    });
    test('nested queries', () => {
        const query: QueryOperation = { operation: QueryOperationNodeType.dataSourceReference };
        const ds: any = new DataSourceBase<northwind.Order>(new TestProvider(northwind.orderSchema), query)
            .map(order => ({
                id: order.orderId,
                products: order.orderDetails
                    .filter(detail => detail.discount > 0)
                    .map(detail => ({
                        name: detail.product.productName,
                        discount: detail.discount
                    }))
            }));
        const expected: s.SchemaNodeCollection = {
            kind: s.SchemaNodeKind.collection,
            elementSchema: {
                kind: s.SchemaNodeKind.complex,
                fields: [
                    {
                        name: 'id',
                        title: 'id',
                        schema: {
                            kind: s.SchemaNodeKind.integer
                        },
                        isNullable: true
                    },
                    {
                        name: 'products',
                        title: 'products',
                        schema: {
                            kind: s.SchemaNodeKind.collection,
                            elementSchema: {
                                kind: s.SchemaNodeKind.complex,
                                fields: [
                                    {
                                        name: 'name',
                                        title: 'name',
                                        schema: {
                                            kind: s.SchemaNodeKind.text,
                                            maxLength: 40,
                                        },
                                        isNullable: true
                                    },
                                    {
                                        name: 'discount',
                                        title: 'discount',
                                        schema: {
                                            kind: s.SchemaNodeKind.currency,
                                            lcid: 1033
                                        },
                                        isNullable: true
                                    },
                                ],
                                key: [],
                            }
                        },
                        isNullable: true
                    },
                ],
                key: [],
            },
        };
        expect(ds.queryResultSchema).toEqual(expected);
    });
});