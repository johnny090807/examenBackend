import {Component, Input} from "@angular/core";

import {User} from "./user.model";
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styles:[`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
    `]
})

export class UserComponent{
    @Input() user: User;
    constructor(private userService: UserService,
                private router: Router){}


    onEdit(){
        $(function() {
            $('article').scrollTop(0);
        });
        this.userService.editUser(this.user);
    }
    onDelete(){

        var myConfirm = confirm('Wilt u "' + this.user.firstName + ' ' + this.user.lastName + '" echt verwijderen?');
        if (myConfirm === false) return;
        this.userService.deleteUser(this.user)
            .subscribe(
                result => console.log(result)
            );
    }
    onAddIdentifier(user: User){
        this.router.navigateByUrl('/identifier/' + user.userId);
    }
}