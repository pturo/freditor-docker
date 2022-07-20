import { Component, OnInit } from '@angular/core';
import { Tile } from '../utils/tile';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tiles: Tile[] = [
    { title: 'Zadania', cols: 1, rows: 1, color: 'lightblue' },
    { title: 'Notatki', cols: 1, rows: 1, color: 'lightgreen' },
    { title: 'Edytor', cols: 1, rows: 1, color: 'lightblue' },
    { title: 'Kalendarz', cols: 1, rows: 1, color: 'lightgreen' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
