import { Injectable } from '@angular/core';
import { URL_CONSTANTS } from '../shared/URLConstants';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class URLDataService {

  constructor(private http: HttpClient) { }

  public getUrlDetailsSimple(shortCode : string) : Promise<{}> {
    const url = URL_CONSTANTS.baseURL + URL_CONSTANTS.analyticsInfo + shortCode;
    const headers = new HttpHeaders().set('Content-Type','application.json');
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers:headers})
      .subscribe({
        next:((res) => {
          console.log('Simple URL details fetched successfully.');
          resolve(res);
        }),
        error: ((err) => {
          console.log('Error getting simple URL details');
          console.log(err);
          reject();
        })
      })
    });
  }

  public getUserUrls() : Promise<[]> {
    const url = URL_CONSTANTS.baseURL + URL_CONSTANTS.listUrl;
    const jwt = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
    return new Promise((resolve,reject) => {
      if(!jwt){
        reject();
      }
      this.http.get(url, {headers:headers})
      .subscribe({
        next:((res : []) => {
          console.log('User URLs fetched successfully.');
          resolve(res);
        }),
        error: ((err) => {
          console.log('Error getting user URLs');
          console.log(err);
          reject();
        })
      })
    })
  }

  public getUserIdDetails(id : number) : Promise<{}> {
    const url = URL_CONSTANTS.baseURL + URL_CONSTANTS.analytics + id;
    const jwt = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
    return new Promise((resolve,reject) => {
      if(!jwt){
        reject();
      }
      this.http.get(url, {headers:headers})
      .subscribe({
        next:((res) => {
          console.log('User URLs fetched successfully.');
          resolve(res);
        }),
        error: ((err) => {
          console.log('Error getting user URLs.');
          console.log(err);
          reject();
        })
      })
    })
  }

  public downloadData(id : number) : Promise<void> {
    const url = URL_CONSTANTS.baseURL + URL_CONSTANTS.download + id;
    const jwt = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
    //headers.set({responseType: 'text'})
    return new Promise((resolve,reject) => {
      if(!jwt){
        reject();
      }
      this.http.get(url, {headers:headers, responseType : 'text'})
      .subscribe({
        next:((res) => {
          if(res) {
            console.log('URL details successfully fetched for download.');
            // var blob = new Blob([res], { type: 'text/xml' });
            // var url= window.URL.createObjectURL(blob);
            // window.open(url);
            var blob = new Blob([res],{
              type:'application/ms-excel'
            })

            let url = window.URL.createObjectURL(blob);
            let pwa = window.open(url);
            if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
                alert( 'Please disable your Pop-up blocker and try again.');
            }
            // var url = URL.createObjectURL(blob);
            // var element = document.createElement('a');
            // element.href = url;
            // element.setAttribute('download','file.csv');
            // document.body.appendChild(element);
            // element.click();
            // resolve();
          }
          
        }),
        error: ((err) => {
          console.log('Error getting user URLs URL details for download.');
          console.log(err);
          reject();
        })
      })
    })
  }

}