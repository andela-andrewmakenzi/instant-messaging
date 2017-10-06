import { Injectable } from '@angular/core';
import { User } from 'firebase/app';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { User as Profile } from '../../models/users.interface';
import { AuthProvider } from '../auth/auth';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthserviceProvider {
  user = {} as User;

  constructor(
    private database: AngularFireDatabase,
    private auth: AuthProvider
  ) {
    // provide information for logged in user
    this.auth.isAuthenticated().subscribe(
      res => { this.user = res; } // when subscription expires, user object will be reset
    );
  }

  /**
   * check whether user is logged in/authenticated before performing any actions
   */
  isLoggedIn() {
    return this.user.uid ? true : false;
  }

  /**
   * Saves user profile information for user in different pages
   * @return boolean whether or not we can successfully identify the user
   */
  updateUserProfile(profile: Profile) {
    return this.database.object(`/profile/${this.user.uid}`).set(profile);
  }

  /**
   * use this function on login to determine whether it's their first time login in
   * if so, take them to edit their profile
   */
  userFilledProfile(): FirebaseObjectObservable<any> {
    return this.database.object(`/profile/${this.user.uid}`);
  }
}
