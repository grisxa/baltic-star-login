import {Injectable, OnDestroy} from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';
import {Auth, getAuth, getRedirectResult, signOut, User, UserInfo} from 'firebase/auth';
import {from, of, Subject} from 'rxjs';

import {map, switchMap, takeUntil} from 'rxjs/operators';
import {ExtraProviderInfo, mergeProviderInfo, ProviderInfo, Rider} from '../models/rider';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  public state$: Auth;

  readonly unsubscribe$ = new Subject();
  readonly logout$ = new Subject();
  private providerInfo: ExtraProviderInfo = {};

  constructor(
    private snackBar: MatSnackBar,
  ) {
    this.state$ = getAuth();

    this.state$.onAuthStateChanged(this.stateObserver.bind(this),
      (error) => console.error('Authentication error', error));

    getRedirectResult(this.state$)
      .then((authResult?: any) => {
        this.providerInfo.providers = mergeProviderInfo(
          authResult?.user.providerData,
          [Rider.copyProviderInfo(authResult?.user) as UserInfo],
        );
        return authResult;
      })
      .catch((error) => {
        console.error('Authentication error', error);
        this.snackBar.open(`Не удалось подключить аккаунт. ${error.message}`,
          'Закрыть');
      });
  }

  // FIXME: when to destroy?
  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  stateObserver(user: User | null): Promise<void> {
      console.log('User observer', user);
      return Promise.resolve();
  }

  addProviderInfo(info: ExtraProviderInfo) {
    this.providerInfo = info;
  }

  get isLoggedIn(): boolean {
    return !!this.state$.currentUser;
  }


  logout(): Promise<void> {
    return signOut(this.state$)
      .then(() => {
        this.logout$.next();
      })
      .catch((error: Error) => console.error('signOut has failed', error));
  }
}
