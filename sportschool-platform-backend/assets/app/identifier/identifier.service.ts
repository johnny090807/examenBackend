import {Injectable, EventEmitter, Component} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";

import {ErrorService} from "../errors/error.service";
import {Identifier} from "./identifier.model";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class IdentifierService{

    private identifiers: Identifier[]=[];
    identifierIsEdit = new EventEmitter<Identifier>();

    constructor(private authService:AuthService,
                private errorService: ErrorService,
                private http: Http){}

    getAllIdentifiersById(userId: string){
        return this.http.get('http://localhost:3000/api/user/' + userId + '/identifiers')
            .map((response:Response) => {
                // console.log(response.json())
                const identifiers = response.json();
                let transformedIdentifiers: Identifier[] = [];
                for(let identifier of identifiers){
                    transformedIdentifiers.push(new Identifier(
                        identifier.nfcId,
                        identifier.userId,
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
        console.log(identifier);
        const body = JSON.stringify(identifier);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post('http://localhost:3000/api/identifier/' + identifier.userId + token, body, {headers:headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });

    }

    editIdentifier(identifier:Identifier){
        this.identifierIsEdit.emit(identifier);
    }
    patchIdentifier(identifier: Identifier){
        const body = JSON.stringify(identifier);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.patch('http://localhost:3000/api/user/' + identifier.identifierId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    deleteIdentifier(identifierId: string){
        console.log(identifierId);
    }
    removeIdentifierById(userId: string) {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete('http://localhost:3000/api/identifier/' + userId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }
}

