import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveComponent } from './archive/archive.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EditorComponent } from './editor/editor.component';
import { EntertainmentComponent } from './entertainment/entertainment.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import { NotesComponent } from './notes/notes.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterFormComponent, pathMatch: 'full' },
  { path: 'dashboard', component: PlaceholderComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'tasks/add-task', component: AddTaskComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'notes', component: NotesComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'notes/add-note', component: AddNoteComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'editor', component: EditorComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'archive', component: ArchiveComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'entertainment', component: EntertainmentComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
