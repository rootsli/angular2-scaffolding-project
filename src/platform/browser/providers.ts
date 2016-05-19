/*
 * These are globally available services in any component or any other service
 */
import {provide} from 'angular2/core';

// Angular 2
import {FORM_PROVIDERS} from 'angular2/common';
import {LocationStrategy, HashLocationStrategy} from 'angular2/platform/common';

// Angular 2 Http
// import {HTTP_PROVIDERS} from 'angular2/http';
import {HTTP_PROVIDERS, Http, XHRBackend, RequestOptions} from 'angular2/http';
// Angular 2 Router
import {ROUTER_PROVIDERS, Router} from 'angular2/router';

//App Providers
import {HttpInterceptor} from '../../services/http-interceptor.service'
import {CommonValidationService} from '../../services/common-validation.service';
import {ApiHostService} from '../../services/api-host.service';
import {NdMd5Service} from '../../services/nd-md5.service';
import {CacheService} from '../../services/cache.service';

/*
 * Application Providers/Directives/Pipes
 * providers/directives/pipes that only live in our browser environment
 */
export const APPLICATION_PROVIDERS = [
  ...FORM_PROVIDERS,
  ...HTTP_PROVIDERS,
  ...ROUTER_PROVIDERS,
  ...[CommonValidationService, ApiHostService, NdMd5Service, CacheService],
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  provide(Http, {
    useFactory: (backend:XHRBackend, defaultOptions:RequestOptions, router:Router) => {
      return new HttpInterceptor(backend, defaultOptions, router)
    },
    deps: [XHRBackend, RequestOptions, Router]
  })
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
