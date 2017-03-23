import axios from 'axios';

const { modifyQuery } = require('./lib/queryModifier');

type Request = {
  query: string,
  variables: Object,
};

class AxioQL {
  setQLEndpoint(endpoint: string) {
    this.endpoint = endpoint;
  }

  setAuthHeader(header: string) {
    this.authHeader = header;
  }

  request({ query, variables }: Request = { query: null, variables: null }) {
    if (!query) throw new Error('Query is required!');
    if (!this.endpoint) throw new Error('Endpoint is required. Use AxioQL.setQLEndpoint(endpoint: string) method.');

    const modifiedQuery = modifyQuery(query);
    const stringifiedVariables = JSON.stringify(variables);

    try {
      const response = await axios.post(ENDPOINT, {
        query: modifiedQuery,
        variables: stringifiedVariables,
        headers: {
          Authorization: this.authHeader,
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new AxioQL();
