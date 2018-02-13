import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Hero } from './data/hero';

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';
  constructor(private http: Http) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get(this.heroesUrl)
      // .do(data => console.log(data)) // eyeball results in the console
      .map(res => res.json().data as Hero[])
      .catch(this.handleError);
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .map(r => r.json().data as Hero)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error); // log to console instead
    return Observable.throw(error);
  }

}
