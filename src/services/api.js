import axios from 'axios';
import { baseApiUrl } from '@/utils/constant';
import { getCk, delCk } from '@/utils/cookies';

import parseJwt from '@/utils/parseJwt';

const controller = new AbortController();
const { signal } = controller;

// Axios default headers
axios.defaults.headers['Content-Type'] = 'application/json';

// Base API
const baseApi = axios.create({
  baseURL: baseApiUrl,
  signal,
});
baseApi.interceptors.request.use(
  (config) => {
    const configs = config;
    const CERT = getCk('CERT');
    const isExpired = CERT ? parseJwt(CERT).exp < Date.now() / 1000 : true;
    if (CERT || !isExpired) {
      configs.headers.Authorization = `Bearer ${CERT}`;
    } else {
      delCk('CERT');
      delete configs.headers.Authorization;
    }
    return configs;
  },
  (error) => {
    throw error;
  },
);
baseApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    switch (error.response.status) {
      case 401:
        delCk('CERT');
        window.location.reload();
        break;
      case 0:
        error.response.data = {
          code: 0,
          status: "ERR_INTERNET_DISCONNECTED",
          error: "Tidak dapat terhubung ke internet"
        }
        break;
      default:
        break;
    }
    throw error.response.data;
  },
);

export default {
  install: (app) => {
    const ctx = app;
    ctx.config.globalProperties.$api = baseApi;
    ctx.$api = baseApi;
  },
};

export { baseApi };
