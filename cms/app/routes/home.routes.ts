import { RouterConfig } from '@angular/router';
import { HomeIndexComponent } from '../components/home/home.index.component';
import { HomeListComponent } from '../components/home/home.list.component';

export const HomeRoutes: RouterConfig = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeIndexComponent,
        children: [
            {
                path: '',
                component: HomeListComponent
            }
        ]
    }
];