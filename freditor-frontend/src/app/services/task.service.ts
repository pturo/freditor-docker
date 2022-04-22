import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:44335/api/tasks/';

  constructor(private http: HttpClient, private router: Router) { }

  getTasks() {
    return this.http.get(this.apiUrl).pipe(catchError(this.handleError('tasks', [])));
  }

  addTask(data: any) {
    return this.http.post(this.apiUrl + 'add-task', data).pipe(
      tap(_ => this.router.navigate(['tasks'])),
      catchError(this.handleError('add-task', []))
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
}
