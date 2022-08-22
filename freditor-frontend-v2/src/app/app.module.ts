import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { StyleManagerService } from './services/style-manager.service';
import { ThemeService } from './services/theme.service';
import { ThemeComponent } from './theme/theme.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { UserInterceptor } from './interceptors/user.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { StorageService } from './services/storage.service';
import { NavbarComponent } from './navbar/navbar.component';
import { TasksComponent } from './tasks/tasks.component';
import { NotesComponent } from './notes/notes.component';
import { EditorComponent } from './editor/editor.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ArchiveComponent } from './archive/archive.component';
import { EntertainmentComponent } from './entertainment/entertainment.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { EditNoteComponent } from './notes/edit-note/edit-note.component';
import { LoadingSpinnerComponent } from './utils/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    NavbarComponent,
    TasksComponent,
    NotesComponent,
    EditorComponent,
    CalendarComponent,
    ArchiveComponent,
    EntertainmentComponent,
    AddTaskComponent,
    AddNoteComponent,
    EditTaskComponent,
    EditNoteComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true
    },
    AuthService,
    ThemeService,
    StyleManagerService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
