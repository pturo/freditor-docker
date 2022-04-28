import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:44335/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private router: Router) { }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/tasks').pipe(catchError(this.errorHandler));
  }

  getTask(taskId: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/tasks/' + taskId).pipe(catchError(this.errorHandler));
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/tasks/add-task', JSON.stringify(task)).pipe(catchError(this.errorHandler));
  }

  editTask(taskId: number, task: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/tasks/edit-task/' + taskId, JSON.stringify(task)).pipe(catchError(this.errorHandler));
  }

  deleteTask(taskId: number) {
    return this.http.delete<any>(this.apiUrl + '/tasks?taskId=' + taskId, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
