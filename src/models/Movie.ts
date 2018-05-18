import { HttpClient } from '@angular/common/http';
import { TMDB } from './TMDB';
let Vibrant = require('node-vibrant')
let tmdb_image_prefix = 'https://image.tmdb.org/t/p'

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
  cast : any[];
  topActor : any;
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
  _isLoaded: boolean = false;
  _gradient_css: string;
  _color_css: string;
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
        this[el] = tmdb_image_prefix + '/w500' +  data[el]
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

  loadPalette(){
    Vibrant.from(this.poster_path).getPalette()
    .then((palette) => {
      if (palette){
        this._gradient_css = 'linear-gradient(-225deg, '+palette.Muted.getHex()+' 0%, '+palette.Muted.getHex()+' 48%,'+palette.Vibrant.getHex()+' 100%)'
        if (palette.LightVibrant)
          this._color_css = palette.LightVibrant.getHex()
        else if (palette.LightMuted)
          this._color_css = palette.LightMuted.getHex()
        else
          this._color_css = "#FAFAFA"
      }else{
          this._color_css = "#FAFAFA"
      }

    }, (err)=>{
      this._color_css = "#FAFAFA"
    })

  }

  load() {
    if (!this._isLoaded)
      {
        this.loadPalette()
        this.loadCast()
        this._isLoaded = true
      }
      // this.tmdb.movie(this.id).subscribe(data => {
      //   console.log(data)
      // }

  }

  loadCast() {
    let scope = this
      this.tmdb.credits(this.id).subscribe(data => {
        scope.cast = data['cast'].map( (el) => {
          el['profile_path'] = tmdb_image_prefix + '/w45' + el['profile_path']
          return el
        })
        let j = scope.cast.findIndex(el => el['order'] === 0)
        scope.topActor = scope.cast[j]
        console.log(scope.topActor)
      })
  }

  toJson(){
    let obj = Object.assign({},this)
    delete obj.http;
    delete obj.tmdb;
    delete obj.overview;
    delete obj.vote_encoded;
    delete obj._gradient_css;
    delete obj._color_css;
    delete obj._isLoaded;
    return obj
  }

}
