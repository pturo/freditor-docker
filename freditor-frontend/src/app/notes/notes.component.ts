import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from '../model/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  noteList: Note[] = [
    {
      NoteId: 1,
      NoteTitle: 'Test',
      NoteContent: 'This is just an example to see it works.'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToAddNote() {
    this.router.navigate(['notes/add-note']);
  }
}
