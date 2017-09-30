import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: FormGroup;

  constructor(
    private navCtrl: NavController,
    private angularFireAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  login() {
    if(this.form.value.email == '' || this.form.value.password == '') {
      this.toastController.create({
        message: 'please provide email and password values',
        duration: 3000,
        dismissOnPageChange: true,
        showCloseButton: true,
        closeButtonText: 'Dismiss'
      }).present();
      return;
    }
    this.angularFireAuth.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.password).then(
      res => {
        this.toastController.create({
          message: 'Login Successful',
          duration: 500,
          dismissOnPageChange: true
        }).present().then(
          res => {
            this.navCtrl.push('TabsPage');
          }
          );
      }
    ).catch(
      error => {
        this.toastController.create({
          message: error.message,
          duration: 2000,
          showCloseButton: true,
          closeButtonText: 'Dismiss'
        }).present();
      }
      )
  }

  ionViewWillLoad() {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    })
  }
}
