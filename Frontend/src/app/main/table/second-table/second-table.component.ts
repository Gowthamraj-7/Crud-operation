import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { inject } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { DialogData } from '../../file-upload-dailog-forms/dialog/dialog.component';

// import { TableComponent } from './main/table/table.component';

@Component({
  selector: 'app-second-table',
  templateUrl: './second-table.component.html',
  styleUrls: ['./second-table.component.scss'],
})
export class SecondTableComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private matDialogRef: MatDialogRef<SecondTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  test = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    dob: new FormControl(''),
    gender: new FormControl(''),
    select: new FormControl(''),
    address: new FormControl(''),
  });

  title:any;
  selectedId:any;
  ngOnInit(): void {
    console.log(this.data,'data value');
    if(this.data.type==1){
      this.title=this.data.dialog_title;
    }else{
      this.title=this.data.dialog_title;
      this.test.controls['name'].setValue(this.data.selected_data.name),
      this.test.controls['age'].setValue(this.data.selected_data.age),
      this.test.controls['dob'].setValue(this.data.selected_data.dob),
      this.test.controls['gender'].setValue(this.data.selected_data.gender),
      this.test.controls['select'].setValue(this.data.selected_data.select1),
      this.test.controls['address'].setValue(this.data.selected_data.address),
      this.selectedId=this.data.selected_data.id;
    }
    
  }

  post_method() {
    const variable = {
      name: this.test.controls['name'].value,
      age: this.test.controls['age'].value,
      dob: this.test.controls['dob'].value,
      gender: this.test.controls['gender'].value,
      select1: this.test.controls['select'].value,
      address: this.test.controls['address'].value,

    };
    console.log(variable);
    
    this.apiService.postData(variable).subscribe((res) => {
      console.log(res,'dialog');
      if (res == 1) {
        this.matDialogRef.close(1);
      }
    });
  }
  update_method(){
    const variable = {
      name: this.test.controls['name'].value,
      age: this.test.controls['age'].value,
      dob: this.test.controls['dob'].value,
      gender: this.test.controls['gender'].value,
      select1: this.test.controls['select'].value,
      address: this.test.controls['address'].value,
      id:this.selectedId
    };
    console.log(variable);
    
    this.apiService.udpateDate(variable,this.selectedId).subscribe((res) => {
      console.log(res,'dialog');
      if (res == 1) {
        this.matDialogRef.close(1);
      }
    });
  }
}
