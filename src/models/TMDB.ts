import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TMDB {
  apikey: string = '9d9a6c19eff90b0ee432db50c992d94d'
  tmdburl: string = 'https://api.themoviedb.org/3'
  language: string = 'it'
  pages: Object = {};
  genres: Object[] = JSON.parse('{"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]}').genres;
  static getGenres = function(){ return JSON.parse('{"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]}').genres; }

  constructor(private http: HttpClient) {
  }

  getGenre(id:number){
    let index = this.genres.findIndex(el=>{
      return el['id'] == id
    })
    return this.genres[index]
  }
  movie(id: number) {
    return this.http.get(this.furl(`/movie/${id}`))
  }
  credits(id: number) {
    return this.http.get(this.furl(`/movie/${id}/credits`))
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
    this.pages[url]? this.pages[url]++ : this.pages[url]=1
    console.info('|REQ|', url+`?page=${this.pages[url]}`)
    return this.tmdburl + url + `?api_key=${this.apikey}&language=${this.language}&page=${this.pages[url]}&with_genres&append_to_responde=genres,${ator? ator.toString() : ''}`;
  }
  toParams(obj: any) {
    return Object.keys(obj).reduce((prev, key, i) => (
      `${prev}${i !== 0 ? '&' : ''}${key}=${obj[key]}`
    ), '');
  }
}
