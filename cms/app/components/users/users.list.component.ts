import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AppSettings} from '../../config/app.settings';
import {User} from "../../models/user.model";
import {UsersService} from '../../services/users.service';

@Component({
    templateUrl: AppSettings.COMPONENTS_DIR + '/users/users.list.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UsersService],
    selector: 'user-listing'
})

export class UserListComponent implements OnInit {

    public users: Array<User>;

    constructor(private usersService: UsersService) { }

    ngOnInit() {
        this.usersService.getUsers()
            .then((users) => {
                this.users = users
            });
    }

    deleteUser(id: string) {
        if (window.confirm('Are you sure you want to delete this user?')) {
            Promise.resolve(this.usersService.deleteUser(id))
                .then(() => {})
                .then(() => this.usersService.getUsers())
                .then((users) => this.users = users);
        }
    }
}