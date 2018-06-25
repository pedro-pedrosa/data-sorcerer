import { DataSourceBase } from "../../lib/datasource";
import { TestProvider } from './common/TestProvider';
import * as northwind from './common/northwind';
import { QueryOperation, QueryOperationNodeType } from '../../lib/operation';
import * as s from '../../lib/schema';

describe('queries result schemas', () => {
    test('no query', () => {
        const query: QueryOperation = { operation: QueryOperationNodeType.dataSourceReference };
        const ds = new DataSourceBase(new TestProvider(northwind.productSchema), query);
        expect(ds.queryResultSchema).toEqual({
            kind: s.SchemaNodeKind.collection,
            elementSchema: northwind.productSchema
        } as s.SchemaNodeCollection);
    });
    test('filter', () => {
        const query: QueryOperation = { 
            operation: QueryOperationNodeType.filter,
            source: { 
                operation: QueryOperationNodeType.dataSourceReference 
            },
            parameterName: 'product',
            predicate: {
                operation: QueryOperationNodeType.equal,
                leftOperand: {
                    operation: QueryOperationNodeType.fieldReference,
                    element: {
                        operation: QueryOperationNodeType.parameter,
                        name: 'product',
                    },
                    fieldName: 'unitsInStock',
                },
                rightOperand: {
                    operation: QueryOperationNodeType.literal,
                    value: 0
                }
            }
        };
        const ds = new DataSourceBase(new TestProvider(northwind.productSchema), query);
        expect(ds.queryResultSchema).toEqual({
            kind: s.SchemaNodeKind.collection,
            elementSchema: northwind.productSchema
        } as s.SchemaNodeCollection);
    });
    test('map to string', () => {
        const query: QueryOperation = { 
            operation: QueryOperationNodeType.map,
            source: { 
                operation: QueryOperationNodeType.dataSourceReference 
            },
            parameterName: 'employee',
            projection: {
                operation: QueryOperationNodeType.fieldReference,
                element: {
                    operation: QueryOperationNodeType.parameter,
                    name: 'employee',
                },
                fieldName: 'firstName',
            },
        };
        const ds = new DataSourceBase(new TestProvider(northwind.employeeSchema), query);
        expect(ds.queryResultSchema).toEqual({
            kind: s.SchemaNodeKind.collection,
            elementSchema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 10
            }
        } as s.SchemaNodeCollection);
    });
    test('map to element literal', () => {
        const query: QueryOperation = { 
            operation: QueryOperationNodeType.map,
            source: { 
                operation: QueryOperationNodeType.dataSourceReference 
            },
            parameterName: 'order',
            projection: {
                operation: QueryOperationNodeType.elementLiteral,
                fields: [
                    {
                        name: 'id',
                        value: {
                            operation: QueryOperationNodeType.fieldReference,
                            element: {
                                operation: QueryOperationNodeType.parameter,
                                name: 'order',
                            },
                            fieldName: 'orderId',
                        },
                    },
                    {
                        name: 'customer',
                        value: {
                            operation: QueryOperationNodeType.fieldReference,
                            element: {
                                operation: QueryOperationNodeType.parameter,
                                name: 'order',
                            },
                            fieldName: 'customerId',
                        },
                    },
                    {
                        name: 'employee',
                        value: {
                            operation: QueryOperationNodeType.fieldReference,
                            element: {
                                operation: QueryOperationNodeType.parameter,
                                name: 'order',
                            },
                            fieldName: 'employeeId',
                        },
                    },
                ]
            },
        };
        const ds = new DataSourceBase(new TestProvider(northwind.orderSchema), query);
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
        const query: QueryOperation = {
            operation: QueryOperationNodeType.map,
            source: { 
                operation: QueryOperationNodeType.filter,
                source: { 
                    operation: QueryOperationNodeType.dataSourceReference 
                },
                parameterName: 'product',
                predicate: {
                    operation: QueryOperationNodeType.equal,
                    leftOperand: {
                        operation: QueryOperationNodeType.fieldReference,
                        element: {
                            operation: QueryOperationNodeType.parameter,
                            name: 'product',
                        },
                        fieldName: 'unitsInStock',
                    },
                    rightOperand: {
                        operation: QueryOperationNodeType.literal,
                        value: 0
                    }
                }
            },
            parameterName: 'product',
            projection: {
                operation: QueryOperationNodeType.fieldReference,
                element: {
                    operation: QueryOperationNodeType.parameter,
                    name: 'product',
                },
                fieldName: 'productId',
            }
        }
        const ds = new DataSourceBase(new TestProvider(northwind.productSchema), query);
        const expected: s.SchemaNodeCollection = {
            kind: s.SchemaNodeKind.collection,
            elementSchema: {
                kind: s.SchemaNodeKind.integer
            }
        };
        expect(ds.queryResultSchema).toEqual(expected);
    });
    test('map and filter', () => {
        const query: QueryOperation = { 
            operation: QueryOperationNodeType.filter,
            source: { 
                operation: QueryOperationNodeType.map,
                source: { 
                    operation: QueryOperationNodeType.dataSourceReference 
                },
                parameterName: 'order',
                projection: {
                    operation: QueryOperationNodeType.elementLiteral,
                    fields: [
                        {
                            name: 'id',
                            value: {
                                operation: QueryOperationNodeType.fieldReference,
                                element: {
                                    operation: QueryOperationNodeType.parameter,
                                    name: 'order',
                                },
                                fieldName: 'orderId',
                            },
                        },
                        {
                            name: 'customer',
                            value: {
                                operation: QueryOperationNodeType.fieldReference,
                                element: {
                                    operation: QueryOperationNodeType.parameter,
                                    name: 'order',
                                },
                                fieldName: 'customerId',
                            },
                        },
                        {
                            name: 'employee',
                            value: {
                                operation: QueryOperationNodeType.fieldReference,
                                element: {
                                    operation: QueryOperationNodeType.parameter,
                                    name: 'order',
                                },
                                fieldName: 'employeeId',
                            },
                        },
                    ]
                },
            },
            parameterName: 'order',
            predicate: {
                operation: QueryOperationNodeType.equal,
                leftOperand: {
                    operation: QueryOperationNodeType.fieldReference,
                    element: {
                        operation: QueryOperationNodeType.parameter,
                        name: 'order',
                    },
                    fieldName: 'customer',
                },
                rightOperand: {
                    operation: QueryOperationNodeType.literal,
                    value: 1
                }
            }
        }
        const ds = new DataSourceBase(new TestProvider(northwind.orderSchema), query);
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
        const query: QueryOperation = { 
            operation: QueryOperationNodeType.map,
            source: {
                operation: QueryOperationNodeType.dataSourceReference,
            },
            parameterName: 'order',
            projection: {
                operation: QueryOperationNodeType.elementLiteral, 
                fields: [
                    {
                        name: 'id',
                        value: {
                            operation: QueryOperationNodeType.fieldReference,
                            element: {
                                operation: QueryOperationNodeType.parameter,
                                name: 'order',
                            },
                            fieldName: 'orderId',
                        },
                    },
                    {
                        name: 'products',
                        value: {
                            operation: QueryOperationNodeType.map,
                            source: {
                                operation: QueryOperationNodeType.filter,
                                source: {
                                    operation: QueryOperationNodeType.fieldReference,
                                    element: {
                                        operation: QueryOperationNodeType.parameter,
                                        name: 'order',
                                    },
                                    fieldName: 'orderDetails',
                                },
                                parameterName: 'detail',
                                predicate: {
                                    operation: QueryOperationNodeType.greater,
                                    leftOperand: {
                                        operation: QueryOperationNodeType.fieldReference,
                                        element: {
                                            operation: QueryOperationNodeType.parameter,
                                            name: 'detail',
                                        },
                                        fieldName: 'discount',
                                    },
                                    rightOperand: {
                                        operation: QueryOperationNodeType.literal,
                                        value: 0
                                    }
                                }
                            },
                            parameterName: 'detail',
                            projection: {
                                operation: QueryOperationNodeType.elementLiteral, 
                                fields: [
                                    {
                                        name: 'name',
                                        value: {
                                            operation: QueryOperationNodeType.fieldReference,
                                            element: {
                                                operation: QueryOperationNodeType.fieldReference,
                                                element: {
                                                    operation: QueryOperationNodeType.parameter,
                                                    name: 'detail',
                                                },
                                                fieldName: 'product',
                                            },
                                            fieldName: 'productName',
                                        },
                                    },
                                    {
                                        name: 'discount',
                                        value: {
                                            operation: QueryOperationNodeType.fieldReference,
                                            element: {
                                                operation: QueryOperationNodeType.parameter,
                                                name: 'detail',
                                            },
                                            fieldName: 'discount',
                                        },
                                    },
                                ]
                            },
                        },
                    },
                ]
            },
        };
        const ds = new DataSourceBase(new TestProvider(northwind.orderSchema), query);
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