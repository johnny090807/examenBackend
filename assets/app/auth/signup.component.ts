import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "./auth.service";
import { Auth } from "./auth.model";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    myForm: FormGroup;

    constructor(private authService: AuthService) {}

    onSubmit() {
        const Auth = new Auth(
            this.myForm.value.userName,
            this.myForm.value.password,
        );
        this.authService.signup(Auth)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            userName: new FormControl(null),
            password: new FormControl(null)
        });
    }
}