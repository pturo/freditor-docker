import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from 'src/app/model/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  constructor(private router: Router, private noteService: NoteService) { }

  ngOnInit(): void {
  }

  addNote(form: NgForm) {
    const addNote = form.value;
    let newNote: Note = {
      NoteTitle: addNote.notetitle,
      NoteContent: addNote.notecontent
    }

    if (form.valid) {
      this.noteService.addNote(newNote).subscribe((res) => {
        console.log('Pomyslnie dodano notatke do bazy!');
      }, (err: any) => {
        console.log('Blad', err)
      });
      this.router.navigate(['notes']);
    } else {
      console.log('Wystapil blad w zapisywaniu notatki!');
    }
  }

  backToNotes() {
    this.router.navigate(['notes']);
  }
}
