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
    if(!jwt){
      return new Promise((resolve, reject) => {reject()});
    }
    const headers = new HttpHeaders().set('Content-Type','application.json')
                                      .set('Authorization', 'Bearer ' + jwt);
    if(this.grecaptchaId){
      try {
        var token = await this.executeRecaptcha();
        if(token)
          headers.set('g-recaptcha-token',token)
      return new Promise((resolve, reject) => {
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
    } else {
      return new Promise((resolve,reject) => { reject();});
    }
  }

  public executeRecaptcha() : any {
    var retVal = null;
    grecaptcha.execute(this.grecaptchaId, {action: 'create_url'}).then((token) => {
      retVal = token;
    }).catch((err) => {console.error(err);});
    return retVal;
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
