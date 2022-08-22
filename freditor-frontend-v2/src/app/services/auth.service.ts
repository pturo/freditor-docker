import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Login } from '../models/login';
import { Signup } from '../models/signup';
import { UserAuth } from '../models/user-auth';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:44335/api/auth/';
  userAuth!: UserAuth;
  authStateChange = new BehaviorSubject<boolean>(false);
  loginFailed: boolean = false;
  signupFailed: boolean = false;
  connectionFailed: boolean = false;

  constructor(private router: Router, private http: HttpClient, private storageService: StorageService) {
    // Save user data in storage
    this.authStateChange.subscribe((user: any) => {
      if (user) {
        this.userAuth = user;
        storageService.setStorage('user', this.userAuth);
        JSON.parse(storageService.getStorage('user')!);
      } else {
        storageService.setStorage('user', 'null');
        JSON.parse(storageService.getStorage('user')!);
      }
    });
  }

  signup(user: Signup) {
    this.connectionFailed = false;
    this.signupFailed = false;
    return this.http.post(this.apiUrl + 'signup', JSON.stringify(user)).subscribe((res: any) => {
      if (this.apiUrl == null || res == null) {
        // do nothing
      } else {
        // TODO: save data
        this.router.navigate(['login']);
      }
    }, (error: any) => {
      if (this.connectionFailed == false) {
        this.connectionFailed = true;
      } else if (this.signupFailed == false) {
        this.signupFailed = true;
      }
    });
  }

  login(user: Login) {
    this.connectionFailed = false;
    this.loginFailed = false;
    return this.http.post(this.apiUrl + 'login', JSON.stringify(user))
      .subscribe((res: any) => {
        if (this.apiUrl == null || res == null) {
          // do nothing
        } else {
          if (user.username == res.username && user.password == res.password) {
            this.userAuth = {
              username: res.username,
              token: res.token
            };
          } else if (user.username != res.username && user.password != user.password) {
            this.authStateChange.next(false);
          }
          this.authStateChange.next(true);
          this.storageService.setStorage('user', this.userAuth);
          this.router.navigate(['dashboard']);
        }
      }, (error: any) => {
        if (this.connectionFailed == false) {
          this.connectionFailed = true;
        } else if (this.loginFailed == false) {
          this.loginFailed = true;
        }
      });
  }

  get isLoggedIn() {
    return this.authStateChange.asObservable();
  }

  logout() {
    this.authStateChange.next(false);
    this.storageService.removeStorage('user');
    this.storageService.clearStorage();
    this.router.navigate(['login']);
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
