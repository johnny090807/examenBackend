import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpModule } from '@angular/http';

import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { LogoutComponent } from "./auth/logout.component";
import { SignupComponent } from "./auth/signup.component";
import { SigninComponent } from "./auth/signin.component";
import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "./errors/error.component";
import {ErrorService} from "./errors/error.service";
import {UserService} from "./user/user.service";
import {UsersComponent} from "./user/users.component";
import {UserListComponent} from "./user/user-list.component";
import {UserInputComponent} from "./user/user-input.component";
import {UserComponent} from "./user/user.component";
import {UserIdentifierComponent} from "./identifier/user-identifier.component";
import {FilterPipe} from "./shared/filter.pipe";
import {PercentagePipe} from "./shared/percentage.pipe";
import {IdentifierComponent} from "./identifier/identifier.component";
import {UserIdentifierListComponent} from "./identifier/user-identifier-list.component";
import {IdentifierService} from "./identifier/identifier.service";
import {IdentifiersComponent} from "./identifier/identifiers.component";

import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import {SubscriptionplanService} from "./subscriptionplan/subscriptionplan.service";
import {SubscriptionplanComponent} from "./subscriptionplan/subscriptionplan.component";
import {SubscriptionplanInputComponent} from "./subscriptionplan/subscriptionplan-input.component";
import {IdentifierAllComponent} from "./identifier/Identifier-all.component";


@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent,
        HeaderComponent,
        ErrorComponent,
        UserComponent,
        UsersComponent,
        UserListComponent,
        UserInputComponent,
        UserIdentifierComponent,
        FilterPipe,
        PercentagePipe,
        IdentifierComponent,
        UserIdentifierListComponent,
        IdentifiersComponent,
        SubscriptionplanComponent,
        SubscriptionplanInputComponent,
        IdentifierAllComponent
    ],
    imports: [
    BrowserModule, 
    FormsModule,
    routing, 
    ReactiveFormsModule,
    HttpModule,
        Ng2FilterPipeModule
    ],
    bootstrap: [AppComponent],
    providers: [
        IdentifierService,
        AuthService,
        ErrorService,
        UserService,
        FilterPipe,
        PercentagePipe,
        SubscriptionplanService
    ]
})
export class AppModule {

}