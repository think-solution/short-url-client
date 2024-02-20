import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserDetails } from '../shared/user-details';
import { Router } from '@angular/router';

declare global {
  interface Window { execRecaptcha: any; }
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userFirstName : string = '';
  loggedIn : boolean = false;
  loginChecked : boolean = false;

  constructor(private loginService : LoginService, public router : Router) {
    window['grecaptchaIdChange'] = () =>  this.grecaptchaIdChange();
  }

  ngOnInit(): void {
  }

  public async grecaptchaIdChange() {
    var grecaptchaId = (<HTMLInputElement>document.getElementById('grecaptchaId')).value;
    if(grecaptchaId){
      await this.loginService.setGrecaptchaId(grecaptchaId);
    }

    let shortCode = localStorage.getItem('shortCode'); //To check if the call is from a redirect flow. If shortCode is present, do nothing and just redirect.
    if(!shortCode) {
      await this.loginService.checkLogin().then((data : UserDetails) => {
        if(data){
          this.userFirstName = data.firstName;
          this.loggedIn = true;
        } else {
          this.userFirstName = '';
          this.loggedIn = false;
        }
      }).catch((err) => {
        console.log('An error has occured.');
        this.userFirstName = '';
        this.loggedIn = false;
      });
      document.getElementById('headerTitle').click();
    }
  }

  public logOut() : void {
    this.loginService.logOut();
    var loginInfo = this.loginService.checkLogin();
    this.loggedIn = loginInfo ? true : false;
  }

}
