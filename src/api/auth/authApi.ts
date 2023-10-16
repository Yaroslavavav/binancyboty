import type { AxiosResponse } from 'axios';

import { auth } from './authHttpClient';
import { agents } from '../agents/agentsHttpClient';

type RegistrationData = {
  userName?: string;
  password?: string;
  binanceApiKey?: string;
  binanceApiSecret?: string;
  rememberMe?: string;
};

class AuthApi {
  async registration(params: RegistrationData) {
    try {
      const response = await auth.post('/auth/signup', { ...params });

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async login(params: any) {
    try {
      const response = await auth.post('/auth/signin', { ...params });

      if (response) {
        const token = response.data;

        localStorage.setItem('coolToken', token);

        agents.interceptors.request.use(
          (request) => {
            const token = localStorage.getItem('accessToken');

            if (token) {
              request.headers.Authorization = `Bearer ${token}`;
            }

            if (!request.headers['Content-Type']) {
              request.headers['Content-Type'] = 'application/json';
            }

            return request;
          },
          (error) => Promise.reject(error)
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async logout() {
    try {
      const response = await auth.get('/agent');
      return response || [];
    } catch (error) {
      console.error(error);
    }
  }
}

export const authApi = new AuthApi();
