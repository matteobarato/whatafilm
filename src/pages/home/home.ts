import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('moviestack') swingStack: SwingStackComponent;
  @ViewChildren('moviecard') swingCards: QueryList<SwingCardComponent>;
  stackConfig: StackConfig;

  movies: Movie[] = [];
  tmdb: TMDB;
  back_el: HTMLElement;
  history:HistoryClass= History;

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

  this.addNewCards(1);
}

// Called whenever we drag an element
onItemMove(element, x, y, r) {
  var color = '';
  var abs = Math.abs(x);
  let min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
  let hexCode = this.decimalToHex(min, 2);

  if (x < 0) {
    color = '#FF' + hexCode + hexCode;
  } else {
    color = '#' + hexCode + 'FF' + hexCode;
  }

  // this.back_el.style.background = color;
  element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
}

// Connected through HTML
voteUp(like: boolean) {
  let removedCard = this.movies.pop();
  this.addNewCards(0);
  if (like) {
    this.history.like(removedCard.toJson())
  } else {
    this.history.unlike(removedCard.toJson())
  }
}

unkwownMovie(){
  this.movies.pop()
}

// Add new cards to our array
addNewCards(count: number) {
  if (count == 0) return
  this.tmdb.popular().subscribe(data => {
    for (let mov of data['results']) {
      let m = new Movie(this.http)
      m.setData(mov)
      this.movies.push(m)
    }
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
