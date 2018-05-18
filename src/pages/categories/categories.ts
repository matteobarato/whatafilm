import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Nav } from 'ionic-angular';

import { HomePage } from '../home/home';


/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export  class CategoriesPage {

  categories = [{
    name: "Popular",
    background: "linear-gradient(to right, #fa709a 0%, #fee140 100%)",
    call: "popular"
  },{
    name: "Now Playing",
    background: "linear-gradient(to right, #74ebd5 0%, #9face6 100%)",
    call: "nowplaying"
  },{
    name: "Top Rated",
    background: "linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%)",
    call: "toprated"
  },
  
]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  openPage(categorie) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(HomePage, categorie.call);
  }



}
