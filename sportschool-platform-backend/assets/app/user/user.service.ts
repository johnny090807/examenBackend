import {Headers, Http, Response} from "@angular/http";
import {EventEmitter, Injectable} from "@angular/core";

import {User} from "./user.model";
import {ErrorService} from "../errors/error.service";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../auth/auth.service";
import {Identifier} from "../identifier/identifier.model";
import {IdentifierService} from "../identifier/identifier.service";
import {Res} from "awesome-typescript-loader/dist/checker/protocol";

@Injectable()
export class UserService {
    private users: User[] = [];
    userIsEdit = new EventEmitter<User>();

    constructor(private authService:AuthService,
                private errorService: ErrorService,
                private http: Http,
                private identifierService: IdentifierService){}

    addUser(user: User) {
        const userId = localStorage.userId
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post(localStorage.Url + '/api/user'+ token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const user = new User(
                    result.obj.firstName,
                    result.obj.lastName,
                    result.obj.email,
                    result.obj.credit,
                    result.obj._id);
                this.users.unshift(user);
                return user;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }
    getUsers(){
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get(localStorage.Url + '/api/user' + token)
            .map((response:Response) => {
                const users = response.json().obj;
                let transformedUsers: User[] = [];
                for(let user of users){
                    transformedUsers.unshift(new User(
                        user.firstName,
                        user.lastName,
                        user.email,
                        user.credit,
                        user._id)
                    );
                }
                console.log(users);
                this.users = transformedUsers;
                return transformedUsers;
            })
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }

    editUser(user:User){
        this.userIsEdit.emit(user);
    }

    updateUser(user:User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.patch(localStorage.Url + '/api/user/' + user.userId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteUser(user:User) {
        if(this.authService.isLoggedIn()){
            this.users.splice(this.users.indexOf(user), 1);
        }
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete(localStorage.Url + '/api/user/' + user.userId + token)
            .map((response: Response) => response.json())
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }

}