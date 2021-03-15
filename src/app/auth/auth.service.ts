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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signedin$: BehaviorSubject<boolean> = new BehaviorSubject(null);

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
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }

  signInUser(credentials: SignInCredentials) {
    return this.http.post(
      `${environment.API_URL}/auth/signin`,
      credentials
    )
      .pipe(
        tap(() => {
          this.signedin$.next(true);
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
        tap(({ authenticated }) => {
          this.signedin$.next(authenticated);
        }),
      );
  }


  getSignedin() {
    return this.signedin$;
  }

}
