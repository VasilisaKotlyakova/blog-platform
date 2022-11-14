/* eslint-disable */
import axios from 'axios';
import { setItem } from './storage';

export const httpStatusCode = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_EMAIL_OR_PASSWORD: 'INVALID_EMAIL_OR_PASSWORD',
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN: 'UNKNOWN'
};

export class httpStatus extends Error {
  constructor(code) {
    super(code);
    this.code = code;
    this.name = 'httpStatus';
  }
}

export default class Api {
  constructor(baseUrl = Api.baseUrl) {
    this.api = axios.create({
      baseURL: baseUrl,
    });
    this._bindErrMiddleware();
  }

  _errMiddleware(e) {
    if (e.response.status === 0) {
      throw new httpStatus(httpStatusCode.NETWORK_ERROR);
    }
    if (e.response.status === 401) {
      throw new httpStatus(httpStatusCode.UNAUTHORIZED);
    }
    if (e.response.data.errors) {
      const { errors } = e.response.data;
      if ('email or password' in errors) {
        throw new httpStatus(httpStatusCode.INVALID_EMAIL_OR_PASSWORD);
      }
    }
    throw new httpStatus(httpStatusCode.UNKNOWN);
  }

  _bindErrMiddleware() {
    this._unbindErrMiddleware();
    this._errMiddlewareId = this.api.interceptors.response.use(null, this._errMiddleware);
  }

  _unbindErrMiddleware() {
    if (typeof this._errMiddlewareId !== 'number') return;
    this.api.interceptors.response.eject(this._errMiddlewareId);
    this._errMiddlewareId = null;
  }

  async signIn(user) {
    const response = await this.api.post('/users/login', { user });
    this.setAccessToken(response.data.user.token);
    this.setHeader(response.data.user.token);
    return response.data;
  }

  async signUp(user) {
    const response = await this.api.post('/users', { user });
    this.setAccessToken(response.data.user.token);
    this.setHeader(response.data.user.token);
    return response.data;
  }

  async fetchProfile() {
    this._unbindErrMiddleware();
    try {
      const user = await this.api.get('/user');
      const profile = await this.api.get(`/profiles/${user.data.user.username}`);
      return { user: { ...user.data.user, ...profile.data.profile } };
    } catch (e) {
      return { user: null };
    } finally {
      this._bindErrMiddleware();
    }
  }

  async editProfile(newUser) {
    const user = await this.api.put('/user', { user: newUser });
    const profile = await this.api.get(`/profiles/${user.data.user.username}`);
    return { user: { ...user.data.user, ...profile.data.profile }, status: user.status };
  }

  async fetchArticles(offset, limit) {
    const response = await this.api.get('/articles', { params: { offset, limit } });
    return response.data;
  }

  async fetchArticle(slug) {
    const response = await this.api.get(`/articles/${slug}`);
    return response.data;
  }

  async createArticle(article) {
    const response = await this.api.post('/articles', { article });
    return response.data;
  }

  async updateArticle(article) {
    const response = await this.api.put(`/articles/${article.slug}`, { article });
    return response.data;
  }

  async favorite(article) {
    const response = await this.api.post(`/articles/${article.slug}/favorite`);
    return response.data;
  }

  async unvaforite(article) {
    const response = await this.api.delete(`/articles/${article.slug}/favorite`);
    return response.data;
  }

  async deleteArticle(article) {
    const response = await this.api.delete(`/articles/${article.slug}`);
    return response.data;
  }

  setToken(token) {
    this.api.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
  }

  setAccessToken(authToken) {
    setItem('authTokenKey', authToken);
  }

  setHeader(authToken) {
    this.api.defaults.headers.common['Authorization'] = authToken ? `Bearer ${authToken}` : null;
  }
}
Api.baseUrl = 'https://blog.kata.academy/api';

export const apiConnect = new Api();
