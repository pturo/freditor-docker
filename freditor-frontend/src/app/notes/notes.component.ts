import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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
  noteList: any = [];

  getNotes() {
    this.subService = this.noteService.getNotes().subscribe((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.noteList = Array.from(Object.values(res));
      }
    }, (err: any) => {
      console.log('Wystapil blad poczas pobierania danych: ', err);
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
    this.getNotes();
  }

  goToAddNote() {
    this.router.navigate(['notes/add-note']);
  }

  ngOnDestroy(): void {
    this.subService.unsubscribe();
  }
}
