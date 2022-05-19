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
  loggedIn = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
    this.loggedIn.next(!!sessionStorage.getItem('token'));
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login', data)
      .pipe(
        tap(_ => this.router.navigate(['dashboard'])),
        catchError(this.handleError('login', []))
      );
  }

  signup(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'signup', data)
      .pipe(
        tap(_ => this.router.navigate([''])),
        catchError(this.handleError('signup', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // log to console instead

      console.log(`${operation}` + ' failed: ' + `${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
