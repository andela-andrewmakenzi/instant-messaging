import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
  ) {
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  login() {
    this.navCtrl.setRoot('TabsPage');
  }

  ionViewWillLoad() {
  }
}
