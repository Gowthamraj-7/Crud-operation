import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TourSelectService } from 'src/app/services/tour-select.service';
import { DateTime } from 'luxon';
@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.scss'],
})
export class AddTourComponent implements OnInit {
  constructor(
    private _country: TourSelectService,
    private _dialogRef: MatDialogRef<AddTourComponent>
  ) {}

  ngOnInit(): void {
    console.log();
  }

  countries: any[] = [
    { value: 'India', viewValue: 'India' },
    { value: 'Afghanistan', viewValue: 'Afghanistan' },
    { value: 'Aland Islands', viewValue: 'Aland Islands' },
    { value: 'AmericanSamoa', viewValue: 'AmericanSamoa' },
    { value: 'Algeria', viewValue: 'Algeria' },
    { value: 'Albania', viewValue: 'Albania' },
    { value: 'Angola', viewValue: 'Angola' },
    { value: 'Andorra', viewValue: 'Andorra' },
    { value: 'Belize', viewValue: 'Belize' },
    { value: 'Burundi', viewValue: 'Burundi' },
    { value: 'Botswana', viewValue: 'Botswana' },
    { value: 'Belize', viewValue: 'Belize' },
    { value: 'Guinea', viewValue: 'Guinea' },
    { value: 'Georgia', viewValue: 'Georgia' },
    { value: 'France', viewValue: 'France' },
    { value: 'Egypt', viewValue: 'Egypt' },
  ];

  test = new FormGroup({
    name: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),

    gender: new FormControl(''),
  });

  // Current Time
  currentTime: any = DateTime.local({
    zone: 'Asia/Kolkata',
  }).toFormat('dd MMM y h:mm a');

  post_method() {
    const variable = [
      {
        Country_select: this.test.controls['country'].value,
        country_place: this.test.controls['name'].value,
        active1: 1,
        created_user_id: 1,
      },
      {
        entry_by_user_id: 1,
        entry_type: 'insert',
        entry_datetime: this.currentTime,
      },
    ];
    // const audit = {
    //   entry_by_user_id: 1,
    //   entry_type: 'insert',
    //   entry_datetime: this.currentTime,
    // };

    console.log(variable);

    this._country.postData(variable).subscribe((res) => {
      console.log(res, 'dialog');
      if (res == 1) {
      this._dialogRef.close(1);
      }
    });
  }
}
