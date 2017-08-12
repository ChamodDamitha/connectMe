import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  showAddFriendPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter the email of the friend",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            console.log('email : ' + data.email);
          }
        }
      ]
    });
    prompt.present();
  }
}
