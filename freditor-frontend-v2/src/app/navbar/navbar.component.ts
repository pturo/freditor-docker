import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  index = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public selectIndex(idx: number) {
    switch (idx) {
      case 0:
        this.dashboard();
        break;
      case 1:
        this.tasks();
        break;
      case 2:
        this.notes();
        break;
      case 3:
        this.editor();
        break;
      case 4:
        this.calendar();
        break;
      case 5:
        this.archive();
        break;
      case 6:
        this.entertainment();
        break;
    }
  }

  dashboard() {
    this.router.navigate(['dashboard']);
  }

  tasks() {
    this.router.navigate(['tasks']);
  }

  notes() {
    this.router.navigate(['notes']);
  }

  editor() {
    this.router.navigate(['editor']);
  }

  calendar() {
    this.router.navigate(['calendar']);
  }

  archive() {
    this.router.navigate(['archive']);
  }

  entertainment() {
    this.router.navigate(['entertainment']);
  }
}
