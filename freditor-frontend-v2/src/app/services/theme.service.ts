import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StyleManagerService } from './style-manager.service';
import { Option } from '../models/option';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient, private styleManager: StyleManagerService, private storageService: StorageService) { }

  getThemeOptions(): Observable<Array<Option>> {
    return this.http.get<Array<Option>>("assets/themes/theme-options.json");
  }

  setTheme(themeToSet: any) {
    this.storageService.setStorage("theme", themeToSet);
    this.styleManager.setStyle("theme", `assets/themes/${themeToSet}.css`);
  }
}
