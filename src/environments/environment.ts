// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {EmailAuthProvider, FacebookAuthProvider, GoogleAuthProvider} from 'firebase/auth';
import * as firebaseui from 'firebaseui';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDFARdLmRxUGyLfCStOwfxMWRBEcWCkqto',
    authDomain: 'baltic-star-cloud.web.app',
    databaseURL: 'https://baltic-star-cloud.firebaseio.com',
    projectId: 'baltic-star-cloud',
    storageBucket: 'baltic-star-cloud.appspot.com',
    messagingSenderId: '1',
    appId: 'test',
    measurementId: 'test'
  },
  auth: {
    signInFlow: 'redirect',
    signInOptions: [
      {
        provider: 'oidc.balticstar',
        providerName: 'Baltic star',
        buttonColor: '#F79C10',
        iconUrl: '/assets/icons/baltic-star.svg',
      },
      {
        scopes: [
          'profile', 'email',
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email'
        ],
        provider: GoogleAuthProvider.PROVIDER_ID,
        customParameters: {
          // Forces account selection even when one account is available.
          prompt: 'select_account'
        }
      },
      {
        scopes: [
          'public_profile',
          'email'
        ],
        provider: FacebookAuthProvider.PROVIDER_ID
      },
      {
        requireDisplayName: true,
        provider: EmailAuthProvider.PROVIDER_ID
      }
    ],
    // tosUrl: '/tos',
    // privacyPolicyUrl: '/privacy',
    credentialHelper: firebaseui.auth.CredentialHelper.NONE
  } as firebaseui.auth.Config,
  router: {
    enableTracing: true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
