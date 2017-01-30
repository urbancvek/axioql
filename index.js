const axios = require('axios');
const assert = require('assert');

const { modifyQuery } = require('./lib/queryModifier');

let ENDPOINT = null;

const setQLEndpoint = (endpoint) => ENDPOINT = endpoint;

const axioql = async ({ query, variables } = { query: null, variables: null }) => {
  assert(query, 'Query is required!');
  assert(ENDPOINT, 'Endpoint is required. Use setQLEndpoint(endpoint: string) method.');

  const modifiedQuery = modifyQuery(query);
  const stringifiedVariables = JSON.stringify(variables);

  try {
    const response = await axios.post(ENDPOINT, {
      query: modifiedQuery,
      variables: stringifiedVariables,
    });

    return response;
  } catch (error) {
    return error;
  }
};

module.exports = { setQLEndpoint };
module.exports.default = axioql;
