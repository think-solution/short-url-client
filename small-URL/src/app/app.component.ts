import { Component } from '@angular/core';
import { URL_CONSTANTS } from './shared/URLConstants';
import { ProcessURLService } from './services/process-url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'small-URL';

  constructor(private processURLService : ProcessURLService, private router : Router) {
    console.log('app.component.ts');
    console.log(localStorage.getItem('shortCode'));
    console.log(window.location.href);
    let path = window.location.href;
    let code = localStorage.getItem('shortCode');
    if(code){
      localStorage.removeItem('shortCode');    
      processURLService.redirect(code);
    }
  }
}
