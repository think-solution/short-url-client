import { Component, OnInit, Inject } from '@angular/core';
import { URL_CONSTANTS } from '../shared/URLConstants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginURL : string = URL_CONSTANTS.baseURL + URL_CONSTANTS.login;

  constructor() { }

  ngOnInit(): void {
  }

}
