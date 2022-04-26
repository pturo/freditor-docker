import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {
  subService = new Subscription();
  noteList: any = this.getNotes();

  getNotes(): any {
    return this.noteService.getNotes().subscribe((res: any) => {
      let tmp: any = [];
      for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < res[i].length; j++) {
          tmp = Array.from(Object.values(res[i][j]));
        }
      }

      console.log('tmp: ', tmp);
      return tmp;
    });
  }

  deleteNote(noteId: number) {
    this.subService = this.noteService.deleteNote(noteId).subscribe((res: any) => {
      console.log('Usunieto notatke z bazy!');
    }, (err: any) => {
      console.log('Blad: ', err);
    });
  }

  constructor(private router: Router, private noteService: NoteService) { }

  ngOnInit(): void {
    console.log('noteList: ', this.noteList);
  }

  goToAddNote() {
    this.router.navigate(['notes/add-note']);
  }

  ngOnDestroy(): void {
    this.subService.unsubscribe();
  }
}
