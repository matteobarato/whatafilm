/*--------------------------------------------
| 32 genres | 3 release_date | 1 runtime | 1 popularity | 1 vote_average
---------------------------------------------*/
const synaptic = require('synaptic');
var makeTrainingSet = require('./init_dataSet.js');
const fs = require('fs')
const dataPath1 = '/var/www/whatafilm/Neural/learning/Matteo_barat_3_mag_1525374698.json'
const dataPath2 = '/var/www/whatafilm/Neural/learning/micol 6 maggio_1525627790.json'

var Network = synaptic.Network,
  Architect = synaptic.Architect,
  Trainer = synaptic.Trainer


let trainingSet = makeTrainingSet(dataPath1)
// console.log(JSON.stringify(trainingSet))
let myNetwork = new Architect.LSTM(38, 38, 7, 1)
let myTrainer = new Trainer(myNetwork)

myTrainer.train(trainingSet, {
  rate: .3,
  iterations: 20000, // 20000
  error: .005,
  shuffle: true,
  log: 1,
  cost: Trainer.cost.CROSS_ENTROPY
});

// let imported = JSON.parse(fs.readFileSync('/var/www/whatafilm/Neural/models/38_38_7_1_1525726138908.json'));
// let myNetwork = Network.fromJSON(imported)

trainingSet = makeTrainingSet(dataPath2)
for (let i=0; i<50; i++){
  var j = parseInt(Math.random() * trainingSet.length);
  console.log(j+': ', myNetwork.activate(trainingSet[j].input), trainingSet[j].output)
}
//
// var exported = JSON.stringify(myNetwork.toJSON());
// fs.writeFileSync('./models/38_38_7_1_'+Date.now()+'.json', exported, 'utf8');

console.log('END TRAINING')
