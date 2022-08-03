import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Moment } from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild('calendar') calendar!: MatCalendar<Moment>;
  selectedDate!: Moment;

  constructor() { }

  ngOnInit(): void {
  }

}
