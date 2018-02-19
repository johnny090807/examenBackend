import {Component, Input, OnInit} from "@angular/core";

import {NgForm} from "@angular/forms";
import {User} from "./user.model";
import {UserService} from "./user.service";
import {AuthService} from "../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-user-input',
    templateUrl: './user-input.component.html'
})
export class UserInputComponent implements  OnInit{
    @Input() users: User;
    @Input() term;
    constructor(private userService:UserService,
                private authService: AuthService,
                private route: Router){}

    onSubmit(form: NgForm){
        if(this.users){
            this.users.firstName = form.value.firstName;
            this.users.lastName = form.value.lastName;
            this.users.email = form.value.email;
            this.users.credit = form.value.credit * 100;
            this.userService.updateUser(this.users)
                .subscribe(
                    result => console.log(result)
                );
            this.users = null;
        }else{
            const user = new User(form.value.firstName, form.value.lastName, form.value.email, form.value.credit);
            this.userService.addUser(user)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
            form.resetForm();
        }
    }
    onClear (form: NgForm){
        form.resetForm();
    }
    ngOnInit(){
        this.userService.userIsEdit.subscribe(
            (user: User) => this.users = user
        );
    }
    logIn(){
        this.route.navigateByUrl('auth/signin');
    }
}