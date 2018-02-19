import {Component, OnInit} from "@angular/core";
import {Identifier} from "./identifier.model";
import {IdentifierService} from "./identifier.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {User} from "../user/user.model";

@Component({
    selector: 'app-user-identifier-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-identifier
                    [identifier]="identifier"
                    *ngFor="let identifier of identifiers">
            </app-identifier>
        </div>
    `
})
export class UserIdentifierListComponent implements OnInit{
    identifiers: Identifier[];
    public userId: string;
    // public term:any;

    constructor(private identifierService: IdentifierService,
                private route: ActivatedRoute,
                private authService: AuthService){}

    ngOnInit(){
        this.route.params.subscribe(params=>{
            this.userId = params['userId'];
        });
        if(this.authService.isLoggedIn()) {
            this.identifierService.getAllIdentifiersById(this.userId)
                .subscribe(
                    (identifiers: Identifier[])=>{
                        this.identifiers = identifiers;
                    }
                );

        }
    }

}