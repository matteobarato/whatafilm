const GENRES_DIM = 32 //bits of input array of genres
const GENRES = JSON.parse('[{ "id": 28, "name": "Action", "_nid": 0 },\
  { "id": 12, "name": "Adventure", "_nid": 1 },\
  { "id": 16, "name": "Animation", "_nid": 2 },\
  { "id": 35, "name": "Comedy", "_nid": 3 },\
  { "id": 80, "name": "Crime", "_nid": 4 },\
  { "id": 99, "name": "Documentary", "_nid": 5 },\
  { "id": 18, "name": "Drama", "_nid": 6 },\
  { "id": 10751, "name": "Family", "_nid": 7 },\
  { "id": 14, "name": "Fantasy", "_nid": 8 },\
  { "id": 36, "name": "History", "_nid": 9 },\
  { "id": 27, "name": "Horror", "_nid": 10 },\
  { "id": 10402, "name": "Music", "_nid": 11 },\
  { "id": 9648, "name": "Mystery", "_nid": 12 },\
  { "id": 10749, "name": "Romance", "_nid": 13 },\
  { "id": 878, "name": "Science Fiction", "_nid": 14 },\
  { "id": 10770, "name": "TV Movie", "_nid": 15 },\
  { "id": 53, "name": "Thriller", "_nid": 16 },\
  { "id": 10752, "name": "War", "_nid": 17 },\
  { "id": 37, "name": "Western", "_nid": 18 }]')

class _ENCODER {

  genre_ids(gnrs_ids){
    let res = Array(GENRES_DIM).fill(0)
    for (let g_id of gnrs_ids){
      let index = GENRES.findIndex((el)=>{
        return el.id == g_id
      })
      if (index >= 0){
        res[GENRES[index]._nid] = 1 // check proprerly genre position in array
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
}

var encoder = new _ENCODER()
module.exports = encoder
