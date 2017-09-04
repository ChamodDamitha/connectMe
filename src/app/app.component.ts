import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {UserService} from "../services/user.service";
import {LocationService} from "../services/location.service";
import {HttpService} from "../services/http.service";

import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse
} from '@ionic-native/background-geolocation';


@Component({
  templateUrl: 'app.html',
  providers: [UserService, LocationService, HttpService, BackgroundGeolocation]
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private backgroundGeolocation: BackgroundGeolocation, private locationService: LocationService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.backgroundGeolocation.configure(locationService.config)
        .subscribe((location: BackgroundGeolocationResponse) => {
          locationService.sendLocation(location);
          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
          // this.backgroundGeolocation.finish(); // FOR IOS ONLY
        });

// start recording location
      this.backgroundGeolocation.start();

// If you wish to turn OFF background-tracking, call the #stop method.
//       this.backgroundGeolocation.stop();


    });


  }


}
