import { Injectable } from '@angular/core';
import { User } from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
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
      res => { this.user = res; }
    );
  }

  isLoggedIn() {
    return this.user.uid ? true : false;
  }
  /**
   * Saves user profile information for user in different pages
   * @return boolean whether or not we can successfully identify the user
   */
  updateUserProfile(profile: Profile) {
    // if user is authenticated
    return this.database.object(`/profile/${this.user.uid}`).set(profile);
  }
}
