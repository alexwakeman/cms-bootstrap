/// <reference path="../../typings/index.d.ts" />

import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './components/app/app.component';
import { AppRouterProviders } from './routes/app.routes'

bootstrap(AppComponent, [
    AppRouterProviders
])
.catch(err => console.error(err));
