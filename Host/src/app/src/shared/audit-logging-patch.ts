import { InjectionToken, inject, APP_INITIALIZER } from '@angular/core';
import { ConfigStateService, featuresFactory, noop } from '@abp/ng.core';
import { RoutesService } from '@abp/ng.core';
import { setModuleVisibilityFactory } from '@volo/abp.commercial.ng.ui/config';

const AUDIT_LOGGING_FEATURES_PATCH = new InjectionToken('AUDIT_LOGGING_FEATURES_PATCH', {
  providedIn: 'root',
  factory: () => {
    const configState = inject(ConfigStateService);
    const featureKey = 'AuditLogging.Enable';
    const mapFn = features => {
      const val = features[featureKey];
      return {
        enable: (val ?? '').toString().toLowerCase() !== 'false',
      };
    };
    return featuresFactory(configState, [featureKey], mapFn);
  },
});

const SET_AUDIT_LOGGING_ROUTE_VISIBILITY_PATCH = new InjectionToken('SET_AUDIT_LOGGING_ROUTE_VISIBILITY_PATCH', {
  providedIn: 'root',
  factory: () => {
    const routes = inject(RoutesService);
    const stream = inject(AUDIT_LOGGING_FEATURES_PATCH);
    setModuleVisibilityFactory(stream, routes, "AbpAuditLogging::Menu:AuditLogging").subscribe();
  },
});

export const AUDIT_LOGGING_FEATURES_PROVIDERS_PATCH = [
  {
    provide: APP_INITIALIZER,
    useFactory: noop,
    deps: [SET_AUDIT_LOGGING_ROUTE_VISIBILITY_PATCH],
    multi: true,
  },
];
