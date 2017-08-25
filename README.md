# axioql
GraphQL client that uses axios under the hood.

## Installation
Use your usual package manager.
```
yarn add axioql
```

## Usage
```js
import AxioQL from 'axioql';

// Set the endpoint that will be used for all your GraphQL requests
AxioQL.setQLEndpoint('https://graphql.server.com/graphql');

// If you have to authenticate use this method to set the header
AxioQL.setAuthHeader('Bearer #sometoken#');

// If you wish to add fields to the HTTP header use this method
AxioQL.setExtraHeader('someHeaderFieldName', 'some value');


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
    const response = await AxioQL.request({ query: someQuery, variables: someVariables });

    console.log(response.data.data);
  } catch (error) {
    console.error(error);
  }
};
```
