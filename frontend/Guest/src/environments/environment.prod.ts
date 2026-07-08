import { Environment } from '@abp/ng.core';

const baseUrl = 'https://dev-hyyak-ehgja0c6bucpftd0.eastus-01.azurewebsites.net';
const hostUrl = 'https://dev-hyyak-host-f9c3atejc8a9ezba.eastus-01.azurewebsites.net';
export const OAUTH2_URL = `https://dev-hyyak-ehgja0c6bucpftd0.eastus-01.azurewebsites.net/account/oauth2-redirect`;
export const LOGIN_PAGE_URL = `https://dev-hyyak-auth-dtdnbygscrgqbddj.eastus-01.azurewebsites.net/auth/login?returnUrl=${OAUTH2_URL}`;

const oAuthConfig = {
  issuer: 'https://dev-api-hyyak-gwetdgeyada4hkgt.eastus-01.azurewebsites.net/',
  redirectUri: baseUrl,
  clientId: 'Hyyak_Angular',
  // responseType: 'code',
  scope: 'offline_access Hyyak',
  requireHttps: true,
};

export const environment = {
  production: true,
  hostUrl,
  application: {
    baseUrl,
    name: 'Darb',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://dev-api-hyyak-gwetdgeyada4hkgt.eastus-01.azurewebsites.net',
      rootNamespace: 'Hyyak',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
  // remoteEnv: {
  //   url: '/getEnvConfig',
  //   mergeStrategy: 'deepmerge'
  // }
} as Environment;
