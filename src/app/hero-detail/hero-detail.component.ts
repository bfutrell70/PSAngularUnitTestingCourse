// @ts-nocheck
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})

export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  goBack(): void {
    this.location.back();
  }

  // save(): void {
  //   var p = new Promise((resolve) => {
  //     this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  //     resolve();
  //   });
  // }

  // save(): void {
  //   // wait 250 milliseconds
  //   // if clicked multiple times in 250ms will only contact the server once
  //   // results in makng it asynchronous
  //   debounce(() => {
  //     this.heroService.updateHero(this.hero)
  //       .subscribe(() => this.goBack());
  //   }, 250, false)();
  // }

  // an example of calling a promise
  save(): void {
    // is async because of the call to someThirdPartyPromise()
    someThirdPartyPromise().then(() => {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    });
  }
}   // end export class

function someThirdPartyPromise(): Promise<any> {
  return new Promise((resolve) => {
    resolve(null);
  });
}

// prevents clicking the Save button multiple times rapidly
// from sending a bunch of events
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
