import { Component, OnInit } from '@angular/core';
import { URLDataService } from '../services/urldata.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';
import { UserDetails } from '../shared/user-details';
import { URL_CONSTANTS } from '../shared/URLConstants';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  //Common
  loggedIn : boolean = false;
  displayGrid : boolean = false;
  userFirstName : string = '';


  //Non-login mode
  url : string = '';
  urlData : {};
  urlDataColumns: string[] = ['position', 'date', 'count'];

  //Login mode
  userURLData : [];
  userURLDataColumns: string[] = ['position', 'date', 'deviceType', 'client', 'ip', 'location', 'coordinates'];
  userAnalyticsData = {};

  constructor(private urlDataService : URLDataService, public snackBar: MatSnackBar, private loginService : LoginService) { }

  async ngOnInit(): Promise<void> {
    await this.loginService.checkLogin().then((data : UserDetails) => {
      if(data){
        this.userFirstName = data.firstName;
        this.loggedIn = true;
        this.getUrlDetails();
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
  }

  public async getUrlDetailsSimple(){
    var expression = '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})';
    var regex = new RegExp(expression);
    var errorMsg = '';
    if(this.url === '') {
      this.displayGrid = false;
      errorMsg='Please enter Kutie URL Short Code to continue';
      this.snackBar.open(errorMsg, 'close', {duration: 3000});
    } else if(!regex.test(this.url)){
      this.displayGrid = false;
      errorMsg='The Kutie URL you have entered is in the wrong format. Please check again.'
      this.snackBar.open(errorMsg, 'close', {duration: 3000});
    } else {
      if(this.url === URL_CONSTANTS.kutieURLBase || this.url === URL_CONSTANTS.kutieURLBase + '/'){
        errorMsg="Please enter the complete Kutie URL with the short code in the end. Ex: '/abc12'"
        this.snackBar.open(errorMsg, 'close', {duration: 5000});
      } else if(this.url.startsWith(URL_CONSTANTS.kutieURLBase)){
        let urlArray = this.url.split('/');
        let shortCode = urlArray[urlArray.length - 1];
        this.urlData = await this.urlDataService.getUrlDetailsSimple(shortCode)
        .then((data) => { 
          this.displayGrid = true;
          return data;
        }).catch((err) => {
          this.displayGrid = false;
          console.log(err);
          errorMsg='Error occured while fetching URL data. Please try again.';
          this.snackBar.open(errorMsg, 'close', {duration: 3000});
          return {};
        });
        if(!this.urlData){
          errorMsg='Could not find any data for the URL provided'
          this.snackBar.open(errorMsg, 'close', {duration: 3000});
        }
      } else {
        errorMsg='Incorrect URL provided. Please try again.'
          this.snackBar.open(errorMsg, 'close', {duration: 3000});
      }
    }
  }

  public async getUrlDetails(){
    this.displayGrid = true;
    this.userURLData = await this.urlDataService.getUserUrls();
  }

  public async getAnalyticsData(id : number){
    this.userAnalyticsData = await this.urlDataService.getUserIdDetails(id);
  }

  public downloadData(id : number){
    this.urlDataService.downloadData(id);
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
