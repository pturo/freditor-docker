import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'auth' },
      { path: 'auth', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'freditor', loadChildren: () => import('./freditor/freditor.module').then(m => m.FreditorModule) }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
