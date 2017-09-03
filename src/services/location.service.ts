import {Injectable, NgModule} from '@angular/core';
import {ToastController} from 'ionic-angular';
import {
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse
} from '@ionic-native/background-geolocation';

@NgModule()
@Injectable()
export class LocationService {
  public const
  config: BackgroundGeolocationConfig = {
    desiredAccuracy: 10,
    stationaryRadius: 20,
    distanceFilter: 30,
    debug: true, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    interval: 5000,
  };

  constructor(private toastCtrl: ToastController) {

  }


  sendLocation(location: BackgroundGeolocationResponse) {
    let toast = this.toastCtrl.create({
      message: "Location : " + location.latitude,
      duration: 3000
    });
    toast.present();
    console.log(location);
  }
}
