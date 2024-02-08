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

constructor(private router : Router, private urlDataService : URLDataService, private processUrlService : ProcessURLService) {
  let shortCode = localStorage.getItem('shortCode');
  if(shortCode){
    urlDataService.getUrlDetailsSimple(shortCode).then((data) => {
      if(data){
        localStorage.removeItem('shortCode');
        processUrlService.redirect(URL_CONSTANTS.kutieURLBase + '/' + shortCode);
      } else {
        console.error('Could not find the path specified.');
        localStorage.removeItem('shortCode');
        window.location.href = URL_CONSTANTS.kutieURLBase;
      }
    }).catch((e) => {
      console.error('Could not find the path specified.');
      localStorage.removeItem('shortCode');
      window.location.href = URL_CONSTANTS.kutieURLBase;
    });
    }
  }
  
}
