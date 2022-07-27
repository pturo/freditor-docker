import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArchiveComponent } from './archive/archive.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditorComponent } from './editor/editor.component';
import { EntertainmentComponent } from './entertainment/entertainment.component';
import { AuthGuard } from './guards/auth.guard';
import { NotesComponent } from './notes/notes.component';
import { TasksComponent } from './tasks/tasks.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'dashboard', component: DashboardComponent, },
      { path: 'tasks', component: TasksComponent },
      { path: 'notes', component: NotesComponent },
      { path: 'editor', component: EditorComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'entertainment', component: EntertainmentComponent },
      { path: '**', redirectTo: 'login' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
