import { Injectable } from '@angular/core';
import { URL_CONSTANTS } from '../shared/URLConstants';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class URLDataService {

  constructor(private http: HttpClient, private loginService : LoginService) { }

  public async getUrlDetailsSimple(shortCode : string) : Promise<{}> {
    const url = URL_CONSTANTS.baseURL + URL_CONSTANTS.analyticsInfo + shortCode;
    var token = undefined;

    await this.loginService.executeRecaptcha().then(() => {
      token = localStorage.getItem('token');
    }).catch((e) => {
      console.error('An error occured', e);
      return new Promise((resolve, reject) => {reject(e);});
    });
    const headers = new HttpHeaders().set('Content-Type','application.json').set('g-recaptcha-token',token);
    
    return new Promise((resolve, reject) => {
      if(!token) {
        reject();
      }
      this.http.get(url, {headers:headers})
      .subscribe({
        next:((res) => {
          console.log('Simple URL details fetched successfully.');
          localStorage.removeItem('token');
          resolve(res);
        }),
        error: ((err) => {
          console.log('Error getting simple URL details');
          localStorage.removeItem('token');
          reject();
        })
      })
    });
  }

  public async getUserUrls() : Promise<[]> {
    const url = URL_CONSTANTS.baseURL + URL_CONSTANTS.listUrl;
    const jwt = localStorage.getItem('jwt');
    var token = undefined;

    await this.loginService.executeRecaptcha().then(() => {
      token = localStorage.getItem('token');
    }).catch((e) => {
      console.error('An error occured', e);
      return new Promise((resolve, reject) => {reject(e);});
    });

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt).set('g-recaptcha-token',token);
    return new Promise((resolve,reject) => {
      if(!jwt || !token){
        reject();
      }
      this.http.get(url, {headers:headers})
      .subscribe({
        next:((res : []) => {
          console.log('User URLs fetched successfully.');
          localStorage.removeItem('token');
          resolve(res);
        }),
        error: ((err) => {
          console.log('Error getting user URLs');
          localStorage.removeItem('token');
          reject();
        })
      })
    })
  }

  public async getUserIdDetails(id : number) : Promise<{}> {
    const url = URL_CONSTANTS.baseURL + URL_CONSTANTS.analytics + id;
    const jwt = localStorage.getItem('jwt');
    var token = undefined;

    await this.loginService.executeRecaptcha().then(() => {
      token = localStorage.getItem('token');
    }).catch((e) => {
      console.error('An error occured', e);
      return new Promise((resolve, reject) => {reject(e);});
    });
    
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt).set('g-recaptcha-token',token);
    return new Promise((resolve,reject) => {
      if(!jwt || !token){
        reject();
      }
      this.http.get(url, {headers:headers})
      .subscribe({
        next:((res) => {
          console.log('User URLs fetched successfully.');
          localStorage.removeItem('token');
          resolve(res);
        }),
        error: ((err) => {
          console.log('Error getting user URLs.');
          localStorage.removeItem('token');
          reject();
        })
      })
    })
  }

  public downloadData(id : number) : void {
    var url = URL_CONSTANTS.baseURL + URL_CONSTANTS.download + id;
    const jwt = localStorage.getItem('jwt');
    if(jwt){
      url = url + '?jwt=' + jwt;
      window.open(url, '_blank');
    }
  }
}