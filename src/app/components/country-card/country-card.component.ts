import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/country';
import { ThemingService } from 'src/app/services/theming.service';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryCardComponent implements OnInit {
  @Input() country!: Country;
  currentTheme!: string;
  constructor(private router: Router,
              private themingService: ThemingService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.observeTheme();
  }

  selectCountry() {
    let borderCodes = '';
    for (const key in this.country.borders) {
      borderCodes = borderCodes + this.country.borders[key] + ',';
    }
    borderCodes = borderCodes.slice(0, -1);
    this.router.navigate(['detail', this.country.cca3, borderCodes]);
  }

  observeTheme() {
    this.themingService.themeSubject.subscribe(data => {
      this.currentTheme = data;
      this.changeDetector.detectChanges();
    })
  }

}
