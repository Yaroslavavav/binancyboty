import queryString from 'query-string';

import { createHttpClient } from '../createHttpClient';
import { handleError } from '../handleError';

export const auth = createHttpClient({
  baseURL: 'https://cloudrunservice-rd2h3qv36q-lm.a.run.app:5001',
  paramsSerializer(params: any) {
    return queryString.stringify(params, {
      arrayFormat: 'comma',
    });
  },
  handleError,
});
