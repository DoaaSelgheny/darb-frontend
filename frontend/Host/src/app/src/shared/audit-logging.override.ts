import { InjectionToken, inject, APP_INITIALIZER } from '@angular/core';
import { ConfigStateService, featuresFactory, noop } from '@abp/ng.core';
import { RoutesService } from '@abp/ng.core';
import { setModuleVisibilityFactory } from '@volo/abp.commercial.ng.ui/config';

// override نفس التوكين الأصلي
export const AUDIT_LOGGING_FEATURES = new InjectionToken('AUDIT_LOGGING_FEATURES', {
  providedIn: 'root',
  factory: () => {
    const configState = inject(ConfigStateService);
    const featureKey = 'AuditLogging.Enable';
    const mapFn = features => {
      const val = features?.[featureKey];
      return {
        enable: (val ?? '').toString().toLowerCase() !== 'false',
      };
    };
    return featuresFactory(configState, [featureKey], mapFn);
  },
});

export const SET_AUDIT_LOGGING_ROUTE_VISIBILITY = new InjectionToken('SET_AUDIT_LOGGING_ROUTE_VISIBILITY', {
  providedIn: 'root',
  factory: () => {
    const routes = inject(RoutesService);
    const stream = inject(AUDIT_LOGGING_FEATURES);
    setModuleVisibilityFactory(stream, routes, "AbpAuditLogging::Menu:AuditLogging").subscribe();
  },
});

export const AUDIT_LOGGING_FEATURES_PROVIDERS_OVERRIDE = [
  {
    provide: APP_INITIALIZER,
    useFactory: noop,
    deps: [SET_AUDIT_LOGGING_ROUTE_VISIBILITY],
    multi: true,
  },
];
