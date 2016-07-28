import {Component, OnInit} from '@angular/core'
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators, AbstractControl, NgForm} from '@angular/forms';

import {AppSettings} from '../../config/app.settings';
import {User} from "../../models/user.model";
import {ModelUtil} from "../../models/model.utils";
import {UsersService} from '../../services/users.service';

@Component({
    templateUrl: AppSettings.COMPONENTS_DIR + '/users/users.edit.html',
    directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    providers: [UsersService],
    selector: 'user-edit'
})

export class UserEditComponent implements OnInit {
    user:User;
    userForm:FormGroup;
    editMode:boolean = false;
    password: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private usersService:UsersService) {
        this.user = new User();
        this.userForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            organisation: new FormControl('', Validators.required),
            password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), this.validatePasswordStrength()])),
            passwordConfirm: new FormControl('', Validators.compose([Validators.required, this.validatePasswordMatch()]))
        });
    }

    validatePasswordMatch() {
        return (confirmInput:AbstractControl) => {
            return this.password === confirmInput.value ? null : {
                'passwordMismatch': true
            };
        }
    }

    validatePasswordStrength() {
        return (input:AbstractControl) => {
            // 1 capital letter, 1 number
            return /^(?=.*[A-Z])(?=.*[0-9]).*$/.test(input.value) ? null : {
                'passwordStrength': true
            };
        }
    }

    ngOnInit() {
        let id = this.route.snapshot.params['id'];
        if (id) {
            this.editMode = true;
            this.usersService.getUser(id)
                .then((user: User) => {
                    this.user = user;
                    ModelUtil.bindToForm(<FormGroup>this.userForm, this.user);
                }, () => {
                    alert('Unable to find the user!');
                    this.router.navigate(['/users']);
                });
        }
    }

    submit() {
        let user = new User(this.userForm.value);
        user._id = this.user._id;
        if (!this.editMode) {
            this.usersService.setNewUser(user)
                .then(() => {
                    this.router.navigate(['/users']);
                });
        }
        else {
            this.usersService.editUser(user)
                .then(() => {
                    this.router.navigate(['/users']);
                });
        }
    }
}