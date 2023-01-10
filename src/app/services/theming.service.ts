import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from '../models/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {
  constructor() { }

  currentTheme = Theme.LIGHT_MODE;

  themeSubject = new BehaviorSubject(Theme.LIGHT_MODE);

  changeTheme() {
      if(this.currentTheme === Theme.LIGHT_MODE) {
        this.currentTheme = Theme.DARK_MODE;
        this.themeSubject.next(Theme.DARK_MODE);
        return;
      }
      this.currentTheme = Theme.LIGHT_MODE;
      this.themeSubject.next(Theme.LIGHT_MODE);
  }
}
