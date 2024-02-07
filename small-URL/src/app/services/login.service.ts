import { Injectable } from '@angular/core';
import { URL_CONSTANTS } from '../shared/URLConstants';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { UserDetails } from '../shared/user-details';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public checkLogin() : Promise<UserDetails> {
    const url = URL_CONSTANTS.baseURL + URL_CONSTANTS.checkLogin;
    const jwt = localStorage.getItem('jwt');
    if(!jwt){
      return new Promise((resolve, reject) => {reject()});
    }
    const headers = new HttpHeaders().set('Content-Type','application.json')
                                      .set('Authorization', 'Bearer ' + jwt);
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
  }

  public logOut() : void {
    localStorage.removeItem('jwt');
    if(window.location.href.includes('jwt')){
      window.history.pushState({}, document.title, window.location.pathname);
    }
    window.location.reload();
  }
}
