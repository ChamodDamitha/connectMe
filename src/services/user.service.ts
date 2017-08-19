import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  constructor(private storage: Storage) {
  }

  signin() {
    this.storage.set("user_name", "Chamod Samarajeewa");
    this.storage.set("user_email", "chamoddamitha@gmail.com");
  }

  getLoggedUserName(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      try {
        this.storage.get("user_name").then((val) => {
          resolve(val.toString());
        });
      } catch (err) {
        console.log("error loading user name");
        reject(err);
      }
    });
  }

  getLoggedUserEmail(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      try {
        this.storage.get("user_email").then((val) => {
          resolve(val.toString());
        });
      } catch (err) {
        console.log("error loading user email");
        reject(err);
      }
    });
  }
}
