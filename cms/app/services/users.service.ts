import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, URLSearchParams} from '@angular/http';

import {User} from '../models/user.model';
import {Service} from './abstract.service'
import {AppSettings} from '../config/app.settings';

@Injectable()
export class UsersService extends Service {
    private usersEndpoint = AppSettings.API_URL + '/users';

    constructor(private http:Http) {
        super();
    }

    setNewUser(user:User):Promise<void> {
        let body = JSON.stringify(user);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.usersEndpoint, body, options)
            .toPromise()
            .then(() => {}) // no-op
            .catch(super.handleError);
    }

    editUser(user:User):Promise<void> {
        let body = JSON.stringify(user);
        let headers = new Headers({'Content-Type': 'application/json'});
        let params = new URLSearchParams();
        let options: RequestOptions;
        console.log(user);
        params.set('id', user._id);
        options = new RequestOptions({headers: headers, search: params});
        return this.http.put(this.usersEndpoint, body, options)
            .toPromise()
            .then(() => {}) // no-op
            .catch(super.handleError);
    }

    getUsers():Promise<User[]> {
        return this.http.get(this.usersEndpoint)
            .toPromise()
            .then(super.dataToModelArray(User))
            .catch(super.handleError);
    }

    getUser(id:string):Promise<User> {
        let params = new URLSearchParams();
        params.set('id', id);
        return this.http.get(this.usersEndpoint, { search: params })
            .toPromise()
            .then(super.dataToModel(User))
            .catch(super.handleError);
    }

    getLoggedInUser():Promise<User> {
        return this.http.get(this.usersEndpoint + '/current')
            .toPromise()
            .then(super.dataToModel(User))
            .catch(super.handleError);
    }

    logout():Promise<void> {
        return this.http.get(this.usersEndpoint + '/logout')
            .toPromise()
            .then(() => {})
            .catch(super.handleError);
    }

    deleteUser(id:string) {
        let params = new URLSearchParams();
        params.set('id', id);
        return this.http.delete(this.usersEndpoint, { search: params })
            .toPromise()
            .catch(super.handleError);
    }
}