import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  errorMsg: string;
}

@Component({
  selector: 'app-processor',
  templateUrl: './processor.component.html',
  styleUrls: ['./processor.component.css']
})
export class ProcessorComponent implements OnInit {

  url = 'Enter your URL and hit GO!';
  errorMsg = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  shortenUrl(){
    if(this.url === ''){
      this.errorMsg='Please enter a URL to continue.'
      this.dialog.open(ErrorDialog,{data:{errorMsg: this.errorMsg}});
    }
  }

  
}

@Component({
  selector: 'error-dialog',
  templateUrl: 'processor.errorMsg.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ErrorDialog {
  constructor(public dialogRef: MatDialogRef<ErrorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData){
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
