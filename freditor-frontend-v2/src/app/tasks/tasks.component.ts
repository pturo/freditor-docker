import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from '../models/task';
import { AddTaskComponent } from './add-task/add-task.component';

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

  width = 0;

  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  updateTaskProgress() {
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    const progress = document.querySelector('.progress-inner');
    const updateProgress = (100 / taskCheckboxes.length);

    for (let j = 0; j < taskCheckboxes.length; j++) {
      if ((taskCheckboxes[j] as HTMLInputElement).checked) {
        this.width += updateProgress;
      }
    }

    (progress as HTMLElement).style.width = `${this.width}%`;
  }

  addTaskDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.matDialog.open(AddTaskComponent, dialogConfig);
    dialogRef.afterClosed().subscribe();
  }
}
