import { Environment } from '@abp/ng.core';
export const GUEST_URL = 'http://localhost:4201';

export const LOGIN_PAGE_URL = 'http://localhost:4200/authUi/auth/login';
const baseUrl = 'http://localhost:4200';
const hostUrl = 'http://localhost:4202';
const oAuthConfig = {
  issuer: 'https://localhost:44371/',
  redirectUri: baseUrl,
  clientId: 'Hyyak_Angular',
  // responseType: 'code',
  scope: 'offline_access Hyyak',
  requireHttps: false,
};

export const environment = {
  production: false,
  hostUrl,
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
  },
} as Environment;
