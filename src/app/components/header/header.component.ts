import { Component, OnInit, Renderer2 } from '@angular/core';
import { Theme } from 'src/app/models/theme';
import { ThemingService } from 'src/app/services/theming.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  currentTheme!: string;
  themeMode!: string;

  constructor(private themingService: ThemingService,
              private renderer: Renderer2){}
  
  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'margin', '0');
    this.observeTheme();
  }

  changeTheme() {
    this.themingService.changeTheme();
  }

  observeTheme() {
    this.themingService.themeSubject.subscribe(data => {
      this.renderer.removeClass(document.body, 'background-' + this.currentTheme);
      this.currentTheme = data;
      this.renderer.addClass(document.body, 'background-' + this.currentTheme);
      this.themeMode = this.currentTheme === Theme.LIGHT_MODE ? 'Dark Mode' : 'Light Mode';
    })
  }
}
