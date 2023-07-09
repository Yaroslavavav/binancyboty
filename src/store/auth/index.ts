import { action, observable, makeObservable, runInAction } from 'mobx';
// import api from '../../api_auth';
import jwtDecode from 'jwt-decode';

class AuthStore {
  token = '';

  user = null;

  constructor() {
    makeObservable(this, {
      token: observable,
      user: observable,
      login: action,
      logout: action,
    });
  }

  async login() {
    console.log('login');
  }
  async logout() {
    console.log('login');
  }
}

export default new AuthStore();
