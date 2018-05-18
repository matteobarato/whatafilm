import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { History, HistoryClass } from '../../models/History';
import { HttpClient } from '@angular/common/http';
import { NeuralEngine } from '../../models/NeuralEngine';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  selectedItem: any;
  icons: string[];
  name: string;
  items: Array<{title: string, note: string, icon: string}>;
  show:boolean = false;
  history:HistoryClass=History;
  nn: NeuralEngine;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    // If we navigated to this page, we will have an item available as a nav param
    this.nn = new NeuralEngine(http)
  }

  sendHistory(){
    this.http.post('http://cipizio.it/saver.php?token=asdfasdf',
    {
      name: this.name,
      message: this.history.toJson()
    }).subscribe((res)=>{
      alert('Inviato')
    })
  }

  resetHistory(){
    this.history.reset()
  }

  resetNN(){
    let scope = this
    this.nn.importFromOrigin().subscribe(data => {scope.nn.nn = data; scope.nn.saveToLocal()})
    alert("Riavviare l'applicazione per apportare le modifiche");
  }
}
