import { provideRouter, RouterConfig, ROUTER_DIRECTIVES } from '@angular/router';
import { UsersRoutes } from '../routes/users.routes';
import { HomeRoutes } from '../routes/home.routes';

export const routes: RouterConfig = [
    UsersRoutes,
    HomeRoutes
];

export const AppRouterProviders = [
    provideRouter(routes)
];