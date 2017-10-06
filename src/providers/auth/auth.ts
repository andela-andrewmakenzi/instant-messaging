import { Injectable } from '@angular/core';
import { User as Profile } from '../../models/users.interface';
import { User } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthProvider {
  user: User;

  constructor(private angularFire: AngularFireAuth) {
  }

  /**
   * @param User Object representing user
   * @return Observable
   */
  public signUp(user: Profile) {
    return this.angularFire.auth.createUserWithEmailAndPassword(user.emailaddress, user.password);
  }

  /**
   *s @param User Object representing user
   @return Observable
   */
  public signIn(user: Profile) {
    return this.angularFire.auth.signInWithEmailAndPassword(user.emailaddress, user.password);
  }

  /**
   * sign out of application
   */
  public signOut() {
    this.angularFire.auth.signOut();
  }

  /**
   * @return Observable of type User i.e firebase/app
   */
  public isAuthenticated(): Observable<User> {
    return this.angularFire.authState;
  }
}
