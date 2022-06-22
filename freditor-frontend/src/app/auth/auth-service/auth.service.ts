import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { UserAuth } from 'src/app/model/user-auth.model';
import { UserLogin } from 'src/app/model/user-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'https://localhost:5000/api/auth/';
  private apiUrl = 'https://localhost:44335/api/auth/';
  userData: UserAuth;
  authStateChange = new Subject<boolean>();

  constructor(private router: Router, private http: HttpClient) {
    // Saving user data in localstorage while logged in
    this.authStateChange.subscribe((user: any) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('token', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('token')!);
      } else {
        localStorage.setItem('token', 'null');
        JSON.parse(localStorage.getItem('token')!);
      }
    });
  }

  // signup, login, logout and isAuth checker
  signup(user: any) {
    this.authStateChange.next(true);
    return this.http.post(this.apiUrl + 'signup', JSON.stringify(user)).subscribe((res: any) => {
      this.router.navigate(['']);
    }, this.handleError);
  }

  login(user: UserLogin) {
    this.authStateChange.next(true);
    return this.http.post(this.apiUrl + 'login', JSON.stringify(user)).subscribe((res: any) => {
      if (user.UserName === res.UserName && user.Password === res.Password) {
        this.userData = {
          token: res.token
        };
      }
      else {
        console.log('Login error');
      }
      // localStorage.setItem('token', JSON.stringify(this.userData));
      // this.router.navigate(['dashboard']);
    }, this.handleError);
  }

  get isAuth(): boolean {
    const user = JSON.parse(localStorage.getItem('token')!);
    return user != null ? true : false;
  }

  logout() {
    this.authStateChange.next(false);
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['']);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // log to console instead

      console.log(`${operation}` + ' failed: ' + `${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
