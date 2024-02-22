import { Injectable, ViewChild } from '@angular/core';
import { URL_CONSTANTS } from '../shared/URLConstants';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { UserDetails } from '../shared/user-details';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  @ViewChild('myRecaptchaElement') captcha: any;
  token : string = undefined;

  constructor(private http: HttpClient) { }

  public async checkLogin(token) : Promise<UserDetails> {
    const url = URL_CONSTANTS.baseURL + URL_CONSTANTS.checkLogin;
    const jwt = localStorage.getItem('jwt');
    if(!jwt){
      return new Promise((resolve,reject) => {reject();})
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
              resolve(res);
            }
          }),
          error: ((err) => {
            console.log('User login verification failed');
            reject();
          })
        })
      });
    } catch(e) {
      console.error('An error occured', e);
    }
  }

  public logOut() : void {
    localStorage.removeItem('jwt');
    if(window.location.href.includes('jwt')){
      window.history.pushState({}, document.title, window.location.pathname);
    }
    window.location.reload();
  }
}
