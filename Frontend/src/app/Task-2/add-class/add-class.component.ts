import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss'],
})
export class AddClassComponent implements OnInit {
  inputValue!: number;

  data = new FormGroup({
    class: new FormControl('', Validators.required),
    capacity: new FormControl('', [
      Validators.required,
      this.maxValueValidator(60),
    ]),
  });

  method() {
    const variable = {
      class_name: this.data.controls['class'].value,
      is_active: 1,
      class_capacity: this.data.controls['capacity'].value,
    };

    this.postdata(variable);
    console.log(variable, 'variable');
  }
  // Custom validator for maximum value
  maxValueValidator(maxValue: number) {
    return (control: FormControl) => {
      if (control.value > maxValue) {
        control.setValue(maxValue);
        return null;
      }
      return null;
    };
  }

  // limitInput(event: Event) {
  //   if (this.inputValue > 60) {
  //     this.inputValue = 60;
  //   }
  // }
  constructor(
    private _api: TourService,
    private _dialogRef: MatDialogRef<AddClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data1: any
  ) {}
  title: any;
  selectedId: any;
  ngOnInit(): void {
    console.log(this.data1,'ewduywgdewydegftyewft');
    
    if (this.data1.type == 1) {
      this.title = this.data1.dialog_title;
    } else {
      this.title = this.data1.dialog_title;
      this.data.controls['class'].setValue(this.data1.selectedRow.class_name);
      this.data.controls['capacity'].setValue(
        this.data1.selectedRow.class_capacity
      );
      this.selectedId = this.data1.selectedRow.class_id;
      console.log(this.data.controls);
    }
  }

  postdata(variable: any) {
    this._api.addclass(variable).subscribe((res) => {
      console.log(res);
      if (res.data == true) {
        this._dialogRef.close(true);
      }
    });
  }

  update() {
    const update_value = {
      class_id: this.selectedId,
      class_name: this.data.controls['class'].value,
      class_capacity: this.data.controls['capacity'].value,
    };
    this._api.editvalue(update_value).subscribe((res) => {
      console.log(res);
      if(res == true){
      this._dialogRef.close(true);
      }
    });
  }
}
