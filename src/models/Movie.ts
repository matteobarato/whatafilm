import { HttpClient } from '@angular/common/http';
import { TMDB } from './TMDB';

export class Movie {
  id: number;
  backdrop_path: string;
  adult: boolean;
  genres: any[];
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: any[];
  production_countries: any[];
  release_date: string;
  revenue: number;
  runtime: number;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  isLoaded: boolean = false;

  tmdb: TMDB;
  vote_encoded:number[]=[];

  constructor(private http: HttpClient) {
    this.tmdb = new TMDB(http)
  }

  setData(data: any) {
    Object.keys(data).forEach(el => {
      this[el] = data[el]
      if (el === 'backdrop_path' || el === 'poster_path')
        this[el] = 'https://image.tmdb.org/t/p/w500/' + data[el]
    });
    this.encodeStars()
    return this
  }

  encodeStars() {
    let vote = this.vote_average;
    let arr_encode: number[] = [];
    while (vote > 0) {
      vote >= 1 ? arr_encode.push(1) : arr_encode.push(0.5);
      vote--;
    }
    this.vote_encoded=arr_encode;
  }

  load() {
    if (!this.isLoaded)
      this.tmdb.movie(this.id).subscribe(data => {
        console.log(data)
      })
  }

  toJson(){
    let obj = Object.assign({},this)
    delete obj.http;
    delete obj.tmdb;
    delete obj.vote_encoded;
    return obj
  }

}
