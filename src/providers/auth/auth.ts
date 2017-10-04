import { Injectable } from '@angular/core';
import { User } from '../../models/users.interface';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthProvider {
  user: User;

  constructor(private angularFire: AngularFireAuth) {
  }

  /**
   * @param User Object representing user
   * @return Observable
   */
  public signUp(user: User) {
    return this.angularFire.auth.createUserWithEmailAndPassword(user.emailaddress, user.password);
  }

  /**
   *s @param User Object representing user
   @return Observabke
   */
  public signIn(user: User) {
    return this.angularFire.auth.signInWithEmailAndPassword(user.emailaddress, user.password);
  }
}
