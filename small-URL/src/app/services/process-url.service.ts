import { Injectable } from '@angular/core';
import { URL_CONSTANTS } from '../shared/URLConstants';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { GeneratedSmallUrl } from '../processor/generated-url';

@Injectable({
  providedIn: 'root'
})
export class ProcessURLService {

  constructor(private http: HttpClient) { }

  public async generateSmallURL(url : string, token : string) : Promise<any>{
    const endpointUrl = URL_CONSTANTS.baseURL + URL_CONSTANTS.addUrl;
    const payload = {'url' : url};
    const jwt = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', 'Bearer ' + jwt).set('g-recaptcha-token',token);
      if(!jwt){
        headers.delete('Authorization');
      }
      return new Promise((resolve,reject) => {
        if(!token) {
          reject();
        }
        this.http.post(endpointUrl, payload, {headers:headers})
        .subscribe({
          next:((res : GeneratedSmallUrl) => {
            if(res){
              resolve(res);
            } else {
              reject();
            }
          }),
          error: ((err) => {
            console.log('Error generating KutieURL.');
            reject();
          })
        });
      });
  }

  public redirect(shortCode : string) {
    window.location.href = URL_CONSTANTS.baseURL + URL_CONSTANTS.urlManagement + shortCode;
  }

  public checkHttpUrl(url : string) {
    let givenURL;
    try {
        givenURL = new URL(url);
    } catch (error) {
        console.log("There was a problem with the URL entered.");
        return false;  
    }
    return givenURL.protocol === "http:" || givenURL.protocol === "https:";
  }
}
