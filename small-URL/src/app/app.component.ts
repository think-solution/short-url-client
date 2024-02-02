import { Component } from '@angular/core';
import { URL_CONSTANTS } from './shared/URLConstants';
import { ProcessURLService } from './services/process-url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'small-URL';

  constructor(private processURLService : ProcessURLService) {
    let path = window.location.href;
    let routeArr = URL_CONSTANTS.routes.split(',');
    if(!(path === URL_CONSTANTS.kutieURLBase || path === URL_CONSTANTS.kutieURLBase + '/')){ //If absolute path, continue
      if(path.startsWith(URL_CONSTANTS.kutieURLBase)){
        let urlArray = path.split('/');
        let shortCode = urlArray[urlArray.length - 1];
        if(routeArr.includes(shortCode)){
          //Internal rountes, do nothing.
        }
        else if(path === URL_CONSTANTS.kutieURLBase + '/' + shortCode){
          processURLService.redirect(shortCode);
        }else {
          alert('Could not recognize the provided URL, please check again.');
          throw new Error('Could not recognize the provided URL, please check again.');
        }
      }
    }
  }
}
