import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Identifier} from "./identifier.model";
import {NgForm} from "@angular/forms";
import {User} from "../user/user.model";
import {IdentifierService} from "./identifier.service";

@Component({
    selector:'app-user-identifier',
    templateUrl:'./user-identifier.component.html'
})
export class UserIdentifierComponent implements OnInit{
    public userId: string;
    @Input() identifier:Identifier[];
    private sub: any;

    constructor(private router:Router,
                private route:ActivatedRoute,
                private identifierService: IdentifierService){}
    onSubmit(form:NgForm){
        if(this.identifier){
            this.identifier.nfcId = form.value.nfcId;
            this.identifierService.patchIdentifier(this.identifier)
                .subscribe(
                    result => console.log(result)
                );
            this.identifier = null;
        }else{
            const identifier = new Identifier(form.value.nfcId,this.userId);
            this.identifierService.addUserIdentifier(identifier)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
            form.resetForm();
        }

    }
    onCancel (){
        this.router.navigateByUrl('/users');
    }
    ngOnInit(){
        this.identifierService.identifierIsEdit.subscribe(
            (identifier: Identifier) => this.identifier = identifier
        );
        this.sub = this.route.params
            .subscribe(
                (params: Params) => {
                    this.userId = params['userId'];
                }
            )
    }
}