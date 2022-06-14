import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // private apiUrl = 'https://localhost:5000/api/auth/';
  private apiUrl = 'https://localhost:44335/api/auth/';
  userData: any;
  authChange = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
    this.authChange.subscribe((user: any) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  login(data: any): Observable<any> {
    this.authChange.next(true);
    return this.http.post<any>(this.apiUrl + 'login', data)
      .pipe(
        tap(_ => this.router.navigate(['dashboard'])),
        catchError(this.handleError('login', []))
      );
  }

  signup(data: any): Observable<any> {
    this.authChange.next(true);
    return this.http.post<any>(this.apiUrl + 'signup', data)
      .pipe(
        tap(_ => this.router.navigate([''])),
        catchError(this.handleError('signup', []))
      );
  }

  get isAuth(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user != null ? true : false;
  }

  logout() {
    this.authChange.next(false);
    localStorage.removeItem('user');
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
