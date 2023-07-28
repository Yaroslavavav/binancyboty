import queryString from 'query-string';

import { createHttpClient } from '../createHttpClient';
import { handleError } from '../handleError';

export const agents = createHttpClient({
  baseURL: 'https://cloudrunservice-rd2h3qv36q-lm.a.run.app',
  paramsSerializer(params: any) {
    return queryString.stringify(params, {
      arrayFormat: 'comma',
    });
  },
  handleError,
});
