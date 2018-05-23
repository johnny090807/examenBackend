import {Component} from "@angular/core";

@Component({
    selector: 'app-users',
    template: `
        <div class="row" id="left">
            <app-user-input></app-user-input>
                <app-user-identifier></app-user-identifier>
            <hr>
                <app-user-identifier-list></app-user-identifier-list>
        </div>
        <div class="row" id="right">
            <app-user-list></app-user-list>
        </div>
    `,
    styles: [`        
	   #left {left: 0; top: 0; width: 50%; }
	   #right { position: absolute; margin-right: 20px;right: 0; top: 130px; width: 50%;}
        @media screen and (min-width: 992px){
            #right{
                margin-right: 10%;
                width:50%;
            }
        }
       @media screen and (max-width: 991px){
           #right{
               width: 40%;
               margin-right: 100px;
           }
       }
    
    `]
})

export class UsersComponent{}