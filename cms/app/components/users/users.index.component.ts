import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {AppSettings} from '../../config/app.settings';

@Component({
    templateUrl: AppSettings.COMPONENTS_DIR + '/users/users.index.html',
    directives: [ROUTER_DIRECTIVES]
})

export class UsersIndexComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}