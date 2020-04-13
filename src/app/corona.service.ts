import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Country } from './country'

const httpOptions = {
  headers: new HttpHeaders ({
    'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
    'x-rapidapi-key': '711e2f205fmsh9f29fa64c0c6e83p1b45d9jsn6cdacbb25413' 
  })
}
@Injectable({
  providedIn: 'root'
})
export class CoronaService {

  URL_API: string = 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats';

  constructor(private http: HttpClient) { }

  getAllCoutries(): Observable<any> {
    return this.http.get<Country[]>(this.URL_API, httpOptions)
     .pipe(tap(_ => console.log('fetched countries')))
  }

  getCountryByName(name: string): Observable<any> {
    return this.http.get<Country>(`${this.URL_API}?country=${name}`, httpOptions)
     .pipe(tap(_ => console.log('fetched data from', name)))
  }

}
