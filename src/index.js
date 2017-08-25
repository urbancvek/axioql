// @flow
import axios from 'axios';

import { modifyQuery } from './queryModifier';

type Request = {
  query: ?string,
  variables: ?Object,
};

class AxioQL {
  endpoint: ?string;
  authHeader: ?string;

  setQLEndpoint(endpoint: string) {
    this.endpoint = endpoint;
  }

  setAuthHeader(header: string) {
    this.authHeader = header;
  }

  setExtraHeader(headerName: string, value: string) {
    // Create extraHeaders property if it doens't exist
    if (!this.extraHeaders) {
      this.extraHeaders = {};
    }
    this.extraHeaders[headerName] = value;
  }

  async request({ query, variables }: Request = { query: null, variables: null }) {
    if (!query) throw new Error('Query is required!');
    if (!this.endpoint) throw new Error('Endpoint is required. Use AxioQL.setQLEndpoint(endpoint: string) method.');

    const modifiedQuery = modifyQuery(query);
    const stringifiedVariables = JSON.stringify(variables);

    try {
      const response = await axios.post(
        this.endpoint,
        { query: modifiedQuery, variables: stringifiedVariables },
        this.authHeader ? { headers: { ...this.extraHeaders, Authorization: this.authHeader } } : {},
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new AxioQL();
