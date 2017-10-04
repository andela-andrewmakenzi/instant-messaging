import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/users.interface';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  loginForm: FormGroup;
  user = {} as User;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private auth: AuthProvider,
    private toastController: ToastController
  ) {
  }

  register() {
    if (this.loginForm.value.email == '' || this.loginForm.value.password == '') {
      this.toastController.create({
        message: 'please provide email and password values',
        duration: 3000,
        dismissOnPageChange: true,
        showCloseButton: true,
        closeButtonText: 'Dismiss'
      }).present();
      return;
    }

    this.user.emailaddress = this.loginForm.value.emailaddress;
    this.user.password = this.loginForm.value.password;

    const auth$ = this.auth.signUp(this.user).then(
      results => {
        this.toastController.create({
          message: 'Successfully added user',
          duration: 2000,
          showCloseButton: true,
          closeButtonText: 'Dismiss',
          dismissOnPageChange: true
        }).present().then(res => {
          this.navCtrl.push('ProfilePage');
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
