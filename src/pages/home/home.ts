import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  body: any;
  constructor(public navCtrl: NavController, private afDatabase: AngularFireDatabase) {
    this.afDatabase
      .object(`prueba`)
      .valueChanges()
      .subscribe(bodyHTML => {
        this.body = bodyHTML;
      });
  }

  ionViewDidLoad() {
    console.log(this.body);
  }
}
