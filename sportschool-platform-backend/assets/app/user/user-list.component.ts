import {Component, OnInit} from "@angular/core";
import {User} from "./user.model";
import {UserService} from "./user.service";
import {AuthService} from "../auth/auth.service";

@Component({
    selector: 'app-user-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <h4>Zoek hier een gebruiker</h4>
            <hr>
            <div class="form-group">
                <label for="firstName">Zoek op voornaam:</label>
                <input type="text" class="form-control" [(ngModel)]="term.firstName" placeholder="voornaam">
                <br>
                <label for="firstName">Zoek op achternaam:</label>
                <input type="text" class="form-control" [(ngModel)]="term.lastName" placeholder="achternaam">
            </div>
            <hr>
            <app-user
                    [user]="user"
                    *ngFor="let user of users| filterBy:term;">
            </app-user>
        </div>
    `
})
export class UserListComponent implements OnInit{
    users: User[];
    public term:any = {firstName : '', lastName: ''};
    constructor(private userService: UserService,
                private authService: AuthService){}

    ngOnInit(){
        if(this.authService.isLoggedIn()){
            this.userService.getUsers()
                .subscribe(
                    (users: User[])=>{
                        this.users = users;
                    }
                );
        }
    }
}