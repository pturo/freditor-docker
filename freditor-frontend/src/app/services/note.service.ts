import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
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

  getNote(noteId: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/notes/' + noteId).pipe(catchError(this.errorHandler));
  }

  addNote(note: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/notes/add-note', JSON.stringify(note)).pipe(catchError(this.errorHandler));
  }

  editNote(noteId: number, note: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/notes/edit-note' + noteId, JSON.stringify(note)).pipe(catchError(this.errorHandler));
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
