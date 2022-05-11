import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  private apiUrl = 'https://localhost:44335/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getNotes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/notes').pipe(catchError(this.errorHandler));
  }

  deleteNote(noteId: number) {
    return this.http.delete<any>(this.apiUrl + '/notes?noteId=' + noteId, this.httpOptions).pipe(catchError(this.errorHandler));
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
