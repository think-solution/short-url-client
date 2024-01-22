import { Component, OnInit, Inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Clipboard} from '@angular/cdk/clipboard';
import { ProcessURLService } from '../services/process-url.service';

@Component({
  selector: 'app-processor',
  templateUrl: './processor.component.html',
  styleUrls: ['./processor.component.css']
})
export class ProcessorComponent implements OnInit {

  url = '';
  errorMsg = '';
  smallURL = '';

  constructor(public snackBar: MatSnackBar, private processURLService : ProcessURLService, private clipboard : Clipboard) { }

  ngOnInit(): void {
  }

  shortenUrl(){
    var expression = '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})';
    var regex = new RegExp(expression);
    if(this.url === '') {
      this.errorMsg='Please enter a URL to continue.'
      this.snackBar.open(this.errorMsg, 'close', {duration: 3000});
    } else if(!this.url.match(regex)){
      this.errorMsg='Please enter the URL in the correct format'
      this.snackBar.open(this.errorMsg, 'close', {duration: 3000});
    } else {
      this.processURLService.generateSmallURL(this.url).then((retVal) => {
        this.smallURL = retVal;
        this.clipboard.copy(retVal);
        this.snackBar.open('URL copied to clipboard', 'close', {duration: 3000});
      }).catch((e)=>{
        this.errorMsg='An unfortunate error occured generating the URL.'
        this.snackBar.open(this.errorMsg, 'close', {duration: 3000});
      });
    }
  }

  
}

// Use Snackbar instead of dialog
// Check is Axios is available for Angular
// Check if google(whatsapp) URL is redirecting to google using Axios
