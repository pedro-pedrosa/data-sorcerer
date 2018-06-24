import * as s from '../../../lib/schema';
import { IDataSource } from '../../../lib/datasource';

export interface Shipper {
    shipperId: number;
    companyName: string;
    phone: string;
    orders: IDataSource<Order>;
}
export interface Region {
    regionId: number;
    regionDescription: string;
}
export interface Category {
    categoryId: number;
    categoryName: string;
    description: string;
    picture: string;
    territories: IDataSource<Territory>;
    products: IDataSource<Product>;
}
export interface Supplier {
    supplierId: number;
    companyName: string;
    contactName: string;
    contactTitle: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    phone: string;
    fax: string;
    homePage: string;
    products: IDataSource<Product>;
}
export interface CustomerDemographics {
    customerTypeId: string;
    customerDescription: string;
    customers: IDataSource<Customer>;
}
export interface Customer {
    customerId: number;
    companyName: string;
    contactName: string;
    contactTitle: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    phone: string;
    fax: string;
    orders: IDataSource<Order>;
    demographics: IDataSource<CustomerDemographics>;
}
export interface Territory {
    territoryId: number;
    territoryDescription: string;
    regionId: number;
    region: Region;
    employees: IDataSource<Employee>;
}
export interface Product {
    productId: number;
    productName: string;
    supplierId: number;
    supplier: Supplier;
    categoryId: number;
    category: Category;
    quantityPerUnit: number;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    reorderLevel: number;
    discontinued: boolean;
}
export interface Employee {
    employeeId: number;
    lastName: string;
    firstName: string;
    title: string;
    titleOfCourtesy: string;
    birthDate: Date;
    hireDate: Date;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    homePhone: string;
    extension: string;
    photo: string;
    notes: string;
    reportsToId: number;
    reportsTo: Employee;
    photoPath: string;
    salary: number;
    orders: IDataSource<Order>;
    territories: IDataSource<Territory>;
}
export interface Order {
    orderId: number;
    customerId: number;
    customer: Customer;
    employeeId: number;
    employee: Employee;
    orderDate: Date;
    requiredDate: Date;
    shippedDate: Date;
    shipperId: number;
    shippedVia: Shipper;
    freight: number;
    shipName: string;
    shipAddress: string;
    shipCity: string;
    shipRegion: string;
    shipPostalCode: string;
    shipCountry: string;
    orderDetails: IDataSource<OrderDetail>;
}
export interface OrderDetail {
    orderId: number;
    order: Order;
    productId: number;
    product: Product;
    unitPrice: number;
    quantity: number;
    discount: number;
}

