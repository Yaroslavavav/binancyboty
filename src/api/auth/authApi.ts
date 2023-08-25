import type { AxiosResponse } from 'axios';

import { auth } from './authHttpClient';

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
      const response = await auth.patch('/signup', { ...params });
      return response || [];
    } catch (error) {
      console.error(error);
    }
  }
  async login() {
    try {
      const response = await auth.get('/agent');
      return response || [];
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
