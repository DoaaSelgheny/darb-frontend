import { Environment } from '@abp/ng.core';
import { AuthConfig } from 'angular-oauth2-oidc';

const baseUrl = 'http://localhost:4201';
const hostUrl = 'http://localhost:4202';
export const OAUTH2_URL = `http://localhost:4201/account/oauth2-redirect`;
export const LOGIN_PAGE_URL = `http://localhost:4200/auth/login?returnUrl=${OAUTH2_URL}`;
const oAuthConfig: AuthConfig = {
  issuer: 'https://localhost:44371/',
  redirectUri: baseUrl,
  clientId: 'Hyyak_Angular',
  // responseType: 'code',
  scope: 'offline_access Hyyak',
  requireHttps: false,
};

export const environment : Environment = {
  production: false,
  hostUrl,
  application: {
    baseUrl,
    name: 'Darb',
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
  remoteEnv:null
} as Environment;
