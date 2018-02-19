import {Component} from "@angular/core";

@Component({
    selector: 'app-identifiers',
    template: `
        <div class="row">
        <app-user-identifier></app-user-identifier>
        </div>        
        <hr>
        <div class="row">
            <app-user-identifier-list></app-user-identifier-list>
        </div>
    `
})

export class IdentifiersComponent{

}