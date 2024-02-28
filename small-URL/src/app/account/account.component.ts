import { Component, OnInit } from '@angular/core';
import { URLDataService } from '../services/urldata.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';
import { UserDetails } from '../shared/user-details';
import { URL_CONSTANTS } from '../shared/URLConstants';
import { ProcessURLService } from '../services/process-url.service';
import { UserDetailsSimple } from '../shared/url-details-simple';
import { ClicksPerDay } from '../shared/clicks-per-day';
import { ReCaptchaV3Service } from 'ng-recaptcha';
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
  url : string = '';
  urlData : {};
  urlDataColumns: string[] = ['position', 'date', 'count'];

  //Login mode
  userURLData : [];
  userURLDataColumns: string[] = ['position', 'date', 'deviceType', 'client', 'ip', 'location', 'coordinates'];
  userAnalyticsData = {};

  constructor(private urlDataService : URLDataService, public snackBar: MatSnackBar
    , private loginService : LoginService, private processURLService : ProcessURLService
    , private recaptchaV3Service: ReCaptchaV3Service) { }

  async ngOnInit(): Promise<void> {
    await this.recaptchaV3Service.execute('check_login').subscribe(async (token : string) => {
      await this.loginService.checkLogin(token).then((data : UserDetails) => {
        if(data){
          this.loggedIn = true;
          this.getUserUrls();
        } else {
        this.loggedIn = false;
        }
        return data;
      }).catch((err) => {
        console.log('An error has occured.');
        this.loggedIn = false;
      });
    });
  }

  public async getUrlDetailsSimple(){
    var errorMsg = '';
    if(this.url === '') {
      this.displayGrid = false;
      errorMsg='Please enter Kutie URL Short Code to continue';
      this.snackBar.open(errorMsg, 'close', {duration: 3000});
    } else if(!this.processURLService.checkHttpUrl(this.url)){
      this.displayGrid = false;
      errorMsg="Check the format of the entered URL. Be sure to include the protocol: 'http or https'";
      this.snackBar.open(errorMsg, 'close', {duration: 3000});
    } else {
      if(this.url === URL_CONSTANTS.kutieURLBase || this.url === URL_CONSTANTS.kutieURLBase + '/'){
        errorMsg="Please enter the complete Kutie URL with the short code in the end. Ex: '/abc12'"
        this.snackBar.open(errorMsg, 'close', {duration: 5000});
      } else if(this.url.startsWith(URL_CONSTANTS.kutieURLBase)){
        let urlArray = this.url.split('/');
        let shortCode = urlArray[urlArray.length - 1];
        await this.recaptchaV3Service.execute('get_url_details_simple').subscribe(async (token : string) => {
          this.urlData = await this.urlDataService.getUrlDetailsSimple(shortCode, token)
          .then((data : UserDetailsSimple) => { 
            if(data){
              this.displayGrid = true;
              data.createdAt = new Date(data.createdAt).toUTCString();
              data.clicksPerday.forEach((c : ClicksPerDay) => {
                c.date = new Date(c.date).toUTCString();
              });
              return data;
            }
          }).catch((err) => {
            this.displayGrid = false;
            errorMsg='Error occured while fetching URL data. Please try again.';
            this.snackBar.open(errorMsg, 'close', {duration: 3000});
            return {};
          });
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

  public async getUserUrls(){
    this.displayGrid = true;
    await this.recaptchaV3Service.execute('get_user_urls').subscribe(async (token : string) => {
      this.userURLData = await this.urlDataService.getUserUrls(token);
    });
  }

  public async getAnalyticsData(id : number){
    await this.recaptchaV3Service.execute('get_analytics_data').subscribe(async (token : string) => {
      this.userAnalyticsData = await this.urlDataService.getUserIdDetails(id, token);
    });
  }

  public downloadData(id : number){
    this.urlDataService.downloadData(id);
  }
}