export const shipperSchema: s.SchemaNodeComplex = {
    kind: s.SchemaNodeKind.complex,
    fields: [
        {
            name: 'shipperId',
            title: 'Shipper ID',
            schema: {
                kind: s.SchemaNodeKind.integer
            },
            isNullable: false,
        },
        {
            name: 'companyName',
            title: 'Company Name',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 40,
            },
            isNullable: false,
        },
        {
            name: 'phone',
            title: 'Phone',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 24,
            },
            isNullable: false,
        },
    ],
    key: [ 'shipperId' ]
};
export const regionSchema: s.SchemaNodeComplex = {
    kind: s.SchemaNodeKind.complex,
    fields: [
        {
            name: 'regionId',
            title: 'Region ID',
            schema: {
                kind: s.SchemaNodeKind.integer
            },
            isNullable: false,
        },
        {
            name: 'regionDescription',
            title: 'Region Description',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 50,
            },
            isNullable: false,
        },
    ],
    key: [ 'regionId' ]
};
export const categorySchema: s.SchemaNodeComplex = {
    kind: s.SchemaNodeKind.complex,
    fields: [
        {
            name: 'categoryId',
            title: 'Category ID',
            schema: {
                kind: s.SchemaNodeKind.integer
            },
            isNullable: false,
        },
        {
            name: 'categoryName',
            title: 'Category Name',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 15,
            },
            isNullable: false,
        },
        {
            name: 'description',
            title: 'Description',
            schema: {
                kind: s.SchemaNodeKind.text,
            },
            isNullable: false,
        },
        {
            name: 'picture',
            title: 'Picture',
            schema: {
                kind: s.SchemaNodeKind.text,
            },
            isNullable: false,
        },
    ],
    key: [ 'categoryId' ]
};
export const supplierSchema: s.SchemaNodeComplex = {
    kind: s.SchemaNodeKind.complex,
    fields: [
        {
            name: 'supplierId',
            title: 'Supplier ID',
            schema: {
                kind: s.SchemaNodeKind.integer
            },
            isNullable: false,
        },
        {
            name: 'companyName',
            title: 'Company Name',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 40,
            },
            isNullable: false,
        },
        {
            name: 'contactName',
            title: 'Contact Name',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 30,
            },
            isNullable: false,
        },
        {
            name: 'contactTitle',
            title: 'Contact Title',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 30,
            },
            isNullable: false,
        },
        {
            name: 'address',
            title: 'Address',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 60,
            },
            isNullable: false,
        },
        {
            name: 'city',
            title: 'City',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 15,
            },
            isNullable: false,
        },
        {
            name: 'region',
            title: 'Region',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 15,
            },
            isNullable: false,
        },
        {
            name: 'postalcode',
            title: 'Postal Code',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 10,
            },
            isNullable: false,
        },
        {
            name: 'country',
            title: 'Country',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 15,
            },
            isNullable: false,
        },
        {
            name: 'phone',
            title: 'Phone',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 24,
            },
            isNullable: false,
        },
        {
            name: 'fax',
            title: 'Fax',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 24,
            },
            isNullable: false,
        },
        {
            name: 'homePage',
            title: 'Home Page',
            schema: {
                kind: s.SchemaNodeKind.text,
            },
            isNullable: false,
        },
    ],
    key: [ 'supplierId' ]
};
export const customerDemographicsSchema: s.SchemaNodeComplex = {
    kind: s.SchemaNodeKind.complex,
    fields: [
        {
            name: 'customerTypeId',
            title: 'Customer Type ID',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 10,
            },
            isNullable: false,
        },
        {
            name: 'customerDescription',
            title: 'Customer Description',
            schema: {
                kind: s.SchemaNodeKind.text,
            },
            isNullable: false,
        },
    ],
    key: [ 'customerTypeId' ]
};
export const customerSchema: s.SchemaNodeComplex = {
    kind: s.SchemaNodeKind.complex,
    fields: [
        {
            name: 'customerId',
            title: 'Customer ID',
            schema: {
                kind: s.SchemaNodeKind.integer
            },
            isNullable: false,
        },
        {
            name: 'companyName',
            title: 'Company Name',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 40,
            },
            isNullable: false,
        },
        {
            name: 'contactName',
            title: 'Contact Name',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 30,
            },
            isNullable: false,
        },
        {
            name: 'contactTitle',
            title: 'Contact Title',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 30,
            },
            isNullable: false,
        },
        {
            name: 'address',
            title: 'Address',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 60,
            },
            isNullable: false,
        },
        {
            name: 'city',
            title: 'City',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 15,
            },
            isNullable: false,
        },
        {
            name: 'region',
            title: 'Region',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 15,
            },
            isNullable: false,
        },
        {
            name: 'postalcode',
            title: 'Postal Code',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 10,
            },
            isNullable: false,
        },
        {
            name: 'country',
            title: 'Country',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 15,
            },
            isNullable: false,
        },
        {
            name: 'phone',
            title: 'Phone',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 24,
            },
            isNullable: false,
        },
        {
            name: 'fax',
            title: 'Fax',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 24,
            },
            isNullable: false,
        },
    ],
    key: [ 'customerId' ]
};
export const territorySchema: s.SchemaNodeComplex = {
    kind: s.SchemaNodeKind.complex,
    fields: [
        {
            name: 'territoryId',
            title: 'Territory ID',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 20,
            },
            isNullable: false,
        },
        {
            name: 'territoryDescription',
            title: 'Territory Description',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 50,
            },
            isNullable: false,
        },
        {
            name: 'regionId',
            title: 'Region ID',
            schema: {
                kind: s.SchemaNodeKind.integer,
            },
            isNullable: false,
        },
        {
            name: 'region',
            title: 'Region',
            schema: {
                kind: s.SchemaNodeKind.lookupBelongs,
                lookupSchema: regionSchema,
                foreignFieldNames: [ 'regionId' ],
            },
            isNullable: false,
        },
    ],
    key: [ 'territoryId' ]
};
export const productSchema: s.SchemaNodeComplex = {
    kind: s.SchemaNodeKind.complex,
    fields: [
        {
            name: 'productId',
            title: 'Product ID',
            schema: {
                kind: s.SchemaNodeKind.integer,
            },
            isNullable: false,
        },
        {
            name: 'productName',
            title: 'Product Name',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 40,
            },
            isNullable: false,
        },
        {
            name: 'supplierId',
            title: 'Supplier ID',
            schema: {
                kind: s.SchemaNodeKind.integer,
            },
            isNullable: false,
        },
        {
            name: 'supplier',
            title: 'Supplier',
            schema: {
                kind: s.SchemaNodeKind.lookupBelongs,
                lookupSchema: supplierSchema,
                foreignFieldNames: [ 'supplierId' ],
            },
            isNullable: false,
        },
        {
            name: 'categoryId',
            title: 'Category ID',
            schema: {
                kind: s.SchemaNodeKind.integer,
            },
            isNullable: false,
        },
        {
            name: 'category',
            title: 'Category',
            schema: {
                kind: s.SchemaNodeKind.lookupBelongs,
                lookupSchema: categorySchema,
                foreignFieldNames: [ 'categoryId' ],
            },
            isNullable: false,
        },
        {
            name: 'quantityPerUnit',
            title: 'Quantity per Unit',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 20,
            },
            isNullable: false,
        },
        {
            name: 'unitPrice',
            title: 'Unit Price',
            schema: {
                kind: s.SchemaNodeKind.currency,
                lcid: 1033
            },
            isNullable: false,
        },
        {
            name: 'unitsInStock',
            title: 'Units in Stock',
            schema: {
                kind: s.SchemaNodeKind.integer,
            },
            isNullable: false,
        },
        {
            name: 'unitsOnOrder',
            title: 'Units on Order',
            schema: {
                kind: s.SchemaNodeKind.integer,
            },
            isNullable: false,
        },
        {
            name: 'reorderLevel',
            title: 'Reorder Level',
            schema: {
                kind: s.SchemaNodeKind.integer,
            },
            isNullable: false,
        },
        {
            name: 'discontinued',
            title: 'Discontinued',
            schema: {
                kind: s.SchemaNodeKind.boolean,
            },
            isNullable: false,
        },
    ],
    key: [ 'productId' ]
};
export const customerCustomerDemographicsSchema: s.SchemaNodeComplex = {
    kind: s.SchemaNodeKind.complex,
    fields: [
        {
            name: 'customerId',
            title: 'Customer ID',
            schema: {
                kind: s.SchemaNodeKind.integer
            },
            isNullable: false,
        },
        {
            name: 'customerTypeId',
            title: 'Customer ID',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 10
            },
            isNullable: false,
        },
    ],
    key: [ 'customerId', 'customerTypeId' ]
};
export const employeeSchema: s.SchemaNodeComplex = {
    kind: s.SchemaNodeKind.complex,
    fields: [
        {
            name: 'employeeId',
            title: 'Employee ID',
            schema: {
                kind: s.SchemaNodeKind.integer
            },
            isNullable: false,
        },
        {
            name: 'lastName',
            title: 'Last Name',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 20,
            },
            isNullable: false,
        },
        {
            name: 'firstName',
            title: 'First Name',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 10,
            },
            isNullable: false,
        },
        {
            name: 'title',
            title: 'Title',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 30,
            },
            isNullable: false,
        },
        {
            name: 'titleOfCourtesy',
            title: 'Title of Courtesy',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 25,
            },
            isNullable: false,
        },
        {
            name: 'birthDate',
            title: 'Birth Date',
            schema: {
                kind: s.SchemaNodeKind.dateTime,
                format: s.SchemaNodeDateTimeFormat.date
            },
            isNullable: false,
        },
        {
            name: 'hireDate',
            title: 'Hire Date',
            schema: {
                kind: s.SchemaNodeKind.dateTime,
                format: s.SchemaNodeDateTimeFormat.date
            },
            isNullable: false,
        },
        {
            name: 'address',
            title: 'Address',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 60,
            },
            isNullable: false,
        },
        {
            name: 'city',
            title: 'City',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 15,
            },
            isNullable: false,
        },
        {
            name: 'region',
            title: 'Region',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 15,
            },
            isNullable: false,
        },
        {
            name: 'postalcode',
            title: 'Postal Code',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 10,
            },
            isNullable: false,
        },
        {
            name: 'country',
            title: 'Country',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 15,
            },
            isNullable: false,
        },
        {
            name: 'homePhone',
            title: 'Home Phone',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 24,
            },
            isNullable: false,
        },
        {
            name: 'extension',
            title: 'Extension',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 4,
            },
            isNullable: false,
        },
        {
            name: 'photo',
            title: 'Photo',
            schema: {
                kind: s.SchemaNodeKind.text,
            },
            isNullable: false,
        },
        {
            name: 'notes',
            title: 'Notes',
            schema: {
                kind: s.SchemaNodeKind.text,
            },
            isNullable: false,
        },
        {
            name: 'reportsToId',
            title: 'Reports to ID',
            schema: {
                kind: s.SchemaNodeKind.integer,
            },
            isNullable: true,
        },
        {
            name: 'photoPath',
            title: 'Photo Path',
            schema: {
                kind: s.SchemaNodeKind.text,
            },
            isNullable: false,
        },
        {
            name: 'salary',
            title: 'Salary',
            schema: {
                kind: s.SchemaNodeKind.currency,
                lcid: 1033,
            },
            isNullable: false,
        },
    ],
    key: [ 'employeeId' ]
};
export const orderSchema: s.SchemaNodeComplex = {
    kind: s.SchemaNodeKind.complex,
    fields: [
        {
            name: 'orderId',
            title: 'Order ID',
            schema: {
                kind: s.SchemaNodeKind.integer,
            },
            isNullable: false,
        },
        {
            name: 'customerId',
            title: 'Customer ID',
            schema: {
                kind: s.SchemaNodeKind.integer,
            },
            isNullable: false,
        },
        {
            name: 'customer',
            title: 'Customer',
            schema: {
                kind: s.SchemaNodeKind.lookupBelongs,
                lookupSchema: customerSchema,
                foreignFieldNames: [ 'customerId' ],
            },
            isNullable: false,
        },
        {
            name: 'employeeId',
            title: 'Employee ID',
            schema: {
                kind: s.SchemaNodeKind.integer,
            },
            isNullable: false,
        },
        {
            name: 'employee',
            title: 'Employee',
            schema: {
                kind: s.SchemaNodeKind.lookupBelongs,
                lookupSchema: employeeSchema,
                foreignFieldNames: [ 'employeeId' ],
            },
            isNullable: false,
        },
        {
            name: 'orderDate',
            title: 'Order Date',
            schema: {
                kind: s.SchemaNodeKind.dateTime,
                format: s.SchemaNodeDateTimeFormat.dateTime
            },
            isNullable: false,
        },
        {
            name: 'requiredDate',
            title: 'Required Date',
            schema: {
                kind: s.SchemaNodeKind.dateTime,
                format: s.SchemaNodeDateTimeFormat.dateTime
            },
            isNullable: false,
        },
        {
            name: 'shippedDate',
            title: 'Shipped Date',
            schema: {
                kind: s.SchemaNodeKind.dateTime,
                format: s.SchemaNodeDateTimeFormat.dateTime
            },
            isNullable: false,
        },
        {
            name: 'shipperId',
            title: 'Shipper ID',
            schema: {
                kind: s.SchemaNodeKind.integer,
            },
            isNullable: false,
        },
        {
            name: 'shippedVia',
            title: 'Shipped Via',
            schema: {
                kind: s.SchemaNodeKind.lookupBelongs,
                lookupSchema: shipperSchema,
                foreignFieldNames: [ 'shipperId' ],
            },
            isNullable: false,
        },
        {
            name: 'freight',
            title: 'Freight',
            schema: {
                kind: s.SchemaNodeKind.currency,
                lcid: 1033
            },
            isNullable: false,
        },
        {
            name: 'shipName',
            title: 'Ship Name',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 40,
            },
            isNullable: false,
        },
        {
            name: 'shipAddress',
            title: 'Ship Address',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 60,
            },
            isNullable: false,
        },
        {
            name: 'shipCity',
            title: 'Ship City',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 15,
            },
            isNullable: false,
        },
        {
            name: 'shipRegion',
            title: 'Ship Region',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 15,
            },
            isNullable: false,
        },
        {
            name: 'shipPostalCode',
            title: 'Ship Postal Code',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 10,
            },
            isNullable: false,
        },
        {
            name: 'shipCountry',
            title: 'Ship Country',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 15,
            },
            isNullable: false,
        },
    ],
    key: [ 'orderId' ]
};
export const employeeTerritorySchema: s.SchemaNodeComplex = {
    kind: s.SchemaNodeKind.complex,
    fields: [
        {
            name: 'employeeId',
            title: 'Employee ID',
            schema: {
                kind: s.SchemaNodeKind.integer,
            },
            isNullable: false,
        },
        {
            name: 'territoryId',
            title: 'Territory ID',
            schema: {
                kind: s.SchemaNodeKind.text,
                maxLength: 20,
            },
            isNullable: false,
        },
    ],
    key: [ 'employeeId', 'territoryId' ]
};
export const orderDetailSchema: s.SchemaNodeComplex = {
    kind: s.SchemaNodeKind.complex,
    fields: [
        {
            name: 'orderId',
            title: 'Order ID',
            schema: {
                kind: s.SchemaNodeKind.integer,
            },
            isNullable: false,
        },
        {
            name: 'order',
            title: 'Order',
            schema: {
                kind: s.SchemaNodeKind.lookupBelongs,
                lookupSchema: orderSchema,
                foreignFieldNames: [ 'orderId' ],
            },
            isNullable: false,
        },
        {
            name: 'productId',
            title: 'Product ID',
            schema: {
                kind: s.SchemaNodeKind.integer,
            },
            isNullable: false,
        },
        {
            name: 'product',
            title: 'Product',
            schema: {
                kind: s.SchemaNodeKind.lookupBelongs,
                lookupSchema: productSchema,
                foreignFieldNames: [ 'productId' ],
            },
            isNullable: false,
        },
        {
            name: 'unitPrice',
            title: 'Unit Price',
            schema: {
                kind: s.SchemaNodeKind.currency,
                lcid: 1033
            },
            isNullable: false,
        },
        {
            name: 'quantity',
            title: 'Quantity',
            schema: {
                kind: s.SchemaNodeKind.integer,
            },
            isNullable: false,
        },
        {
            name: 'discount',
            title: 'Discount',
            schema: {
                kind: s.SchemaNodeKind.currency,
                lcid: 1033
            },
            isNullable: false,
        },
    ],
    key: [ 'orderId', 'productId' ]
};

