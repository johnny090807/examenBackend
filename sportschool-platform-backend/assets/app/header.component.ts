import { Component } from "@angular/core";
import {AuthService} from "./auth/auth.service";
import {UserService} from "./user/user.service";

@Component({
    selector: 'app-header',
    template: `
        <header class="row">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-pills">
                    <li routerLinkActive="active"><a [routerLink]="['/auth']" (click)="this.userService.editIdentifier(false)">Log in</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/users']" (click)="this.userService.editIdentifier(false)">Gebruikers</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/identifiers']" (click)="this.userService.editIdentifier(false)">Alle Kaarten</a></li>
                </ul>
                <!--<ul class="nav nav-pills pull-right">-->
                    <!--<li routerLinkActive="active"><a [routerLink]="['/subscription']">Gebruikers</a></li>-->
                <!--</ul>-->
            </nav>
        </header>
    `
})
export class HeaderComponent {
    constructor(private userService:UserService){}

}