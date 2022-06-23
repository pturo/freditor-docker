import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    NotesComponent,
    AddNoteComponent,
    EditNoteComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class NotesModule { }
