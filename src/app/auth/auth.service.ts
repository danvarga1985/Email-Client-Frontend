import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';

export interface SignUpCredentials {
  username: string,
  password: string,
  passwordConfirmation: string,
}

export interface SignInCredentials {
  username: string,
  password: string,
}

export interface AuthStatusCredentials {
  username: string,
}

export interface SignUpResponse {
  username: string,
}

export interface AuthStatusResponse {
  authenticated: boolean,
  username: string,
}

export interface SigninResponse {
  username: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signedin$: BehaviorSubject<boolean> = new BehaviorSubject(null);
  username = '';

  constructor(private http: HttpClient) { }

  checkUsernameAvailability(aUsername: string) {
    return this.http.post<{ available: boolean }>(
      environment.API_URL + '/auth/username',
      { username: aUsername }
    );
  }

  signUpUser(credentials: SignUpCredentials) {
    return this.http.post<SignUpResponse>(
      environment.API_URL + '/auth/signup',
      credentials,
    )
      .pipe(
        // An error will not reach 'tap'
        tap((response) => {
          this.username = response.username;
          this.signedin$.next(true);
        })
      );
  }

  signInUser(credentials: SignInCredentials) {
    return this.http.post<SigninResponse>(
      `${environment.API_URL}/auth/signin`,
      credentials
    )
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }

  signOutUser() {
    return this.http.post(
      `${environment.API_URL}/auth/signout`,
      {}
    )
      .pipe(
        tap(() => {
          this.signedin$.next(false);
        })
      )
  }

  checkAuthStatus() {
    return this.http.get<AuthStatusResponse>(
      `${environment.API_URL}/auth/signedin`,
    )
      .pipe(
        tap(({ authenticated, username }) => {
          this.username = username;
          this.signedin$.next(authenticated);
        }),
      );
  }


  getSignedin() {
    return this.signedin$;
  }

}
