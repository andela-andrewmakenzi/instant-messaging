import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { AuthserviceProvider } from '../providers/authservice/authservice';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = '';

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private authProvider: AuthProvider,
    private authServiceProvider: AuthserviceProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    /**
     * check if user is logged in to determine where to take them
     */
    this.authProvider.isAuthenticated().subscribe(
      res => {
        if(res && res.uid) {
          this.rootPage = 'TabsPage';;
        } else {
          this.rootPage = 'LoginPage';
        }
      }
    )
  }
}
