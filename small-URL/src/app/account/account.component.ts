import { Component, OnInit } from '@angular/core';
import { URLDataService } from '../services/urldata.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  //Common
  loggedIn : boolean = false;
  displayGrid : boolean = false;


  //Non-login mode
  smallUrl : string = '';
  urlData : {};
  urlDataColumns: string[] = ['position', 'date', 'count'];

  //Login mode
  userURLData : [];
  userURLDataColumns: string[] = ['position', 'date', 'deviceType', 'client', 'ip', 'location', 'coordinates'];
  userAnalyticsData = {};

  constructor(private urlDataService : URLDataService, public snackBar: MatSnackBar, private loginService : LoginService) { }

  ngOnInit(): void {
    var loginInfo = this.loginService.checkLogin();
    this.loggedIn = loginInfo ? true : false;
    if(this.loggedIn){
      this.getUrlDetails();
    }
  }

  public logOut() : void {
    this.loginService.logOut();
    var loginInfo = this.loginService.checkLogin();
    this.loggedIn = loginInfo ? true : false;
  }

  async getUrlDetailsSimple(){
    var expression = '^[a-zA-Z0-9]*';
    var regex = new RegExp(expression);
    var errorMsg = '';
    if(this.smallUrl === '') {
      this.displayGrid = false;
      errorMsg='Please enter URL shortCode to continue';
      this.snackBar.open(errorMsg, 'close', {duration: 3000});
    } else if(!this.smallUrl.match(regex)){
      this.displayGrid = false;
      errorMsg='The URL shortcode can only contain numbers and letters'
      this.snackBar.open(errorMsg, 'close', {duration: 3000});
    } else {
      this.urlData = await this.urlDataService.getUrlDetailsSimple(this.smallUrl)
      .then((data) => { 
        this.displayGrid = true;
        return data;
      }).catch((err) => {
        this.displayGrid = false;
        console.log(err);
        errorMsg='Error occured while fetching URL data';
        this.snackBar.open(errorMsg, 'close', {duration: 3000});
        return {};
      });
      if(!this.urlData){
        errorMsg='Could not find any data for the URL provided'
        this.snackBar.open(errorMsg, 'close', {duration: 3000});
      }
    }
  }

  async getUrlDetails(){
    this.displayGrid = true;
    this.userURLData = await this.urlDataService.getUserUrls();
  }

  async getAnalyticsData(id : number){
    this.userAnalyticsData = await this.urlDataService.getUserIdDetails(id);
  }
}
