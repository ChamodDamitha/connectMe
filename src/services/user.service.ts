import {Storage} from '@ionic/storage';
import {Injectable, NgModule} from '@angular/core';
import "rxjs/add/operator/map";
import {HttpService} from "./http.service";

@NgModule()
@Injectable()
export class UserService {
  constructor(private storage: Storage, private httpService : HttpService) {
  }

  signin(): Promise<any> {
    return new Promise((resolve, reject) => {
      let params = {
        name: "cds",
        email: "cds@gmail.com"
      };
      let url = 'http://192.168.8.100:8080/geoConnector/rest/geo/users';

      this.httpService.post(url, params)
        .then(data => {
          console.log("Success Response" + data);
          this.storage.set("user_name", params.name);
          this.storage.set("user_email", params.email);
          resolve(data);
        })
        .catch(error => {
          console.log("Error happened" + error);
          reject(error);
        });
    });
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
