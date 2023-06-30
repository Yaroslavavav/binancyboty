import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface ClientConfig
  extends Pick<AxiosRequestConfig, 'baseURL' | 'paramsSerializer'> {
  handleError?: (error: AxiosError) => Promise<any>;
}

export const createHttpClient = ({
  baseURL,
  paramsSerializer,
  handleError,
}: ClientConfig) => {
  const client = axios.create({ baseURL, paramsSerializer });

  client.interceptors.request.use(async (request) => {
    request.headers ||= {};
    // request.headers.Authorization = await authStore.ensureToken();
    request.headers['x-client'] = 'monitor';
    request.headers['content-type'] = 'application/json';
    request.headers['accept'] = 'application/json';
    request.headers['Access-Control-Allow-Origin'] = '*';

    return request;
  });

  client.interceptors.response.use(undefined, async (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401: {
          //   const { default: authStore } = await import('../store/auth');

          //   return authStore.handleUnauthorizedError(error);
          return error;
        }
        case 403:
          console.error(error, 'TYT ERROR');
          break;
      }
    }

    if (handleError) {
      return handleError(error);
    }

    throw error;
  });

  return client;
};
