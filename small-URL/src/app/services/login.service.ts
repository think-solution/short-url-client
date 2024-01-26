import { Injectable } from '@angular/core';
import { URL_CONSTANTS } from '../shared/URLConstants';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public checkLogin() : Promise<{}> {
    const url = URL_CONSTANTS.baseURL + URL_CONSTANTS.checkLogin;
    const jwt = localStorage.getItem('jwt');
    if(!jwt){
      return null;
    }
    const headers = new HttpHeaders().set('Content-Type','application.json')
                                      .set('Authorization', 'Bearer ' + jwt);
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers:headers})
      .subscribe({
        next:((res) => {
          if(res){
            console.log('User login verified successfully.');
            resolve(res);
          }
        }),
        error: ((err) => {
          console.log('User login verification failed');
          console.log(err);
          reject();
        })
      })
    });
  }

  public logOut() : void {
    localStorage.removeItem('jwt');
  }
}
