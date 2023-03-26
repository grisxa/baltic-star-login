import {NgModule} from '@angular/core';
import {provideFirebaseApp} from '@angular/fire/app';
import {provideAuth} from '@angular/fire/auth';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule, Routes} from "@angular/router";
import {getAuth} from 'firebase/auth';
import firebase from "firebase/compat/app";
import {environment} from "../environments/environment";
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {LoginButtonComponent} from './components/login-button/login-button.component';
import initializeApp = firebase.initializeApp;

const appRoutes: Routes = [
  {
    path: 'login',
    children: [{path: '**', component: LoginComponent}]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      environment.router
    ),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
