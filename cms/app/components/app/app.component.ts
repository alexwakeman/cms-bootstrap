import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import {AppSettings} from '../../config/app.settings';
import {User} from "../../models/user.model";
import {UsersService} from '../../services/users.service';

@Component({
    selector: 'qadb-admin',
    templateUrl: AppSettings.COMPONENTS_DIR + '/app/app.index.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UsersService]
})
export class AppComponent {
    user:User = new User();

    constructor(private usersService:UsersService) {
        this.usersService.getLoggedInUser()
            .then((user: User) => {
                this.user = user;
            }, () => {
                // not logged in
                console.warn('No current user found! PLease create a user profile and log in.')
            });
    }

    logout() {
        this.usersService.logout()
            .then(() => {
                window.location.href = '/login';
            });
    }
}