const fs = require('fs');
var ENCODER = require('./encoder_dataset.js');

var makeTrainingSet = (dataPath)=>{
  let data = JSON.parse(fs.readFileSync(dataPath));
  let new_data = []
  for (d of data) {
    let input = ENCODER.genre_ids(d.genres)
    let output = [parseInt(d.target)]
    new_data.push({
      input: input,
      output: output
    })
    //console.log(input.length)
  }
  return new_data
  //console.log(new_data)
}
var transformHistory = (dataPath)=>{
  let data = JSON.parse(fs.readFileSync(dataPath));
  let new_data = []
  for (d of data.liked) {
    let input =[]
    let genres =  d.genres.map(el=>el.id)
    input = input.concat(ENCODER.genre_ids(genres)) //genres 32
    input = input.concat(ENCODER.release_date(d.release_date)) //release_date 3
    input = input.concat([0]) //runtime 1
    input = input.concat([parseFloat(d.popularity)]) //vote_average 1
    input = input.concat([parseFloat(d.vote_average)]) //vote_average 1

    let findMalformed = input.find(el => isNaN(el) || el === 'string' || el instanceof String)
    if (!findMalformed && input.length != 38) console.error('movie '+d.id+' malformed', input)
    new_data.push({
      input: input,
      output: [1]
    })
    //console.log(input.length)
  }
  for (d of data.unliked) {
    let input =[]
    let genres =  d.genres.map(el=>el.id)
    input = input.concat(ENCODER.genre_ids(genres)) //genres 32
    input = input.concat(ENCODER.release_date(d.release_date)) //release_date 3
    input = input.concat([0]) //runtime 1
    input = input.concat(ENCODER.popularity(d.popularity)) //popularity 1
    input = input.concat(ENCODER.vote_average(d.vote_average)) //vote_average 1

    let findMalformed = input.find(el=> isNaN(el) || el === 'string' || el instanceof String)
    if (!findMalformed && input.length != 38) console.error('movie '+d.id+' malformed', input)
    new_data.push({
      input: input,
      output: [0]
    })
    //console.log(input.length)
  }
  new_data.sort(() => Math.random() - 0.5);
  console.log('movies count ', new_data.length)
  return new_data
  //console.log(new_data)
}
module.exports = transformHistory
