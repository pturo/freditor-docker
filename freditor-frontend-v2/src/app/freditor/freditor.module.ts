import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FreditorComponent } from './freditor.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../guards/auth.guard';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [FreditorComponent, DashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '', component: FreditorComponent, children: [
          { path: '', redirectTo: '/freditor', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent }
        ], canActivate: [AuthGuard]
      }
    ])
  ]
})
export class FreditorModule { }
