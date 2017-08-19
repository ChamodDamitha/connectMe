import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {LoadingController} from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  name: string = "";
  email: string = "";

  constructor(public navCtrl: NavController, private userService: UserService, public loadingCtrl: LoadingController) {
    this.init();
  }

  init() {
    this.userService.getLoggedUserName().then(userName => this.name);
    this.userService.getLoggedUserEmail().then(email => this.email);
  }

  signin() {
    let loader = this.loadingCtrl.create({
      content: "Signing..."
    });
    loader.present();
    this.userService.signin()
      .then(function (data) {
          console.log(data);
          loader.dismiss();
        }
      )
      .catch(function (err) {
        loader.dismiss();
      })
    ;
  }

}
