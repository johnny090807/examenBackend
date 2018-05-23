import {Component, Input, OnInit} from "@angular/core";
import {IdentifierService} from "./identifier.service";
import {Identifier} from "./identifier.model";
import {AuthService} from "../auth/auth.service";

@Component({
    selector: 'app-identifier-all',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <h4>Druk op "pas aan" om een kaart aan te passen:</h4>
            <app-user-identifier></app-user-identifier>
            <hr>
            <h4>Zoek hier een naar een kaart:</h4>
            <input type="text" class="form-control" [(ngModel)]="term.nfcId" placeholder="NFCID">

            <app-identifier
                    [identifier]="identifier"
                    *ngFor="let identifier of identifiers| filterBy:term;">
            </app-identifier>
        </div>
    `
})
export class IdentifierAllComponent implements OnInit{
    public term:any = {nfcId: ''};
    @Input()identifiers: Identifier[];

    constructor(private identfierService: IdentifierService,
                private authService: AuthService){}

    ngOnInit(){
        if(this.authService.isLoggedIn()){
            this.identfierService.getAllIdentifiers()
                .subscribe(
                    (identifiers: Identifier[])=>{
                        this.identifiers = identifiers;
                    }
                );
        }

    }
}