import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog.component';
import { DialogData } from '../dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {
disableClose:boolean=true;

alertForm=new FormGroup({
  text:new FormControl('',Validators.required)
})
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private _dialogRef:MatDialogRef<AlertDialogComponent>) { }

  onNoClick(){
    this._dialogRef.close();
  }

  ngOnInit(): void {
    
  }

}
