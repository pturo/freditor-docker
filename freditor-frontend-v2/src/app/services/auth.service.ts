import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Login } from '../models/login.model';
import { UserAuth } from '../models/user-auth.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:44335/api/auth/';
  userAuth!: UserAuth;
  authStateChange = new BehaviorSubject<boolean>(false);

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

  signup() { }

  login(user: Login) {
    return this.http.post(this.apiUrl + 'login', JSON.stringify(user)).subscribe((res: any) => {
      if (this.apiUrl == null || res == null) {
        alert('Brak połączenia z bazą danych!');
      } else {
        if (user.username === res.username && user.password === res.password) {
          this.userAuth = {
            username: res.username,
            token: res.token
          };
        } else if (user.username !== res.username && user.password !== user.password) {
          alert('Podano nieprawidłowy login lub hasło!');
          this.authStateChange.next(false);
        }
        this.authStateChange.next(true);
        this.storageService.setStorage('user', this.userAuth);
        this.router.navigate(['dashboard']);
      }
    }, this.handleError);
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // log to console instead

      console.log(`${operation}` + ' failed: ' + `${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
