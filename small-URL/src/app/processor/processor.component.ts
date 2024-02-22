import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { ProcessURLService } from '../services/process-url.service';
import { GeneratedSmallUrl } from './generated-url';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-processor',
  templateUrl: './processor.component.html',
  styleUrls: ['./processor.component.css']
})
export class ProcessorComponent implements OnInit {

  url = '';
  errorMsg = '';
  smallURL = '';
  displayURL = '';
  token : string = 'undefined';

  constructor(public snackBar: MatSnackBar, private processURLService : ProcessURLService, private clipboard : Clipboard, private recaptchaV3Service: ReCaptchaV3Service) { }

  async ngOnInit(): Promise<void> {
    await this.recaptchaV3Service.execute('create_url').subscribe(async (token : string) => {
      this.token = token;
    });
  }

  shortenUrl(){
    if(this.url === '') {
      this.errorMsg='Please enter a URL to continue.'
      this.snackBar.open(this.errorMsg, 'close', {duration: 3000});
    } else if(!this.processURLService.checkHttpUrl(this.url)){
      this.errorMsg="Check the format of the entered URL. Be sure to include the protocol: 'http or https'";
      this.snackBar.open(this.errorMsg, 'close', {duration: 3000});
    } else {
      this.processURLService.generateSmallURL(this.url, this.token).then((retVal : GeneratedSmallUrl) => {
        this.smallURL = retVal.callUrl;
        this.displayURL = this.url;
        this.url = '';
        this.clipboard.copy(retVal.callUrl);
        this.snackBar.open('URL copied to clipboard', 'close', {duration: 3000});
      }).catch((e)=>{
        this.errorMsg='An unfortunate error occured generating the URL.'
        this.snackBar.open(this.errorMsg, 'close', {duration: 3000});
      });
    }
  }

  
}
