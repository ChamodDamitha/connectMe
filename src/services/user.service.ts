import {Storage} from '@ionic/storage';
import {Injectable, NgModule} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {ToastController} from 'ionic-angular';
import "rxjs/add/operator/map";
import {createUrl} from "google-maps";

@NgModule()
@Injectable()
export class UserService {
  constructor(private storage: Storage, private http: Http, private toastCtrl: ToastController) {
  }


  createUrl(url, params) {
    let keys = Object.keys(params);
    if (keys.length > 0) {
      url += "?" + keys[0] + "=" + params[keys[0]];
    }
    for (let i = 1; i < keys.length; i++) {
      url += "&" + keys[i] + "=" + params[keys[i]];
    }
    return url;
  }

  signin(): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("Content-Type", "text/json");

      let params = {
        name: "cds",
        email: "cds@gmail.com"
      };

      let url = this.createUrl('http://192.168.8.100:8080/geoConnector/rest/geo/users', params);

      this.http.post(url, headers)
        .map(res => res.json())
        .subscribe(
          // console.log(data);
          response => {
            console.log("Success Response" + response);
            this.storage.set("user_name", params.name);
            this.storage.set("user_email", params.email);
            resolve(response);
          },
          error => {
            console.log("Error happened" + error);
            this.storage.set("user_name", params.name);
            this.storage.set("user_email", params.email);
            reject(error);
          },
          function () {
            console.log("the subscription is completed");
          }
        );
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
