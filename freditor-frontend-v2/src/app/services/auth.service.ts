import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { Login } from '../models/login.model';
import { UserAuth } from '../models/user-auth.model';
import { Storage } from '../utils/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:44335/api/auth/';
  userAuth!: UserAuth;
  authStateChange = new Subject<boolean>();

  constructor(private router: Router, private http: HttpClient, private storage: Storage) {
    // Save user data in storage
    this.authStateChange.subscribe((user: any) => {
      if (user) {
        this.userAuth = user;
        storage.setStorage('user', this.userAuth);
        JSON.parse(storage.getStorage('user')!);
      } else {
        storage.setStorage('user', 'null');
        JSON.parse(storage.getStorage('user')!);
      }
    });
  }

  signup() { }

  login(user: Login) {
    this.authStateChange.next(true);
    return this.http.post(this.apiUrl + 'login', JSON.stringify(user)).subscribe((res: any) => {
      if (user.username === res.username && user.password === res.password) {
        this.userAuth = {
          username: res.username,
          token: res.token
        };
      } else if (user.username !== res.username && user.password !== user.password) {
        alert('Podano nieprawidłowy login lub hasło!');
      }
      this.storage.setStorage('user', this.userAuth);
      this.router.navigate(['dashboard']);
    }, this.handleError);
  }

  get loggedUser() {
    const user = JSON.parse(this.storage.getStorage('user')!);
    if (user !== null) {
      return user;
    }

    return null;
  }

  logout() {
    this.authStateChange.next(false);
    this.storage.removeAndClearStorage('user');
    this.router.navigate(['login']);
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
