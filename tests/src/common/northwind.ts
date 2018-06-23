import * as s from '../../../lib/schema';

const shipper: s.SchemaNodeComplex = {
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
const region: s.SchemaNodeComplex = {
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
const category: s.SchemaNodeComplex = {
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
const supplier: s.SchemaNodeComplex = {
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
const customerDemographics: s.SchemaNodeComplex = {
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
const customer: s.SchemaNodeComplex = {
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
const territory: s.SchemaNodeComplex = {
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
                lookupSchema: region,
                foreignFieldNames: [ 'regionId' ],
            },
            isNullable: false,
        },
    ],
    key: [ 'shipperId' ]
};
const product: s.SchemaNodeComplex = {
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
                lookupSchema: supplier,
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
                lookupSchema: category,
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
    key: [ 'shipperId' ]
};
const customerCustomerDemographics: s.SchemaNodeComplex = {
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
const employee: s.SchemaNodeComplex = {
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
            isNullable: false,
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
const order: s.SchemaNodeComplex = {
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
                lookupSchema: customer,
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
                lookupSchema: employee,
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
                lookupSchema: shipper,
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
const employeeTerritory: s.SchemaNodeComplex = {
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
const orderDetail: s.SchemaNodeComplex = {
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
                lookupSchema: order,
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
                lookupSchema: product,
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
    key: [ 'employeeId', 'territoryId' ]
};

employee.fields.push({
    name: 'reportsTo',
    title: 'Reports to',
    schema: {
        kind: s.SchemaNodeKind.lookupBelongs,
        lookupSchema: employee,
        foreignFieldNames: [ 'reportsToId' ],
    },
    isNullable: false,
});
employee.fields.push({
    name: 'orders',
    title: 'Orders',
    schema: {
        kind: s.SchemaNodeKind.lookupContains,
        lookupSchema: order,
        lookupForeignFieldNames: [ 'employeeId' ],
    },
    isNullable: false
});
employee.fields.push({
    name: 'territories',
    title: 'Territories',
    schema: {
        kind: s.SchemaNodeKind.lookupHasMany,
        lookupSchema: territory,
        relationshipSchema: employeeTerritory,
        thisFieldNames: [ 'employeeId' ],
        lookupFieldNames: [ 'territoryId' ],
    },
    isNullable: false
});
shipper.fields.push({
    name: 'orders',
    title: 'Orders',
    schema: {
        kind: s.SchemaNodeKind.lookupContains,
        lookupSchema: order,
        lookupForeignFieldNames: [ 'shipperId' ],
    },
    isNullable: false
});
territory.fields.push({
    name: 'employees',
    title: 'Employees',
    schema: {
        kind: s.SchemaNodeKind.lookupHasMany,
        lookupSchema: employee,
        relationshipSchema: employeeTerritory,
        thisFieldNames: [ 'territoryId' ],
        lookupFieldNames: [ 'employeeId' ],
    },
    isNullable: false
});
order.fields.push({
    name: 'orderDetails',
    title: 'Order Details',
    schema: {
        kind: s.SchemaNodeKind.lookupContains,
        lookupSchema: orderDetail,
        lookupForeignFieldNames: [ 'orderId' ],
    },
    isNullable: false
});
customer.fields.push({
    name: 'orders',
    title: 'Orders',
    schema: {
        kind: s.SchemaNodeKind.lookupContains,
        lookupSchema: order,
        lookupForeignFieldNames: [ 'customerId' ],
    },
    isNullable: false
});
customer.fields.push({
    name: 'demographics',
    title: 'Demographics',
    schema: {
        kind: s.SchemaNodeKind.lookupHasMany,
        lookupSchema: customerDemographics,
        relationshipSchema: customerCustomerDemographics,
        thisFieldNames: [ 'customerId' ],
        lookupFieldNames: [ 'customerTypeId' ],
    },
    isNullable: false
});
region.fields.push({
    name: 'territories',
    title: 'Territories',
    schema: {
        kind: s.SchemaNodeKind.lookupContains,
        lookupSchema: territory,
        lookupForeignFieldNames: [ 'regionId' ],
    },
    isNullable: false
});
category.fields.push({
    name: 'products',
    title: 'Products',
    schema: {
        kind: s.SchemaNodeKind.lookupContains,
        lookupSchema: product,
        lookupForeignFieldNames: [ 'categoryId' ],
    },
    isNullable: false
});
customerDemographics.fields.push({
    name: 'customers',
    title: 'Customers',
    schema: {
        kind: s.SchemaNodeKind.lookupHasMany,
        lookupSchema: customer,
        relationshipSchema: customerCustomerDemographics,
        thisFieldNames: [ 'customerTypeId' ],
        lookupFieldNames: [ 'customerId' ],
    },
    isNullable: false
});
supplier.fields.push({
    name: 'products',
    title: 'Products',
    schema: {
        kind: s.SchemaNodeKind.lookupContains,
        lookupSchema: product,
        lookupForeignFieldNames: [ 'supplierId' ],
    },
    isNullable: false
});