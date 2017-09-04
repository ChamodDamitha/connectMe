import {Injectable, NgModule} from '@angular/core';
import {Http, Headers} from '@angular/http';
import "rxjs/add/operator/map";

@NgModule()
@Injectable()
export class HttpService {
  constructor(private http: Http) {
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

  post(url, params): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("Content-Type", "text/json");
      let newUrl = this.createUrl(url, params);
      this.http.post(newUrl, headers)
        .map(res => res.json())
        .subscribe(
          // console.log(data);
          response => {
            console.log("Success Response" + response);
            resolve(response);
          },
          error => {
            console.log("Error happened" + error);
            reject(error);
          },
          function () {
            console.log("the subscription is completed");
          }
        );
    });
  }
}
