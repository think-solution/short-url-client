import { Component } from '@angular/core';
import { URL_CONSTANTS } from './shared/URLConstants';
import { ProcessURLService } from './services/process-url.service';
import { Router } from '@angular/router';
import { URLDataService } from './services/urldata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'small-URL';

  constructor(private router : Router, private urlDataService : URLDataService) {
    let path = window.location.href;
    let routeArr = URL_CONSTANTS.routes.split(',');
    if(!(path === URL_CONSTANTS.kutieURLBase || path === URL_CONSTANTS.kutieURLBase + '/')){ //If absolute path, continue
      if(path.startsWith(URL_CONSTANTS.kutieURLBase)){
        let shortCode = path.substring(50); //Might need updating once domain is confirmed for production.
        if(routeArr.includes(shortCode)){
          //Internal rountes, do nothing.
        } else {
          urlDataService.getUrlDetailsSimple(shortCode).then((data) => {
            if(data){
              //Correct shortCode, do nothing. Backend will handle any redirection.
            } else {
              console.error('Could not find the path specified.');
              window.location.href = URL_CONSTANTS.kutieURLBase;
            }
          }).catch((e) => {
            console.error('Could not find the path specified.');
            window.location.href = URL_CONSTANTS.kutieURLBase;
          });
        }
      }
    }
  }
}
