import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Option } from '../models/option.model';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  @Input() options!: Array<Option> | null;
  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  changeTheme(themeToSet: any) {
    this.themeChange.emit(themeToSet);
  }

  ngOnInit(): void {
  }

}
