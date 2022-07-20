import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../services/theme.service';
import { Option } from '../models/option.model';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sideNavToggle = new EventEmitter<void>();
  options$: Observable<Array<Option>> = this.themeService.getThemeOptions();
  isLoggedIn$!: Observable<boolean>;

  constructor(private readonly themeService: ThemeService, public authService: AuthService, private storageService: StorageService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  themeChangeHandler(themeToSet: any) {
    //this.storageService.setStorage("theme", this.themeService.setTheme(themeToSet));
    this.themeService.setTheme(themeToSet);
    console.log("theme to set ", themeToSet);
  }

  logout() {
    this.authService.logout();
  }
}
