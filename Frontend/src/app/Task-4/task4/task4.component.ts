import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TourService } from 'src/app/services/tour.service';
import { AddComponent } from '../add/add.component';
import { NotificationComponent } from '../notification/notification.component';
import { DateTime } from 'luxon';
import { DeleteComponent } from '../delete/delete.component';
import { SnackBarService } from 'src/app/services/snack-bar/snackbar.service';
import { EncryptionServiceService } from 'src/app/services/encrypt/encryption-service.service.service';
import { EncryptService } from 'src/app/services/encrypt/encrypt.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-task4',
  templateUrl: './task4.component.html',
  styleUrls: ['./task4.component.scss'],
})
// @NgModule({
//   declarations: [
//     // ... other components and pipes
//     SearchFilterPipe // Include your custom pipe here
//   ],
// })
export class Task4Component implements OnInit {
  backgroundColor: any;
  final_value: any;
  final_value1: any;
  Complete_Value: any;
  data2: any;
  due_date_time: any;
  assignmentDetails: any;
  item: any;
  mat_card_border?: number;
  due_datetime: any;
  searchText1: any;
  searchText2: any;
  searchValue: any = [];
  country1: any;
  id: any;
  User_id: any;
  encryptedData: any;
  constructor(
    private _dialog: MatDialog,
    private _api: TourService,
    private _snackBar: SnackBarService,
    private _encrypt: EncryptService
  ) {}

  ngOnInit(): void {
    this.getValue();
    this.completeValue();
    this.currentDate();
    this.searchValue = this.searchText1;
    //  setTimeout(()=>{
    //   this.due_date_time = DateTime.fromJSDate(
    //     new Date(this.final_value[0].due_datetime)
    //   ).toFormat('MM dd,yyyy TT')
    //   console.log(this.due_date_time,'from data');
    //   console.log(this.final_value[0].due_datetime,'from backend data');

    //  },3000)
    // this.encryptionService.encryptionAES(this.final_value)
    // this._data.encryptionAES(this.final_value);
    // this._data.decryptionAES()
  }

  data() {
    this._dialog.open(AddComponent, {
      width: '320px',
      height: '470px',
      disableClose: true,
    });
  }
  value() {
    this._dialog.open(NotificationComponent, { disableClose: true });
  }
  changeBackgroundColor() {
    // Change the background color here
    this.backgroundColor = 'yellow'; // Replace 'new-color' with the desired color
  }

  getValue() {
    this.country1 = 'in', 
    this.id = 9,
    this.User_id = 4335;
   
    this._api.getValue(this.country1, this.id, this.User_id).subscribe((res) => {
      // console.log(res);

      // const bytes = CryptoJS.AES.decrypt(res, secretKey);
      // // console.log(bytes,'from');

      // const plaintext = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      // console.log(plaintext,'from plain');
      const encryption = JSON.parse(this._encrypt.decryptionAES(res));
      // return encryption;
      this.final_value = encryption;
      this.final_value1 = res.due_datetime;

      // console.log(this.final_value1, 'hhhhhhhhhhhh');
      // // Format datetime
      this.due_datetime = DateTime.fromJSDate(
        new Date(this.final_value1)
      ).toFormat('yyyy-MM-dd');
      // console.log(this.due_datetime, 'due date time');
    });
  }
  // getCurrentDate(): Date {
  //   return ;
  // }

  disableBtn: boolean = true; // disable
  data3 = new Date();

  data4(item: any, i: number) {
    this.mat_card_border = i;
    this.disableBtn = false;
    console.log(item, 'from item');
    this.item = item;
  }

  edit() {
    this._dialog
      .open(AddComponent, {
        disableClose: true,
        data: {
          type: 2,
          dialog_title: 'Edit Task',
          selectedRow: this.item,
        },
        width: '320px',
        height: '470px',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.completeValue();
          this.getValue();
          this.disableBtn = true;
          this.mat_card_border = undefined;
          this._snackBar.success('Data Updated Successully');
        }
      });
  }
  click() {
    this._dialog
      .open(AddComponent, {
        disableClose: true,

        data: {
          type: 1,
          dialog_title: 'Add Task',
        },

        width: '320px',
        height: '470px',
      })
      .afterClosed()
      .subscribe((res) => {
        if ((res = true)) {
          this.getValue();
          // this._snackBar.success('Data Added Successfully')
        }
      });
  }
  delete() {
    this._dialog
      .open(DeleteComponent, {
        disableClose: true,
        data: {
          selectedRow: this.item,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.getValue();
          this.mat_card_border = undefined;
          this.disableBtn = true;
          // this.disableBtn=tru
          this._snackBar.success('Data Deleted SuccessFully');
        }
      });
  }
  completeValue() {
    (this.country1 = 'in'), (this.id = 9), (this.User_id = 4335);
    this._api
      .CompleteValue(this.country1, this.id, this.User_id)
      .subscribe((res) => {
        this.Complete_Value = res;
        // console.log(res,'res compert');
      });
  }
  currentTime: any;
  currentDate() {
    // Current Time
    this.currentTime = DateTime.local({
      zone: 'Asia/Kolkata',
    }).toFormat('yyyy-MM-dd TT');

    // // Format datetime
    // const triptime = DateTime.fromJSDate(
    //   new Date(this.final_value.due_datetime)
    // ).toFormat('yyyy-MM-dd');
    // console.log(triptime, 'due date time');
  }

  isDue(dueDatetime: Date): boolean {
    // Format datetime
    const triptime = DateTime.fromJSDate(new Date(dueDatetime)).toFormat(
      'yyyy-MM-dd'
    );
    // console.log(triptime, 'due date time');
    return dueDatetime > this.currentTime;
  }
  isDue2(dueDatetime: Date): boolean {
    // Format datetime
    const triptime = DateTime.fromJSDate(new Date(dueDatetime)).toFormat(
      'yyyy-MM-dd'
    );
    // console.log(triptime, 'due date time');
    return dueDatetime > this.currentTime;
  }
}
