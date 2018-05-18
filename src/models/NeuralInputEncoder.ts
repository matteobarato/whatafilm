import { TMDB } from './TMDB';
import { Movie } from './Movie';


class _NeuralInputEncoder {
  genres: any[] = JSON.parse('{"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]}').genres;
  genres_dim:number = 32
  input_dim: number = 38

  constructor(){}
  genre_ids(gnrs_ids){
    let res:number[] = Array.apply(null, Array(this.genres_dim)).map(Number.prototype.valueOf,0);
    for (let g_id of gnrs_ids){
      let index = this.genres.findIndex((el)=>{
        return el.id == g_id.id
      })
      if (index >= 0){
        res[this.genres[index]._nid] = 1 // check proprerly genre position in array
      }
      else{
        console.error("Index out of limits in GENRES : ", g_id)
      }
    }
    return res
  }
  release_date(date){
    let d =  date.split('-').map(el=>parseInt(el))
    return [((d[0]-1900)/1000), (d[1]/100), (d[2]/100)]
  }
  popularity(popularity){
    return parseFloat(popularity)/1000
  }
  vote_average(vote){
    return parseFloat(vote)/10
  }
  runtime(runtime){
    return 0
  }

  encodeInput(movie: Movie){
    let input: number[] = []
    input = input.concat(this.genre_ids(movie.genres))
    input = input.concat(this.release_date(movie.release_date))
    input = input.concat(this.popularity(movie.popularity))
    input = input.concat(this.runtime(movie.runtime))
    input = input.concat(this.vote_average(movie.vote_average))
    if (input.length !== this.input_dim)
      {
        console.error('movie '+movie.id+' malformed', input)
        return Array.apply(null, Array(this.input_dim)).map(Number.prototype.valueOf,0);
      }
    return input
  }

}

export var NeuralInputEncoder = new _NeuralInputEncoder()
