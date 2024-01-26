import { Component, OnInit } from '@angular/core';import { LoginService } from '../services/login.service';
;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedIn : boolean = false;

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
    var loginInfo = this.loginService.checkLogin();
    this.loggedIn = loginInfo ? true : false;
    if(window.location.href.includes('jwt')){
      var jwt = new URLSearchParams(window.location.search).get('jwt');
      localStorage.setItem('jwt', jwt);
    }
  }

  public logOut() : void {
    this.loginService.logOut();
    var loginInfo = this.loginService.checkLogin();
    this.loggedIn = loginInfo ? true : false;
  }

}
