import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface ClientConfig
  extends Pick<AxiosRequestConfig, 'baseURL' | 'paramsSerializer'> {
  handleError?: (error: AxiosError) => Promise<any>;
}

export const createHttpClient = ({ baseURL, handleError }: ClientConfig) => {
  const client = axios.create({
    baseURL,
  });

  client.interceptors.request.use(async (request) => {
    const token = localStorage.getItem('coolToken');

    if (token) {
      request.headers.Authorization = `${token}`;
    }

    if (!request.headers['Content-Type']) {
      request.headers['Content-Type'] = 'application/json';
    }

    request.headers.Accept = 'application/json';
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
