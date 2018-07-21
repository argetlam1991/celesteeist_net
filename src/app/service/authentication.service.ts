import { Injectable } from '@angular/core';

import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { Observable, of } from 'rxjs';

const poolData = {
  UserPoolId: 'ap-northeast-1_7ggdxrGJs', // Your user pool id here
  ClientId: '4m2tl4rt10phhb621hbeuch1vb' // Your client id here
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  register(username, email, password) {
      const email_attribute = {
        Name: 'email',
        Value: email
      };
      const attributeList = [];
      attributeList.push(email_attribute);
      return Observable.create(observer => {
        console.log(username);
        userPool.signUp(username, password, attributeList, null, (err, result) => {
          if (err) {
            observer.error(err);
          } else {
            this.getGroups();
            observer.next(result);
            observer.complete();
          }
        });
      });
  }

  signIn(email, password) {
    const authenticationData = {
      Username : email,
      Password : password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username : email,
      Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);
    return Observable.create(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          this.getGroups();
          observer.next(result);
          observer.complete();
        },
        onFailure: function(err) {
          observer.error(err);
        }
      });
    });
  }

  getAuthenticatedUser() {
    // gets the current user from the local storage
    return userPool.getCurrentUser();
  }

  isAdmin(): Observable<boolean> {
    return Observable.create(observer => {
      this.getGroups().subscribe((data) => {
        const res = data.find(function(element) {
          return element === 'admin';
        });
        observer.next(res != null);
        observer.complete();
      }, (err) => {
        observer.next(false);
        observer.complete();
      });
    });
  }

  getGroups() {
    const user = userPool.getCurrentUser();
    return Observable.create(observer => {
      if (!user) {
        observer.next(['guest']);
        observer.complete();
      } else {
        user.getSession(function(err, session) {
            if (err) {
              observer.error(err);
            } else {
              observer.next(session.getIdToken().payload['cognito:groups']);
              observer.complete();
            }
        });
      }
    });
  }
}
