import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {EmailAuthProvider, getAuth, sendEmailVerification, UserInfo} from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import {Subject} from 'rxjs';
import {environment} from 'src/environments/environment';
import {ExtraProviderInfo, mergeProviderInfo, ProviderDetails, Rider} from '../../models/rider';
import {AuthService} from '../../services/auth.service';
import AuthUIError = firebaseui.auth.AuthUIError;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  uiShown = false;
  private unsubscribe$ = new Subject();
  private authUI?: firebaseui.auth.AuthUI;

  constructor(private route: ActivatedRoute,
              private zone: NgZone,
              private router: Router,
              public auth: AuthService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.authUI = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(getAuth());
    this.restartLogin();
  }



  // release watchers
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.authUI?.delete();
  }

  // when you return after logging in with one of the providers
  onSuccess(authResult: any, redirectUrl: string): boolean {
    // GoogleAdditionalUserInfo / GenericAdditionalUserInfo
    const info = authResult.additionalUserInfo;
    if (info?.isNewUser && info?.providerId === EmailAuthProvider.PROVIDER_ID) {
      sendEmailVerification(authResult.user)
        .then(() => this.snackBar.open('Отправлено письмо с подтверждением',
          'Закрыть'))
        .catch((error: Error) => {
          console.error('email verification has failed', error);
          this.snackBar.open(`Не удалось отправить письмо. ${error.message}`,
            'Закрыть');
        });
    }

    const extraProviders: ExtraProviderInfo = {
      profile: info.profile,
      providers: mergeProviderInfo(
        authResult.user.providerData,
        [
          Rider.copyProviderInfo(authResult.user) as UserInfo,
          Rider.copyAdditionalInfo(info.profile as ProviderDetails, info.providerId) as UserInfo,
        ])
    };
    this.auth.addProviderInfo(extraProviders);

    return false;
  }

  restartLogin() {
    this.authUI?.start('#firebaseui-auth', {
        ...environment.auth,
        callbacks: {
          signInSuccessWithAuthResult: this.onSuccess.bind(this),
          signInFailure: this.onError.bind(this),
          uiShown: () => this.uiShown = true,
        },
      }
    );
  }
  logout() {
    this.auth.logout()
      .then(() => this.restartLogin())
      .catch(error => console.error('Logout error', error));
  }

  onError(error: AuthUIError) {
    console.error('= login error', error);
    if (!(error instanceof TypeError)) {
      this.snackBar.open(`Ошибка входа. ${error.code}`,
        'Закрыть');
    }
  }
}
