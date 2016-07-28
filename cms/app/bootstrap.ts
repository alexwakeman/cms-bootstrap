/// <reference path="../../typings/index.d.ts" />

import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './components/app/app.component';
import { AppRouterProviders } from './routes/app.routes';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { XHRBackend } from '@angular/http';
import './config/rxjs.operators';

bootstrap(AppComponent, [
    AppRouterProviders,
    disableDeprecatedForms(),
    provideForms(),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    HTTP_PROVIDERS,
    XHRBackend
])
.catch(err => console.error(err));
