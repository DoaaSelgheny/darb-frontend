import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4202/host';
const guestUrl = 'http://localhost:4201';
export const OAUTH2_URL = `http://localhost:4202/account/oauth2-redirect`;
export const LOGIN_PAGE_URL = `http://localhost:4200/authUi/host/login?returnUrl=${OAUTH2_URL}`;
const oAuthConfig = {
  // issuer: 'https://localhost:44341/',
  issuer: 'https://localhost:44371/',
  redirectUri: baseUrl,
  clientId: 'Hyyak_Angular',
  // responseType: 'code',
  scope: 'offline_access Hyyak',
  requireHttps: true,
};

export const environment = {
  guestUrl,
  production: false,
  application: {
    baseUrl,
    name: 'Hyyak',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44371',
      rootNamespace: 'Hyyak',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
    remoteEnv: {
      url: '/getEnvConfig',
      mergeStrategy: 'deepmerge',
    },
  },
  googleMapsApiKey: 'AIzaSyBU9BgPd6aGdl2q8JaS1b61LlHcHeKv0vk',
} as Environment;
