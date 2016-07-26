import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {AppSettings} from '../../config/app.settings';
import {User} from "./user.model";

@Component({
    templateUrl: AppSettings.COMPONENTS_DIR + '/users/user-edit.html',
    directives: [ROUTER_DIRECTIVES]
})

export class UserEditComponent implements OnInit {

    user: User = new User();
    passwordConfirm: string = '';

    constructor() {

    }

    ngOnInit() { }

    submit() {

    }
}