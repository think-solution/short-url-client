import { Injectable, ViewChild } from '@angular/core';
import { URL_CONSTANTS } from '../shared/URLConstants';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { UserDetails } from '../shared/user-details';

declare var grecaptcha: any;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private grecaptchaId : any = undefined;
  @ViewChild('myRecaptchaElement') captcha: any;

  constructor(private http: HttpClient) { }

  public async checkLogin() : Promise<UserDetails> {
    const url = URL_CONSTANTS.baseURL + URL_CONSTANTS.checkLogin;
    const jwt = localStorage.getItem('jwt');   
    var token = undefined;

    if(this.getGrecaptchaId){
      await this.executeRecaptcha().then(() => {
        token = localStorage.getItem('token');
      }).catch((e) => {
        console.error('An error occured', e);
        return new Promise((resolve, reject) => {reject(e);});
      });
    } else {
      return new Promise((resolve, reject) => {reject();});
    }

    const headers = new HttpHeaders().set('Content-Type','application.json')
                                      .set('Authorization', 'Bearer ' + jwt)
                                      .set('g-recaptcha-token',token);
    try {
      return new Promise((resolve, reject) => {
        if(!jwt || !token){
          reject();
        }
        this.http.get(url, {headers:headers})
        .subscribe({
          next:((res : UserDetails) => {
            if(res){
              console.log('User login verified successfully.');
              localStorage.removeItem('token');
              resolve(res);
            }
          }),
          error: ((err) => {
            console.log('User login verification failed');
            localStorage.removeItem('token');
            reject();
          })
        })
      });
    } catch(e) {
      console.error('An error occured', e);
      localStorage.removeItem('token');
    }
  }

  public async executeRecaptcha() {
    if(this.getGrecaptchaId){
      return await window.execRecaptcha().catch((e) => {throw e;}); 
    } else {
      return new Promise((resolve, reject) => {reject();});
    }
  }

  public logOut() : void {
    localStorage.removeItem('jwt');
    if(window.location.href.includes('jwt')){
      window.history.pushState({}, document.title, window.location.pathname);
    }
    window.location.reload();
  }

  public setGrecaptchaId(val : any){
    this.grecaptchaId = val;
  }

  public getGrecaptchaId() {
    return this.grecaptchaId;
  }
}
