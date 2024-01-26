import { Injectable } from '@angular/core';
import { URL_CONSTANTS } from '../shared/URLConstants';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { GeneratedSmallUrl } from '../processor/generated-url';

@Injectable({
  providedIn: 'root'
})
export class ProcessURLService {

  constructor(private http: HttpClient) { }

  public generateSmallURL(url : string) : Promise<GeneratedSmallUrl>{
    const endpointUrl = URL_CONSTANTS.baseURL + URL_CONSTANTS.addUrl;
    const payload = {'url' : url};
    const jwt = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Content-Type','application/json');
    if(jwt){
      headers.set('Authorization', 'Bearer ' + jwt);
    }
    return new Promise((resolve,reject) => {
      this.http.post(endpointUrl, payload, {headers:headers})
      .subscribe({
        next:((res : GeneratedSmallUrl) => {
          if(res){
            resolve(res);
          } else {
            reject();
          }
          console.log('KutieURL generated successfully.');
        }),
        error: ((err) => {
          console.log('Error generating KutieURL.');
          console.log(err);
          reject();
        })
      })
    })
  }
}
