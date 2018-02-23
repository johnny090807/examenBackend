import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";
import { Auth } from "./auth.model";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent {
    myForm: FormGroup;

    constructor(private authService: AuthService, private router: Router){}

    onSubmit() {
        const auth = new Auth(this.myForm.value.userName, this.myForm.value.password);
        this.authService.signin(auth)
        .subscribe(
            data => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                this.router.navigateByUrl('/');
            },
            error => console.error(error)
        );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
                userName: new FormControl(null),
                password: new FormControl(null, Validators.required)
        });
    }
}