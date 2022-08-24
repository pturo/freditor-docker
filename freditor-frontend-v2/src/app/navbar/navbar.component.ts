import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  index = 0;
  selectedItem = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
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
