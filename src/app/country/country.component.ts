import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../country';
import { ActivatedRoute } from '@angular/router';
import { CoronaService } from '../corona.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  @Input() country: Country;

  constructor(
    private route: ActivatedRoute,
    private service: CoronaService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCountry()
  }

  getCountry(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.service.getCountryByName(name)
      .subscribe(country => {
        let confirmed: number = null;
        let deaths: number = null;
        let recovered: number = null;
        country.data.covid19Stats.forEach(province => {
          confirmed += province.confirmed;
          deaths += province.deaths;
          recovered += province.recovered;
        });
        country.data.covid19Stats[0].confirmed = confirmed;
        country.data.covid19Stats[0].deaths = deaths;
        country.data.covid19Stats[0].recovered = recovered;
        console.log(country.data.covid19Stats[0])
        this.country = country.data.covid19Stats[0]
      })
  }

  goBack(): void {
    this.location.back();
  }

}
