# data-sorcerer [WORK IN PROGRESS]
Query any data source using a common, fluent API

## Description
`data-sorcerer` provides a unified interface for accessing any data source. It allows you to build queries to data sources using a fluent API. Such queries can then be converted to data source-specific queries and then executed.

Because query operations and results have a unified interface, generic modules can be built on top of `data-sorcerer` to query any type of data source type and work with the results of such queries.

## How to install
`npm i data-sorcerer`

## How to use
```ts
import * as Sorcerer from 'data-sorcerer';

//Create references to data sources
const employees = new Sorcerer.FetchDataSource('/api/northwind/employees');
const products = new Sorcerer.FetchDataSource('/api/northwind/products');
const orders = new Sorcerer.FetchDataSource('/api/northwind/orders');

//Get products out of stock
const outOfStock = products
    .filter(product => product.unitsInStock == 0);

//Get employee full names from a city
const londonEmployees = employees
    .filter(employee => employee.city == 'London')
    .map(employee => employee.firstName + ' ' + employee.lastName);
// -> [ 'John Smith', 'Lara Croft', 'Henry Spencer' ]

//Get orders where a discount has been applied and select the product name
const discountOrders = orders
    .filter(order => order.details.any(detail => detail.discount > 0))
    .map(order => ({
        orderId: order.orderId,
        products: order.orderDetails
            .filter(detail => detail.discount > 0)
            .map(detail => ({
                name: detail.product.productName
                discount: detail.discount
            }))
    }));
/* ->
[
    {
        orderId: 1,
        products: [
            {
                name: 'Dishwasher',
                discount: 50
            }
        ]
    },
    {
        orderId: 4,
        products: [
            {
                name: 'Chair',
                discount: 1.25
            },
            {
                name: 'Desk',
                discount: 23.05
            }
        ]
    },
]
*/
```

## Lazy evaluation
All queries are lazy-evaluated meaning that the query is only sent for execution when the data source is converted to an array using `toArray()`, when the result of the operation is a value, or when the data source is iterated.

```ts
const londonEmployees = employees
    .filter(employee => employee.city == 'London')
    .map(employee => employee.firstName + ' ' + employee.lastName);
//londonEmployees is still a queryable data source, the query has not been sent for execution

const londonEmployeesResults = await londonEmployees.toArray(); //Results are loaded

const outOfStock = await products
    .filter(product => product.unitsInStock == 0)
    .any();
// -> true
```

## Expression trees
The TypeScript expressions in these queries have to be converted to expression trees before they can be analyzed. For that we use [ts-expressions](https://github.com/pedro-pedrosa/ts-expressions). If you are making use of TypeScript expressions, you must compile `data-sorcerer` using the `ts-expressions` transformer. For more details please visit the `ts-expressions` page.