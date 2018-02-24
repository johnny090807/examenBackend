import { Routes, RouterModule } from "@angular/router";

import { AuthenticationComponent } from "./auth/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.routes";
import {UsersComponent} from "./user/users.component";
import {IdentifiersComponent} from "./identifier/identifiers.component";
import {IdentifierAllComponent} from "./identifier/Identifier-all.component";


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'users', component: UsersComponent },
    { path: 'identifiers', component: IdentifierAllComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
    { path: 'users/:userId', component: UsersComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);