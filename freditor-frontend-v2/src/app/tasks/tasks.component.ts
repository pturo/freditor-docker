import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [
    { id: 1, title: 'Task 1', taskElements: ['Kup mleko', 'Zrób obiad', 'Ucz się czeskiego', 'Nie wracaj do domu po 12 latach'], date: Date.now().toString(), progress: 0 },
    { id: 2, title: 'Task 2', taskElements: ['Nie szukaj partnerki, bo są same oszutki', 'Nie płacz, bo nie warto', 'Szczekaj jak pies', 'Umyj nogi', 'Powkurzaj teściową'], date: Date.now().toString(), progress: 0 },
    { id: 3, title: 'Task 3', taskElements: ['Rozbij jajka u sąsiada', 'Wyklep kotleta', 'Spal telefon', 'Wywal się na ulicy'], date: Date.now().toString(), progress: 0 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  updateTaskProgress() {
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    const progress = document.querySelector('.progress-inner');
    const updateProgress = 100 / taskCheckboxes.length;
    let width = 0;

    for (let i = 0; i < taskCheckboxes.length; i++) {
      if ((taskCheckboxes[i] as HTMLInputElement).checked) {
        width += updateProgress;
      }
    }

    (progress as HTMLElement).style.width = `${width}`;
    console.log('Clicked');
  }

}
