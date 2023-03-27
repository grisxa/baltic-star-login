import {NgModule} from '@angular/core';
import {FirebaseApp, provideFirebaseApp} from '@angular/fire/app';
import {Auth, provideAuth} from '@angular/fire/auth';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';


const appRoutes: Routes = [
  {
    path: 'login',
    children: [{path: '**', component: LoginComponent}]
  },
];

const app: FirebaseApp = initializeApp(environment.firebase);
const auth: Auth = getAuth(app);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      environment.router
    ),
    provideFirebaseApp(() => app),
    provideAuth(() => auth),
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {verticalPosition: 'top', duration: 5000}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
