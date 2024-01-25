import { Injectable } from '@angular/core';
import { URL_CONSTANTS } from '../shared/URLConstants';
import {HttpClient, HttpHeaders} from "@angular/common/http";

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
}
