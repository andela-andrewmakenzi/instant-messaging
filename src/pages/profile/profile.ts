import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  LoadingController
} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { User as Profile } from '../../models/users.interface';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  form: FormGroup;
  name: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private auth: AuthProvider,
    private authService: AuthserviceProvider,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private loader: LoadingController
  ) {
  }

  ionViewDidLoad() {
  }

  ionViewWillLoad() {
    this.form = this.formBuilder.group({
      name: ''
    });
  }

  ionViewWillEnter() {
    const animation = this.loader.create({ content: 'Fetching your profile' });
    animation.present();
    this.auth.isAuthenticated().subscribe(
      res => {
        this.authService.fetchProfileInformation().subscribe(
          res => {
            if (res.name) {
              this.form.get('name').setValue(res.name);
            }
            animation.dismiss();
          }
        )
      }
    )
  }

  updateProfile() {
    const name = this.form.value.name;
    const profile: Profile = { name: name };
    if (!name) {
      return;
    }

    if (!this.authService.isLoggedIn()) {
      this.navCtrl.setRoot('HomePage');
    }

    // @todo show loading bars/spinners are this happends
    this.authService.updateUserProfile(profile).then(
      res => {
        this.toastCtrl.create({
          message: 'Successfully updated profile',
          duration: 2000,
          showCloseButton: true,
          closeButtonText: 'Close',
          dismissOnPageChange: true,
          cssClass: 'success'
        }).present()
        this.navCtrl.setRoot('TabsPage');
      }
    ).catch(
      error => {
        this.toastCtrl.create({
          message: error.message,
          duration: 2000,
          cssClass: 'error'
        }).present();
      }
      )
  }
}
