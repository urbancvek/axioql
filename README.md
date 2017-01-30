# axioql
GraphQL client that uses axios under the hood.

## Installation
Use your usual package manager.
```
yarn add axioql
```

## Usage
```js
import axioql, { setQLEndpoint } from 'axioql';

// Set the endpoint that will be used for all your GraphQL requests
setQLEndpoint('https://graphql.server.com/graphql');

// Create a query
const someQuery = `query ($searchText: String!) {
  productSearch(title: $searchText) {
    id
    title
    brand
  }
}`;

// Add variables used by the query
const someVariables = {
  searchText: 'Milk',  
};

const yourAsyncMethod = async () => {
  try {
    // Fetch your data
    const response = await axioql({ query: someQuery, variables: someVariables });

    console.log(response.data.data);
  } catch (error) {
    console.error(error);
  }
};
```
