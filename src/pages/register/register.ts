import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  loginForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private fireAuth: AngularFireAuth,
    private toastController: ToastController
  ) {
  }

  register() {
    const auth$ = this.fireAuth.auth.createUserWithEmailAndPassword(
      this.loginForm.value.emailaddress,
      this.loginForm.value.password
    ).then(
      results => {
        this.toastController.create({
          message: 'Successfully added user',
          duration: 2000,
          showCloseButton: true,
          closeButtonText: 'Dimsiss',
          dismissOnPageChange: true
        }).present().then(res => {
          this.navCtrl.push('TabsPage');
        });
      }
      ).catch(
      error => {
        this.toastController.create({
          message: error.message,
          duration: 2000,
          showCloseButton: true,
          closeButtonText: 'Dimsiss',
          dismissOnPageChange: true
        }).present();
      }
      );
  }

  ionViewWillLoad() {
    this.loginForm = this.formBuilder.group({
      emailaddress: '',
      password: ''
    });
  }
}
