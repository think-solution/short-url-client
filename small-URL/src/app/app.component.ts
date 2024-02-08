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
  displayContent : boolean = false;

constructor(private router : Router, private urlDataService : URLDataService, private processUrlService : ProcessURLService) {
  let shortCode = localStorage.getItem('shortCode');
  this.displayContent = localStorage.getItem('displayContent') === 'true';
  if(shortCode){
    urlDataService.getUrlDetailsSimple(shortCode).then((data) => {
      if(data){
        localStorage.removeItem('shortCode');
        processUrlService.redirect(shortCode);
      } else {
        console.error('Could not find the path specified.');
      }
    }).catch((e) => {
      console.error('Could not find the path specified.');
      });
    }
    localStorage.removeItem('shortCode');
    localStorage.setItem('displayContent', 'true');
    window.location.href = URL_CONSTANTS.kutieURLBase;
  }
  
}
