import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from 'src/app/models/country';
import { CountriesService } from 'src/app/services/countries.service';
import { ThemingService } from 'src/app/services/theming.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryDetailComponent implements OnInit {

  constructor(private countriesService: CountriesService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private themingService: ThemingService) { }

  currentTheme !: string;

  alpha3Code!: string | null;
  borderCodes!: string | null;
  country!: Country;
  commonName !: string;
  nativeName !: string;
  population!: number;
  region !: string;
  subregion!: string;
  currencies = '';
  languages = '';
  capital!: string[];
  tld!: string;
  borderCountries!: Country[];
  flagImage = '';

  ngOnInit(): void {
    this.getCountryDetail();
    this.observeTheme();
  }

  getCountryDetail() {
    this.alpha3Code = this.route.snapshot.paramMap.get('cca3');
    this.borderCodes = this.route.snapshot.paramMap.get('borders');
    this.countriesService.getCountry(this.alpha3Code).subscribe(data => {
      this.setCountryValues(data[0]);
    })

    this.getBorderCountries(this.borderCodes);
  }

  getBorderCountries(borderCodes: string | null) {
    if (borderCodes) {
      this.countriesService.getCountriesByCode(borderCodes).subscribe(data => {
        this.borderCountries = data;
        this.changeDetector.detectChanges();
      });
    }
  }

  private setCountryValues(country: Country) {
    this.country = country;
    this.flagImage = country.flags.png;
    this.commonName = country.name.common;
    this.nativeName = country.altSpellings[1];
    this.population = country.population;
    this.region = country.region;
    this.subregion = country.subregion;
    this.capital = country.capital;
    this.tld = country.tld;
    const languages = country.languages
    const currencies = country.currencies;
    for (const key in languages) {
      this.languages = this.languages + languages[key] + ',';
    }
    this.languages = this.languages.slice(0, -1);
    for (const key in currencies) {
      this.currencies = this.currencies + currencies[key].name + ',';
    }
    this.currencies = this.currencies.slice(0, -1);
    this.changeDetector.detectChanges();
  }

  goToHomePage() {
    this.router.navigate(['']);
  }

  getAnotherCountry(country: Country) {
    this.resetValues();
    this.setCountryValues(country);
    let borderCodes = '';
    for (const key in country.borders) {
      borderCodes = borderCodes + country.borders[key] + ',';
    }
    borderCodes = borderCodes.slice(0, -1);
    this.getBorderCountries(borderCodes);
  }

  private resetValues() {
    this.languages = '';
    this.currencies = '';
  }

  observeTheme() {
    this.themingService.themeSubject.subscribe(data => {
      this.currentTheme = data;
      this.changeDetector.detectChanges();
    })
  }
}
