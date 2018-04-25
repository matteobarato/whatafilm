import { HttpClient } from '@angular/common/http';
import { TMDB } from './TMDB';

export class Movie {
  id: number;
  backdrop_path: string;
  adult: boolean;
  genres: any[]=[];
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
  _time: number;

  tmdb: TMDB;
  vote_encoded:number[]=[];

  constructor(private http: HttpClient) {
    this.tmdb = new TMDB(http)
    this._time = new Date().getTime()
  }

  setData(data: any) {
    Object.keys(data).forEach(el => {
      this[el] = data[el]
      if (el === 'backdrop_path' || el === 'poster_path')
        this[el] = 'https://image.tmdb.org/t/p/w500/' + data[el]
      if (el === 'genre_ids')
        for (let g of  data[el])
          this.genres.push(this.tmdb.getGenre(g))
    });
    this.encodeStars()
    return this
  }

  encodeStars() {
    let vote = this.vote_average/2;
    let stars = 5;
    let arr_encode: number[] = [];
    while (stars > 0) {
      if (vote>=1){
        arr_encode.push(1)
      }else if(vote<1 && vote>0){
        arr_encode.push(0.5)
      }else{
        arr_encode.push(0)
      }
      vote--;
      stars--;
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
