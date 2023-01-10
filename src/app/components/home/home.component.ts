import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Country } from 'src/app/models/country';
import { CountriesService } from 'src/app/services/countries.service';
import { ThemingService } from 'src/app/services/theming.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  currentTheme!: string;
  selectedRegion = '';
  countries!: Country[];
  regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

  // for filtering when search input changes when user types
  searchValue: string = '';
  filteredCountries: Subject<Country[]> = new Subject();
  private searchTermSubject: Subject<string> = new Subject();

  constructor(private countriesService: CountriesService,
              private themingService: ThemingService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getCountries();
    this.createSearchTermReceiver();
    this.observeTheme();
  }

  getCountries() {
    this.countriesService.getAllCountries().subscribe(data => {
      this.countries = data;
      this.search(this.searchValue);
    });
  }

  getCountriesByRegion() {
    this.countriesService.getCountriesByRegion(this.selectedRegion)
      .subscribe(data => {
        this.countries = data;
        this.search(this.searchValue);
      });
  }

  onSearchValueChange(searchTerm: string) {
    this.searchTermSubject.next(searchTerm);
  }

  private createSearchTermReceiver() {
    this.searchTermSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
    ).subscribe((term: string) => {
      this.search(term);
    });
  }

  private search(searchTerm: string) {
    searchTerm = searchTerm.trim().toLowerCase();
    if (searchTerm === '') {
      this.filteredCountries.next(this.countries);
      return;
    }
    this.filteredCountries.next(
      this.countries.filter(
        country => country.name.common.toLowerCase().includes(searchTerm)
      )
    );
  }

  observeTheme() {
    this.themingService.themeSubject.subscribe(data => {
      this.currentTheme = data;
      this.changeDetector.detectChanges();
    })
  }
}
