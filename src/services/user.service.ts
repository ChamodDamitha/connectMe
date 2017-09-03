import {Storage} from '@ionic/storage';
import {Injectable, NgModule} from '@angular/core';
import {HTTP} from '@ionic-native/http';

@NgModule()
@Injectable()
export class UserService {
  constructor(private storage: Storage, private http: HTTP) {
  }

  signin(): Promise<any> {
    console.log("signin works....................")
    let name = "Chamod";
    let email = "cds@gmail.com";

    return new Promise((resolve, reject) => {
        this.http.post('http://192.168.8.101:8080/geoConnector/rest/geo/users', {name: name, email: email}, {})
          .then(data => {
            resolve(data);

            this.storage.set("user_name", name);
            this.storage.set("user_email", email);

            console.log(data.status);
            console.log(data.data); // data received by server
            console.log(data.headers);

          })
          .catch(error => {
            reject(error);
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);

          });
      }
    );

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
