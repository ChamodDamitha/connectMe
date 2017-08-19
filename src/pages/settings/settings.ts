import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  name: string = "";
  email: string = "";

  constructor(public navCtrl: NavController, private userService: UserService) {
    this.init();
  }

  init() {
    this.userService.getLoggedUserName().then(userName => this.name = userName);
    this.userService.getLoggedUserEmail().then(email => this.email = email);
  }

  signin() {
    this.userService.signin();
  }

}
