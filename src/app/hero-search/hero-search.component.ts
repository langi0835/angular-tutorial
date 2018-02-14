import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HeroSearchService } from './../hero-search.service';
import { Component, OnInit } from '@angular/core';

import { Hero } from '../data/hero';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

// Observable class extensions
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router
  ) { }

  search(term: string) {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.heroes = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(t => t ? this.heroSearchService.search(t)
        : Observable.of<Hero[]>([]))
      .catch(err => {
        console.log(err);
        return Observable.of<Hero[]>([]);
      });
  }

  gotoDetail(hero: Hero) {
    let link = ['./detail', hero.id];
    this.router.navigate(link);
  }

}
