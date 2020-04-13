import { Component, OnInit } from '@angular/core';
import { CoronaService } from '../corona.service';
import { Country } from '../country';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: string[] = [];

  constructor(private coronaService: CoronaService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    let countriesAux: string[] = [];
    this.coronaService.getAllCoutries()
      .subscribe(countries => { 
        countries.data.covid19Stats.forEach(el => {
          countriesAux.push(el.country)
        });
        this.countries = [ ... new Set(countriesAux)]
      })
  }

}
