import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TourService } from '../services/tour.service';
import { DataSharingService } from '../services/data-sharing/data-sharing-service';

@Component({
  selector: 'app-tourist-register',
  templateUrl: './tourist-register.component.html',
  styleUrls: ['./tourist-register.component.scss'],
})
export class TouristRegisterComponent implements OnInit {
  city!: string;
  address1!: string;
  address2!: string;
  pincode!: string;
  phone!: number;

  currentDate = new Date();

  countries: any[] = [
    { value: 'India', viewValue: 'India' },
    { value: 'Afghanistan', viewValue: 'Afghanistan' },
    { value: 'Aland Islands', viewValue: 'Aland Islands' },
    { value: 'AmericanSamoa', viewValue: 'AmericanSamoa' },
    { value: 'Algeria ', viewValue: 'Algeria' },
    { value: 'Albania ', viewValue: 'Albania' },
    { value: 'Angola ', viewValue: 'Angola' },
    { value: 'Andorra ', viewValue: 'Andorra' },
    { value: 'Belize', viewValue: 'Belize' },
    { value: 'Burundi ', viewValue: 'Burundi' },
    { value: 'Botswana ', viewValue: 'Botswana' },
    { value: 'Belize ', viewValue: 'Belize' },
    { value: 'Guinea ', viewValue: 'Guinea' },
    { value: 'Georgia ', viewValue: 'Georgia' },
    { value: 'France ', viewValue: 'France' },
    { value: 'Egypt ', viewValue: 'Egypt' },
  ];

  constructor(
    private _gowtham: TourService,
    private _dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {
    // this.post_method();
    // console.log(this.post_method);
  }
  withAuditTrail = new FormGroup({
    phone: new FormControl('', Validators.required),
    first: new FormControl('', Validators.required),
    last: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
  });

  values() {
    console.log(this.withAuditTrail.value);
  }

  post_method() {
    const variable = {
      mobile_number: this.withAuditTrail.controls['phone'].value,
      firstname: this.withAuditTrail.controls['first'].value,
      lastname: this.withAuditTrail.controls['last'].value,
      dob: this.withAuditTrail.controls['dob'].value,
      gender: this.withAuditTrail.controls['gender'].value,
      country: this.withAuditTrail.controls['country'].value,
    };
    console.log(variable);

    this._gowtham.postData(variable).subscribe((res) => {
      console.log(res, 'dialog');
      this.withAuditTrail.reset();
      this._dataSharingService.updateSubmitStatus(true);
    });
  }
}
