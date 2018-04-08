import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';
import {Observable} from 'rxjs';

import {
  StackConfig,
  Stack,
  Card,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';
import {Movie} from '../../models/Movie'
import {TMDB} from '../../models/TMDB'
import { History, HistoryClass } from '../../models/History';

var MIN_STACK = 20;
var INIT_MOVIE_STACK = 5;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('moviestack') swingStack: SwingStackComponent;
  @ViewChildren('moviecard') swingCards: QueryList<SwingCardComponent>;
  stackConfig: StackConfig;

  movies: Movie[] = [];
  stack: Movie[] = [];
  tmdb: TMDB;
  back_el: HTMLElement;
  history: HistoryClass = History;

  constructor(private http: HttpClient) {
    this.tmdb = new TMDB(http)
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  ionViewDidLoad() {
    // Either subscribe in controller or set in HTML
    this.back_el = document.querySelector('#background_directions');
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      this.back_el.style.background = '#ffffff';
    });

    this.addNewCards(INIT_MOVIE_STACK);
  }

  // Called whenever we drag an element
  onItemMove(element, x, y, r) {
    // var color = '';
    // var abs = Math.abs(x);
    // let min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    // let hexCode = this.decimalToHex(min, 2);
    //
    // if (x < 0) {
    //   color = '#FF' + hexCode + hexCode;
    // } else {
    //   color = '#' + hexCode + 'FF' + hexCode;
    // }

    // this.back_el.style.background = color;
    element.style['transform'] = `translate3d(${x}px, 0px, ${r}px) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  // Connected through HTML
  voteUp(like: boolean) {
    let removedCard = this.movies.shift();
    this.addNewCards(1);
    if (like) {
      this.history.like(removedCard.toJson())
    } else {
      this.history.unlike(removedCard.toJson())
    }
  }

  unkwownMovie() {
    let removedCard = this.movies.shift();
    this.history.unknown(removedCard.toJson())
    this.addNewCards(1);
  }

  // Add new cards to our array
  addNewCards(count: number) {
    for (let i = 0; i < count; i++) {
      let mov = this.stack.shift()
      if (mov) this.movies.push(mov)
    }
    console.log(this.movies.map(el=>el.title))
    if (this.stack.length < MIN_STACK) this.addToStack()
  }

  addToStack() {
    this.tmdb.popular().concatMap(data => Observable.from(data['results'])).filter(item => !this.history.contain(item['id']))
      .finally(() => this.movies.length < INIT_MOVIE_STACK ? this.addNewCards(INIT_MOVIE_STACK) : false)
      .subscribe(data => {
        // console.log('|GET MOVIE|', data)
        let m = new Movie(this.http)
        m.setData(data)
        this.stack.push(m)
      })
  }

  // http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  }



}
