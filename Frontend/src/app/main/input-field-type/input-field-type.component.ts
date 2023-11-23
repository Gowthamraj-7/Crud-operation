import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

export class Country {
  value: string = '';
  viewValue: string = '';
}

@Component({
  selector: 'app-input-field-type',
  templateUrl: './input-field-type.component.html',
  styleUrls: ['./input-field-type.component.scss'],
})
export class InputFieldTypeComponent implements OnInit {
  number: any = '';
  decimal: any = '';
  seperator: any = '';
  country: any = '';
  selectedCountryName: any;

  form = new FormGroup({
    number: new FormControl('', Validators.required),
    decimal: new FormControl('', Validators.required),
    seperator: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  DecimalOnly(e: KeyboardEvent) {
    const input = e.key;
    const check = /^[0-9]*\.?[0-9]*$/;
    if (!check.test(input)) {
      e.preventDefault();
    }
  }
  NumbersOnly(e: KeyboardEvent) {
    const input = e.key;
    const check = /^[0-9]$/;
    if (!check.test(input)) {
      e.preventDefault();
    }
  }

  selectedCountry() {
    this.selectedCountryName = this.form.controls['country'].value;
    console.log(this.selectedCountryName);
    // console.log(this.form);
  }

  countries: Country[] = [
    { value: 'IND', viewValue: 'India' },
    { value: 'AUS', viewValue: 'Australia' },
    { value: 'USA', viewValue: 'United States Of America' },
    { value: 'UK', viewValue: 'United Kingdom' },
    { value: 'JAP', viewValue: 'Japan' },
    { value: 'UAE', viewValue: 'United Arab Emirates' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
