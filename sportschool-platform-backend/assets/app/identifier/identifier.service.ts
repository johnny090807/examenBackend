import {Injectable, EventEmitter, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Headers, Http, Response} from "@angular/http";
import {ActivatedRoute} from "@angular/router";

import {Identifier} from "./identifier.model";

import {ErrorService} from "../errors/error.service";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class IdentifierService implements OnInit{

    private identifiers: Identifier[] = [];
    identifierIsEdit = new EventEmitter<Identifier>();
    private sub: any;
    public userId: string;


    constructor(private authService:AuthService,
                private errorService: ErrorService,
                private http: Http,
                private route: ActivatedRoute){}

    ngOnInit(){
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                this.userId = params['userId'] || null;
            });
    }
    getAllIdentifiersById(userId: string){
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get(localStorage.Url + '/api/user/' + userId + '/identifiers' + token)
            .map((response:Response) => {
                // console.log(response.json())
                const identifiers = response.json();
                let transformedIdentifiers: Identifier[] = [];
                for(let identifier of identifiers){
                    transformedIdentifiers.push(new Identifier(
                        identifier.nfcId,
                        identifier.user,
                        identifier._id
                    ))
                }
                console.log(transformedIdentifiers);
                this.identifiers = transformedIdentifiers;
                return transformedIdentifiers;
            })
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }
    addUserIdentifier(identifier : Identifier){
        const body = JSON.stringify(identifier);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post(localStorage.Url + '/api/identifier/' + identifier.userId + token, body, {headers:headers})
            .map((response: Response) => {
                response.json();
                this.errorService.handleError(response.json());
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });

    }

    editIdentifier(identifier:Identifier){
        this.identifierIsEdit.emit(identifier);
    }

    patchIdentifier(identifier: Identifier){
        console.log(identifier.identifierId);
        const body = JSON.stringify(identifier);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.patch(localStorage.Url + '/api/identifier/' + identifier.identifierId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteIdentifier(identifier: Identifier){
        if(this.authService.isLoggedIn()){
            this.identifiers.splice(this.identifiers.indexOf(identifier), 1);
        }
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete(localStorage.Url + '/api/identifier/' + identifier.identifierId + token)
            .map((response: Response) => response.json())
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }
}

