import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: HomeComponent, children: [
          { path: '', redirectTo: '/auth', pathMatch: 'full' },
          { path: 'login', component: LoginComponent, data: { label: 'Zaloguj się' } },
          { path: 'signup', component: SignupComponent, data: { label: 'Zarejestruj się' } }
        ]
      }
    ])
  ]
})
export class HomeModule { }
