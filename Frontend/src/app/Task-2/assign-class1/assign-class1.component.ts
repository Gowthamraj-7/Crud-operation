import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TourService } from 'src/app/services/tour.service';
import { AlertComponent } from './alert/alert.component';
import { WarningComponent } from './warning/warning.component';
import { ClassAssignComponent } from '../class-assign/class-assign.component';
import { Alert1Component } from './alert1/alert1.component';

@Component({
  selector: 'app-assign-class1',
  templateUrl: './assign-class1.component.html',
  styleUrls: ['./assign-class1.component.scss'],
})
export class AssignClass1Component implements OnInit {
  data: any;

  gowtham = new FormGroup({
    select: new FormControl('', Validators.required),
  });
  constructor(
    private _dialog: MatDialog,
    private _api: TourService,
    @Inject(MAT_DIALOG_DATA) public data1: any,
    private dialogRef: MatDialogRef<AssignClass1Component>
  ) {}

  ngOnInit(): void {
    this.getdata();
  }

  getdata() {
    this._api.activeValue().subscribe((res) => {
      console.log(res, 'from data');
      this.data = res;
    });
  }
  place2: any = [];
  value1: any[] = [];
  value2: any = [];
  findVariable: any = [];
  getClassCapacity(place: any) {
    this.value2 = [];
    // console.log(place,'placeS');
    this.findVariable = this.data.find(
      (item: { class_name: any }) => item.class_name === place.class_name
    );
    this.place2 = this.findVariable.class_id;

    console.log(this.value2, 'from value2');

  }

  final_value: any = [];
  post_method() {
    this.value2 = [];
    for (let i = 0; i < this.data1.length; i++) {
      if (this.data1[i].class_id === null) {
        // console.log(this.data1[i]);
        // this.post_method();
        // this._api.assignclass(this.value1).subscribe((res) => {
        // });
      } else {
        this.value2.push(this.data1[i]);


      }
    }
    if (this.value2.length > 0) {

    } else {
      if (this.data1.length <= this.findVariable.class_capacity) {
        console.log(this.data1.length, 'll');

        console.log('ok');

        const variable = {
          class_id: this.place2,
        };

        console.log(variable.class_id, 'variable');

        this.value1.push(this.data1);
        this.value1.push(variable);
        console.log(this.value1, 'from value1');
        this._api.assignclass(this.value1).subscribe((res) => {
          console.log(res, 'from res');
          if (res == true) {
            this.dialogRef.close(true);
          }
        });
      } else {
        this.final_value.push([this.data1, this.findVariable]);
  
      }
      if (this.final_value.length > 0) {

      }
    }
  }

  dialogClose() {
    this.dialogRef.close();
  }
}
