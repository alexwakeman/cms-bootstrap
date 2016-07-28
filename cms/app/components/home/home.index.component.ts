import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AppSettings} from '../../config/app.settings';

@Component({
    directives: [ROUTER_DIRECTIVES],
    templateUrl: AppSettings.COMPONENTS_DIR + '/home/home.index.html'
})

export class HomeIndexComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}