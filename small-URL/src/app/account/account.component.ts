import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  smallUrl : string = '';
  loggedIn : boolean = true;
  urlData : {};
  urlDataColumns: string[] = ['position', 'date', 'count'];
  userURLData : {};
  userURLDataColumns: string[] = ['position', 'date', 'deviceType', 'client', 'ip', 'location', 'coordinates'];
  name: string = 'Jana';

  constructor() { }

  ngOnInit(): void {
  }

  getUrlDetailsSimple(){
    this.urlData = {
      "id": 1,
      "userId": "SYSTEM",
      "shortCode": "3ciy80",
      "isExpired": false,
      "callUrl": "https://shorturl.com/3ciy80",
      "createdAt": "2024-01-07 11:11 AM",
      "totalClicks": 8,
      "clicksPerday": [
        {
          "date": "2024-01-11",
          "count": "4"
        },
        {
          "date": "2024-01-12",
          "count": "3"
        },
        {
          "date": "2024-01-19",
          "count": "1"
        }
      ]
    }
  }

  getUrlDetails(){
this.userURLData = {
  "id": 36,
  "userId": "SYSTEM",
  "shortCode": "ey1u8",
  "isExpired": false,
  "callUrl": "https://shorturl.com/ey1u8",
  "createdAt": "2024-01-21 23:21",
  "sessions": [
    {
      "sessionId": "f3ba1c51-6378-4870-a1e9-6a827177c870",
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
      "ipAddress": "38.23.170.10",
      "country": "Canada",
      "region": "ON",
      "city": "Ottawa",
      "zip": "K2A",
      "timezone": "America/Toronto",
      "isp": "Cogeco Connexion inc",
      "org": "Oxio",
      "as": "AS398721 Cogeco Connexion inc",
      "latitude": 45.3829,
      "longitude": -75.7652,
      "createdAt": "2024-01-21 23:23"
    },
    {
      "sessionId": "39dd7bab-60c4-404b-bb31-6daa1b1ed9ca",
      "os_name": "Windows",
      "os_version": "10",
      "os_platform": "x64",
      "os_family": "Windows",
      "client_type": "browser",
      "client_name": "Firefox",
      "client_version": "121.0",
      "client_engine": "Gecko",
      "client_engine_version": "121.0",
      "client_family": "Firefox",
      "device_id": "",
      "device_type": "desktop",
      "device_brand": "",
      "device_model": "",
      "ipAddress": "38.23.170.10",
      "country": "Canada",
      "region": "ON",
      "city": "Ottawa",
      "zip": "K2A",
      "timezone": "America/Toronto",
      "isp": "Cogeco Connexion inc",
      "org": "Oxio",
      "as": "AS398721 Cogeco Connexion inc",
      "latitude": 45.3829,
      "longitude": -75.7652,
      "createdAt": "2024-01-21 23:31"
    }
  ]
}
  }

}
