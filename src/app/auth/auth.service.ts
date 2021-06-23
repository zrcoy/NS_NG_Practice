import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const FIREBASE_API_KEY = "AIzaSyDEAYVkz8WmmpB-sdm2aN8M9nOR94p63NU";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
      { email: email, password: password, returnSecureToken: true }
    );
  }

  login(email: string, password: string) {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      { email: email, password: password, returnSecureToken: true }
    );
  }
}
