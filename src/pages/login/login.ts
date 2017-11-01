import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/users.interface';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  form: FormGroup;
  user = {} as User;

  constructor(
    private navCtrl: NavController,
    private auth: AuthProvider,
    private authServiceProvider: AuthserviceProvider,
    private formBuilder: FormBuilder,
    private toastController: ToastController

  ) {
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  login() {
    if (this.form.value.email == '' || this.form.value.password == '') {
      this.toastController.create({
        message: 'please provide email and password values',
        duration: 3000,
        dismissOnPageChange: true,
        showCloseButton: true,
        closeButtonText: 'Dismiss'
      }).present();
      return;
    }

    this.user.emailaddress = this.form.value.email;
    this.user.password = this.form.value.password;
    this.auth.signIn(this.user).then(
      res => {
        // @todo find out why the toaster code generates an error
        // this.toastController.create({
        //   message: 'Login Successful',
        //   duration: 1000,
        //   dismissOnPageChange: true
        // }).present();
        this.authServiceProvider.userFilledProfile().subscribe(
          res => {
            res.name ? this.navCtrl.setRoot('TabsPage') : this.navCtrl.setRoot('ProfilePage');
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

  ionViewCanEnter() {
  }
}
