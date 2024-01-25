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
  userURLData;
  userURLDataColumns: string[] = ['position', 'date', 'deviceType', 'client', 'ip', 'location', 'coordinates'];
  userAnalyticsInfo = {};
  //name: string = 'Jana';

  constructor(private urlDataService : URLDataService, public snackBar: MatSnackBar, private loginService : LoginService) { }

  ngOnInit(): void {
    var loginInfo = this.loginService.checkLogin();
    console.log('Login Info: ' + loginInfo);
    if(loginInfo){
      this.loggedIn = true;
      console.log('Login: ' + this.loggedIn);
    }
    if(this.loggedIn){
      this.getUrlDetails();
    }
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

  getUrlDetails(){
    this.displayGrid = true;
    this.userURLData = [
      {
        "id": 37,
        "userId": "3ea59288-1190-4a6b-b45f-843834590777",
        "urlId": 17,
        "shortCode": "hwbrc",
        "url": "www.instagram.com",
        "callUrl": "https://shorturl.com/hwbrc",
        "createdAt": "2024-01-22T17:58:55.371Z",
        "clickCount": "1"
      },
      {
        "id": 38,
        "userId": "3ea59288-1190-4a6b-b45f-843834590777",
        "urlId": 18,
        "shortCode": "h6qjo",
        "url": "https://www.instagram.com/",
        "callUrl": "https://shorturl.com/h6qjo",
        "createdAt": "2024-01-22T18:03:42.817Z",
        "clickCount": "1"
      }
    ]
  }

  getAnalyticsData(id){
    if(id === 37){
      this.userAnalyticsInfo = {
        "id": 37,
        "userId": "3ea59288-1190-4a6b-b45f-843834590777",
        "shortCode": "hwbrc",
        "isExpired": false,
        "callUrl": "https://shorturl.com/hwbrc",
        "createdAt": "2024-01-22T17:58:55.371Z",
        "sessions": [
          {
            "sessionId": "d16802e5-849f-4b12-b5ca-7f3c8fcddb33",
            "os_name": "Windows",
            "os_version": "10",
            "os_platform": "x64",
            "os_family": "Windows",
            "client_type": "browser",
            "client_name": "Chrome",
            "client_version": "120.0.0.0",
            "client_engine": "Blink",
            "client_engine_version": "120.0.0.0",
            "client_family": "Chrome",
            "device_id": "",
            "device_type": "desktop",
            "device_brand": "",
            "device_model": "",
            "ipAddress": "4.19.72.62",
            "country": "United States",
            "region": "MN",
            "city": "Minneapolis",
            "zip": "55440",
            "timezone": "America/Chicago",
            "isp": "Level 3 Communications, Inc.",
            "org": "Level 3, LLC",
            "as": "AS3356 Level 3 Parent, LLC",
            "latitude": 44.9778,
            "longitude": -93.265,
            "createdAt": "2024-01-22T18:01:00.218Z"
          }
        ]
      };
    } else {
      this.userAnalyticsInfo = {
        "id": 38,
        "userId": "3ea59288-1190-4a6b-b45f-843834590777",
        "shortCode": "h6qjo",
        "isExpired": false,
        "callUrl": "https://shorturl.com/h6qjo",
        "createdAt": "2024-01-22T18:03:42.817Z",
        "sessions": [
          {
            "sessionId": "e100e2d2-6b79-4d28-b309-24c8f95a9402",
            "os_name": "Windows",
            "os_version": "10",
            "os_platform": "x64",
            "os_family": "Windows",
            "client_type": "browser",
            "client_name": "Chrome",
            "client_version": "120.0.0.0",
            "client_engine": "Blink",
            "client_engine_version": "120.0.0.0",
            "client_family": "Chrome",
            "device_id": "",
            "device_type": "desktop",
            "device_brand": "",
            "device_model": "",
            "ipAddress": "4.19.72.62",
            "country": "United States",
            "region": "MN",
            "city": "Minneapolis",
            "zip": "55440",
            "timezone": "America/Chicago",
            "isp": "Level 3 Communications, Inc.",
            "org": "Level 3, LLC",
            "as": "AS3356 Level 3 Parent, LLC",
            "latitude": 44.9778,
            "longitude": -93.265,
            "createdAt": "2024-01-22T18:03:49.934Z"
          },
          {
            "sessionId": "f0e0f028-5a3e-4d7f-8337-5bedbaf8e703",
            "os_name": "Windows",
            "os_version": "10",
            "os_platform": "x64",
            "os_family": "Windows",
            "client_type": "browser",
            "client_name": "Microsoft Edge",
            "client_version": "120.0.0.0",
            "client_engine": "Blink",
            "client_engine_version": "120.0.0.0",
            "client_family": "Internet Explorer",
            "device_id": "",
            "device_type": "desktop",
            "device_brand": "",
            "device_model": "",
            "ipAddress": "4.19.72.62",
            "country": "United States",
            "region": "MN",
            "city": "Minneapolis",
            "zip": "55440",
            "timezone": "America/Chicago",
            "isp": "Level 3 Communications, Inc.",
            "org": "Level 3, LLC",
            "as": "AS3356 Level 3 Parent, LLC",
            "latitude": 44.9778,
            "longitude": -93.265,
            "createdAt": "2024-01-23T04:15:35.984Z"
          }
        ]
      };
    }
  }
}