employeeSchema.fields.push({
    name: 'reportsTo',
    title: 'Reports to',
    schema: {
        kind: s.SchemaNodeKind.lookupBelongs,
        lookupSchema: employeeSchema,
        foreignFieldNames: [ 'reportsToId' ],
    },
    isNullable: true,
});
employeeSchema.fields.push({
    name: 'orders',
    title: 'Orders',
    schema: {
        kind: s.SchemaNodeKind.lookupContains,
        lookupSchema: orderSchema,
        lookupForeignFieldNames: [ 'employeeId' ],
    },
    isNullable: false
});
employeeSchema.fields.push({
    name: 'territories',
    title: 'Territories',
    schema: {
        kind: s.SchemaNodeKind.lookupHasMany,
        lookupSchema: territorySchema,
        relationshipSchema: employeeTerritorySchema,
        thisFieldNames: [ 'employeeId' ],
        lookupFieldNames: [ 'territoryId' ],
    },
    isNullable: false
});
shipperSchema.fields.push({
    name: 'orders',
    title: 'Orders',
    schema: {
        kind: s.SchemaNodeKind.lookupContains,
        lookupSchema: orderSchema,
        lookupForeignFieldNames: [ 'shipperId' ],
    },
    isNullable: false
});
territorySchema.fields.push({
    name: 'employees',
    title: 'Employees',
    schema: {
        kind: s.SchemaNodeKind.lookupHasMany,
        lookupSchema: employeeSchema,
        relationshipSchema: employeeTerritorySchema,
        thisFieldNames: [ 'territoryId' ],
        lookupFieldNames: [ 'employeeId' ],
    },
    isNullable: false
});
orderSchema.fields.push({
    name: 'orderDetails',
    title: 'Order Details',
    schema: {
        kind: s.SchemaNodeKind.lookupContains,
        lookupSchema: orderDetailSchema,
        lookupForeignFieldNames: [ 'orderId' ],
    },
    isNullable: false
});
customerSchema.fields.push({
    name: 'orders',
    title: 'Orders',
    schema: {
        kind: s.SchemaNodeKind.lookupContains,
        lookupSchema: orderSchema,
        lookupForeignFieldNames: [ 'customerId' ],
    },
    isNullable: false
});
customerSchema.fields.push({
    name: 'demographics',
    title: 'Demographics',
    schema: {
        kind: s.SchemaNodeKind.lookupHasMany,
        lookupSchema: customerDemographicsSchema,
        relationshipSchema: customerCustomerDemographicsSchema,
        thisFieldNames: [ 'customerId' ],
        lookupFieldNames: [ 'customerTypeId' ],
    },
    isNullable: false
});
categorySchema.fields.push({
    name: 'territories',
    title: 'Territories',
    schema: {
        kind: s.SchemaNodeKind.lookupContains,
        lookupSchema: territorySchema,
        lookupForeignFieldNames: [ 'regionId' ],
    },
    isNullable: false
});
categorySchema.fields.push({
    name: 'products',
    title: 'Products',
    schema: {
        kind: s.SchemaNodeKind.lookupContains,
        lookupSchema: productSchema,
        lookupForeignFieldNames: [ 'categoryId' ],
    },
    isNullable: false
});
customerDemographicsSchema.fields.push({
    name: 'customers',
    title: 'Customers',
    schema: {
        kind: s.SchemaNodeKind.lookupHasMany,
        lookupSchema: customerSchema,
        relationshipSchema: customerCustomerDemographicsSchema,
        thisFieldNames: [ 'customerTypeId' ],
        lookupFieldNames: [ 'customerId' ],
    },
    isNullable: false
});
supplierSchema.fields.push({
    name: 'products',
    title: 'Products',
    schema: {
        kind: s.SchemaNodeKind.lookupContains,
        lookupSchema: productSchema,
        lookupForeignFieldNames: [ 'supplierId' ],
    },
    isNullable: false
});