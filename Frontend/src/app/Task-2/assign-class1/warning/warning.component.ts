import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data1: any,private _dialog: MatDialog, private _api: TourService) { }

  ngOnInit(): void {
    this.data1
  }

  delete(){
    this._api.deleteclass(this.data1).subscribe((res) => {
        if (res ==true)  {
          this._api.studentdetails().subscribe((res) => {
          });
        }
    });
  }

}
