import { Component, OnInit } from '@angular/core';
import { Tile } from '../utils/tile';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tiles: Tile[] = [
    { title: 'Zadania', cols: 1, rows: 1, color: 'lightblue', icon: 'task_alt' },
    { title: 'Notatki', cols: 1, rows: 1, color: 'lightgreen', icon: 'edit_note' },
    { title: 'Edytor', cols: 1, rows: 1, color: 'lightblue', icon: 'edit' },
    { title: 'Kalendarz', cols: 1, rows: 1, color: 'lightgreen', icon: 'calendar_month' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
