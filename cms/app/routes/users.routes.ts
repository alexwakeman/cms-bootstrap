import { RouterConfig } from '@angular/router';

import {UserListComponent} from '../components/users/users.list.component';
import {UserEditComponent} from '../components/users/users.edit.component';
import {UsersIndexComponent} from '../components/users/users.index.component';

export const UsersRoutes: RouterConfig = [
    {
        path: 'users',
        component: UsersIndexComponent,
        children: [
            {
                path: '',
                component: UserListComponent
            },
            {
                path: 'new',
                component: UserEditComponent
            },
            {
                path: 'edit/:id',
                component: UserEditComponent
            }
        ]
    }
];