import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TMDB {
  apikey: string = '9d9a6c19eff90b0ee432db50c992d94d'
  tmdburl: string = 'https://api.themoviedb.org/3'
  language: string = 'it'
  constructor(private http: HttpClient) {
  }

  movie(id: number) {
    return this.http.get(this.furl(`/movie/${id}`))
  }
  topRated() {
    return this.http.get(this.furl('/movie/top_rated'))
  }
  nowPlaying() {
    return this.http.get(this.furl('/movie/now_playing'))
  }
  popular() {
    return this.http.get(this.furl('/movie/popular'))
  }

  discover(params:any) {
    return this.http.get(this.furl('/discover/movie')+this.toParams(params))
  }

  furl(url: string, ator?: any[]) {
    return this.tmdburl + url + `?api_key=${this.apikey}&language=${this.language}&append_to_responde=${ator? ator.toString() : ''}`;
  }
  toParams(obj: any) {
    return Object.keys(obj).reduce((prev, key, i) => (
      `${prev}${i !== 0 ? '&' : ''}${key}=${obj[key]}`
    ), '');
  }
}
