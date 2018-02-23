import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Auth } from "./auth.model";
import {ErrorService} from "../errors/error.service";

@Injectable()
export class AuthService{
	constructor(private http: Http,
				private errorService: ErrorService){}

	signup(Auth: Auth){
		const body = JSON.stringify(Auth);
		const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
		return this.http.post(localStorage.Url + '/api/auth' + token, body, {headers: headers})
		.map((response: Response) => response.json())
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });

	}
    signin(Auth: Auth){
        const body = JSON.stringify(Auth);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post( localStorage.Url +'/api/auth/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });

    }
    logout(){
	    localStorage.removeItem('token');
	    localStorage.removeItem('userId');
    }
    isLoggedIn(){
	    return localStorage.getItem('token') !== null;
    }
}