import { HttpClient } from '@angular/common/http';
import { Movie } from './Movie';
import { NeuralInputEncoder } from './NeuralInputEncoder';
const synaptic = require('synaptic');
let Network = synaptic.Network

export class NeuralEngine {
  nn_source: string = 'http://cipizio.it/source/starting_nn.json'
  nn: any
  learningRate: number = 0.3
  count:number = 0


  constructor(private http: HttpClient) {
    this.restore()
  }

  think(movie: Movie) {
    if (!this.nn)return NaN
    this.count++
    if (this.count > 10){
      this.saveToLocal()
      this.count = 0
    }
    return this.nn.activate( NeuralInputEncoder.encodeInput(movie) )

  }

  adjust(movie: Movie, feedback) {
    if (!this.nn)return
    this.nn.activate( NeuralInputEncoder.encodeInput(movie) )
    this.nn.propagate(this.learningRate, [feedback])
  }


  restore() {
    let scope = this
    let imported = localStorage.getItem('nn')
    if (imported) {
      imported = JSON.parse(imported)
      this.nn = Network.fromJSON(imported)
    }
    else
      this.importFromOrigin().subscribe(data => {scope.nn = Network.fromJSON(data); console.info('NN',scope.nn)})
  }
  importFromOrigin() {
    return this.http.get(this.nn_source)
  }
  saveToLocal() {
    let exported = this.nn.toJSON()
    localStorage.setItem('nn', JSON.stringify(exported))
  }

  toJson() {
    let obj = Object.assign({}, this)
    return obj
  }
}
