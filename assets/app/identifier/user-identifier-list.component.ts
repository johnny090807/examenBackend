import {Component, Input, OnInit} from "@angular/core";
import {Identifier} from "./identifier.model";
import {IdentifierService} from "./identifier.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {UserService} from "../user/user.service";

@Component({
    selector: 'app-user-identifier-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <h4>Zoek hier naar een kaart:</h4>
            <input type="text" class="form-control" [(ngModel)]="term.nfcId" placeholder="NFCID">

            <app-identifier
                    [identifier]="identifier"
                    *ngFor="let identifier of identifiers| filterBy:term;">
            </app-identifier>
        </div>
    `
})
export class UserIdentifierListComponent implements OnInit{
    public term:any = {nfcId: ''};
    identifiers: Identifier[];
    @Input() userId: string;
    // public term:any;

    constructor(private identifierService: IdentifierService,
                private route: ActivatedRoute,
                private authService: AuthService,
                private userService: UserService){}

    ngOnInit(){
        if(this.userService.editBool ===true) {
            this.route.params.subscribe(params => {
                this.userId = params['userId'];
            });
            this.identifierService.getAllIdentifiersById(this.userId)
                .subscribe(
                    (identifiers: Identifier[]) => {
                        this.identifiers = identifiers;
                    }
                );
        }
    }
}