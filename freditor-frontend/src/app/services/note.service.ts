import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'https://localhost:44335/api/notes/';

  constructor(private http: HttpClient, private router: Router) { }

  getNotes() {
    return this.http.get(this.apiUrl).pipe(catchError(this.handleError('notes', [])));
  }

  addNote(data: any) {
    return this.http.post(this.apiUrl + 'add-note', data).pipe(
      tap(_ => this.router.navigate(['notes'])),
      catchError(this.handleError('add-note', [])));
  }

  editNote(noteId: number) { }

  deleteNote(noteId: number) {
    return this.http.delete(this.apiUrl + noteId).pipe(catchError(this.handleError('notes', [])));
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
