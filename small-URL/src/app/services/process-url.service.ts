import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessURLService {

  constructor() { }

  public generateSmallURL(url : string) : Promise<string>{
    return new Promise((resolve,reject) => {
      if(url !== '' || url){
        resolve('https://www.smallURL.co.in/m23sn');
      } else {
        reject('Error generating URL');
      }
    })
  }
}
