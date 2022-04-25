import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from 'src/app/model/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  addNoteForm?: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private noteService: NoteService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.addNoteForm = this.formBuilder.group({
      NoteTitle: new FormControl(['', [Validators.required]]).setValue(''),
      NoteContent: new FormControl('', [Validators.required]).setValue(''),
    });
  }

  addNote() {
    const addNote = this.addNoteForm.value;
    let newNote: Note = {
      NoteTitle: addNote.NoteTitle,
      NoteContent: addNote.NoteContent
    }

    if (this.addNoteForm.valid) {
      this.noteService.addNote(newNote).subscribe((res: any) => {
        console.log('Pomyslnie dodano notatke do bazy!');
      }, (err: any) => {
        console.log('Blad', err)
      });
      this.router.navigate(['notes']);

      console.log('Nowa notatka: ', newNote);

    } else {
      console.log('Wystapil blad w zapisywaniu notatki!');
    }
  }

  backToNotes() {
    this.router.navigate(['notes']);
  }

}
