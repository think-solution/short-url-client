import { Component, OnInit } from '@angular/core';import { LoginService } from '../services/login.service';
import { UserDetails } from '../shared/user-details';
;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedIn : boolean = false;
  userFirstName : string = '';

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
    if(window.location.href.includes('jwt')){
      var jwt = new URLSearchParams(window.location.search).get('jwt');
      localStorage.setItem('jwt', jwt);
      window.history.pushState({}, document.title, window.location.pathname);
      window.location.reload();
    }
  }

}
