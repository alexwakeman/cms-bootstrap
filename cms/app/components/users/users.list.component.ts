import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AppSettings} from '../../config/app.settings';
import {User} from "./user.model";

@Component({
    templateUrl: AppSettings.COMPONENTS_DIR + '/users/user-list.html',
    directives: [ROUTER_DIRECTIVES]
})

export class UserListComponent implements OnInit {

    constructor() { }

    ngOnInit() { }

    deleteUser(user: User) {

    }
}