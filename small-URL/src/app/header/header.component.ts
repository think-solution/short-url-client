import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserDetails } from '../shared/user-details';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userFirstName : string = '';
  loggedIn : boolean = false;

  constructor(private loginService : LoginService, public router : Router) { }

  async ngOnInit(): Promise<void> {
    await this.loginService.checkLogin().then((data : UserDetails) => {
      if(data){
        this.userFirstName = data.firstName;
        this.loggedIn = true;
      } else {
        this.userFirstName = '';
      this.loggedIn = false;
      }
      return data;
    }).catch((err) => {
      console.log('An error has occured.');
      this.userFirstName = '';
      this.loggedIn = false;
    });
  }

  public removeOverflow(){
    var elements = Array.from(document.getElementsByClassName('mat-menu-panel') as HTMLCollectionOf<HTMLElement>);
    if(elements){
      elements.forEach((element) => {
        element.setAttribute('style','overflow:hidden !important')
      })
    }
  }

  public logOut() : void {
    this.loginService.logOut();
    var loginInfo = this.loginService.checkLogin();
    this.loggedIn = loginInfo ? true : false;
  }

}
