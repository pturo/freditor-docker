import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy, AfterViewInit {
  subService = new Subscription();
  noteList: any[] = [];

  constructor(private router: Router, private noteService: NoteService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  ngAfterViewInit(): void {
    this.getNotes();
  }

  // Note CRUD operations.
  getNotes() {
    this.subService = this.noteService.getNotes().subscribe((res: any) => {
      setTimeout(() => { this.noteList = res.getNotes; }, 0);
    });
  }

  deleteNote(noteId: number) {
    this.subService = this.noteService.deleteNote(noteId).subscribe((res) => {
      this.noteList = this.noteList.filter(item => item.noteId !== noteId);
    });
  }

  // Route to add-note, edit-note and unsubsribe.
  goToAddNote() {
    this.router.navigate(['notes/add-note']);
  }

  goToEditNote(noteId: number) {
    this.router.navigate(['notes/edit-note/' + noteId]);
  }

  ngOnDestroy(): void {
    this.subService.unsubscribe();
  }
}
