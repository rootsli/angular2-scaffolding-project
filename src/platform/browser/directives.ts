/*
 * These are globally available directives in any template
 */

import {provide, PLATFORM_DIRECTIVES} from 'angular2/core';

// Angular 2 Router
import {ROUTER_DIRECTIVES} from 'angular2/router';

//App directives
import {ControlMessages} from '../../components/control-messages.component';

// application_directives: directives that are global through out the application
export const APPLICATION_DIRECTIVES = [
  ...ROUTER_DIRECTIVES,
  ...[ControlMessages]
];

export const DIRECTIVES = [
  provide(PLATFORM_DIRECTIVES, { multi: true, useValue: APPLICATION_DIRECTIVES })
];
