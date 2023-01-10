import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  countries: any = []
  countriesURL: string = "https://restcountries.com/v3.1/all";
  regionURL: string = "https://restcountries.com/v3.1/region/";
  countryCodeURL: string = 'https://restcountries.com/v3.1/alpha/';
  countriesByCodeURL : string = 'https://restcountries.com/v3.1/alpha?codes=';

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<any> {
    return this.http.get(this.countriesURL);
  }

  getCountriesByRegion(region: string): Observable<any> {
    if (region === '') {
      return this.getAllCountries();
    }
    return this.http.get(this.regionURL + region);
  }

  getCountry(alpha3Code: string | null): Observable<any> {
    return this.http.get(this.countryCodeURL + alpha3Code);
  }

  getCountriesByCode(countryCodes: string | null): Observable<any> {
    return this.http.get(this.countriesByCodeURL + countryCodes);
  }

}
