import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {AppSettings} from '../../config/app.settings';

@Component({
    selector: 'home-list',
    templateUrl: AppSettings.COMPONENTS_DIR + '/home/home.list.html',
    directives: [ROUTER_DIRECTIVES]
})

export class HomeListComponent implements OnInit {

    newEntries: Array<any> = [];

    constructor() { }

    ngOnInit() { }

    deleteEntry(entry) {

    }

    submitEntry(entry) {

    }
}