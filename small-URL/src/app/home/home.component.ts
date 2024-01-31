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

  async ngOnInit(): Promise<void> {
    if(window.location.href.includes('jwt')){
      var jwt = new URLSearchParams(window.location.search).get('jwt');
      localStorage.setItem('jwt', jwt);
      window.history.pushState({}, document.title, window.location.pathname);
      window.location.reload();
    }
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

  public logOut() : void {
    this.loginService.logOut();
    var loginInfo = this.loginService.checkLogin();
    this.loggedIn = loginInfo ? true : false;
  }

  public removeOverflow(){
    var elements = Array.from(document.getElementsByClassName('mat-menu-panel') as HTMLCollectionOf<HTMLElement>);
    if(elements){
      elements.forEach((element) => {
        element.setAttribute('style','overflow:hidden !important')
      })
    }
  }

}
