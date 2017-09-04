import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {LoadingController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  name: string = "";
  email: string = "";

  constructor(public navCtrl: NavController, private userService: UserService, public loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
    this.setLoggedUserDetails();
  }

  setLoggedUserDetails() {
    this.userService.getLoggedUserName().then(userName => {
      this.name = userName;
    });
    this.userService.getLoggedUserEmail().then(email => {
      this.email = email;
    });
  }

  signin() {
    let loader = this.loadingCtrl.create({
      content: "Signing..."
    });
    loader.present();
    this.userService.signin()
      .then(data => {
        console.log("signed promise");
        let toast = this.toastCtrl.create({
          message: "data : " + data,
          duration: 3000
        });
        toast.present();
        this.setLoggedUserDetails();
        loader.dismiss();
      })
      .catch(error => {
        console.log("not signed error");
        let toast = this.toastCtrl.create({
          message: "error : " + error,
          duration: 3000
        });
        toast.present();
        loader.dismiss();
      });
  }

}
