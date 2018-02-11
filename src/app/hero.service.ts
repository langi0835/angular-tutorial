import { Injectable } from '@angular/core';
import { Hero } from './data/hero';
import { HeroDatas } from './data/mock-heroes';


@Injectable()
export class HeroService {

  constructor() { }

  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HeroDatas);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.getHeroes());
      }, 2000);
    });
  }

}
