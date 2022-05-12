import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    events: [
      { title: 'event 1', date: '2022-04-28' },
      { title: 'event 2', date: '2022-04-29' }
    ]
  };

  handleDateClick(arg: any) {
    alert('date click!' + arg.dateStr);
  }

}
