import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';


import {AppSettings} from '../../config/app.settings';

@Component({
    selector: 'qadb-admin',
    templateUrl: AppSettings.COMPONENTS_DIR + '/app/app.html',
    directives: [ROUTER_DIRECTIVES]
})
export class AppComponent { 
    
    constructor() {
    }
}