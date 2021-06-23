import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { alert } from "@nativescript/core";

import { User } from "./user.model";

const FIREBASE_API_KEY = "AIzaSyDEAYVkz8WmmpB-sdm2aN8M9nOR94p63NU";

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(errorResponse => {
          this.handleError(errorResponse.error.error.message);
          return throwError(errorResponse);
        }),
        tap(resData => {
          if (resData && resData.idToken) {
            this.handleLogin(
              email,
              resData.idToken,
              resData.localId,
              parseInt(resData.expiresIn)
            );
          }
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(errorResponse => {
          this.handleError(errorResponse.error.error.message);
          return throwError(errorResponse);
        }),
        tap(resData => {
          if (resData && resData.idToken) {
            this.handleLogin(
              email,
              resData.idToken,
              resData.localId,
              parseInt(resData.expiresIn)
            );
          }
        })
      );
  }

  get user() {
    return this._user;
  }

  private handleLogin(
    email: string,
    token: string,
    userId: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this._user.next(user);
  }

  private handleError(errorMsg: string) {
    switch (errorMsg) {
      case "EMAIL_EXISTS":
        alert("The email address is already in use by another account.");
        break;
      case "INVALID_PASSWORD":
        alert("The password is invalid or the user does not have a password.");
        break;
      case "EMAIL_NOT_FOUND":
        alert(
          "There is no user record corresponding to this identifier. The user may have been deleted."
        );
        break;
      case "USER_DISABLED":
        alert("The user account has been disabled by an administrator.");
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        alert(
          "We have blocked all requests from this device due to unusual activity. Try again later."
        );
        break;
      case "OPERATION_NOT_ALLOWED":
        alert("Password sign-in is disabled for this project.");
        break;
      default:
        alert("Login failed. Please check and try again.");
        break;
    }
  }
}
