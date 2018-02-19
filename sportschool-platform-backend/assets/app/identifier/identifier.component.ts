import {Component, Input} from "@angular/core";
import {Identifier} from "./identifier.model";
import {IdentifierService} from "./identifier.service";

@Component({
    selector:'app-identifier',
    templateUrl:'identifier.component.html'
})

export class IdentifierComponent {
    @Input() identifier: Identifier;


    constructor(private identifierService: IdentifierService){}

    onEdit(){
        this.identifierService.editIdentifier(this.identifier);
    }
    onDelete(){

        var myConfirm = confirm('Wilt u "' + this.identifier.nfcId + '" echt verwijderen?');
        if (myConfirm === false) return;
        this.identifierService.deleteIdentifier(this.identifier)
            .subscribe(
                result => console.log(result)
            );
    }
}