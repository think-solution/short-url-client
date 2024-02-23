import { Component } from '@angular/core';
import { URL_CONSTANTS } from './shared/URLConstants';
import { ProcessURLService } from './services/process-url.service';
import { Router } from '@angular/router';
import { URLDataService } from './services/urldata.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'small-URL';
  displayContent : boolean = false;

constructor(public router : Router, private urlDataService : URLDataService, private processUrlService : ProcessURLService, private recaptchaV3Service: ReCaptchaV3Service) {
  this.displayContent = localStorage.getItem('displayContent') === 'true';
  let shortCode = localStorage.getItem('shortCode');
  if(shortCode){
    this.recaptchaV3Service.execute('create_url').subscribe(async (token : string) => {
      urlDataService.getUrlDetailsSimple(shortCode, token).then((data) => {
        if(data){
          localStorage.removeItem('shortCode');
          localStorage.setItem('displayContent', 'true');
          processUrlService.redirect(shortCode, token);
        } else {
          console.error('Could not find the path specified.');
          localStorage.removeItem('shortCode');
          localStorage.setItem('displayContent', 'true');
          window.location.href = URL_CONSTANTS.kutieURLBase;
        }
      }).catch((e) => {
        console.error('Could not find the path specified.');
        localStorage.removeItem('shortCode');
        localStorage.setItem('displayContent', 'true');
        window.location.href = URL_CONSTANTS.kutieURLBase;
        });
    });
    } else {
      this.displayContent = true;
    }
  }
  
}
