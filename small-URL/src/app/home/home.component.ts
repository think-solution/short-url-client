import { Component, OnInit } from '@angular/core';;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if(window.location.href.includes('jwt')){
      var jwt = new URLSearchParams(window.location.search).get('jwt');
      localStorage.setItem('jwt', jwt);
    }
  }

}
