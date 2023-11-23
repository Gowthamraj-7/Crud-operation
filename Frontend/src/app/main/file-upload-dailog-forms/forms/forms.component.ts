import { Country } from './../../input-field-type/input-field-type.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  selectedValue:any='';

  



  withAuditTrail=new FormGroup({
    country:new FormControl("",Validators.required),
    state:new FormControl("",Validators.required),
    city:new FormControl("",Validators.required),
    address1:new FormControl("",Validators.required),
    address2:new FormControl("",Validators.required),
    pincode:new FormControl("",Validators.required),
  });
  
  constructor(private _formBuild:FormBuilder) { }

  ngOnInit(): void {
  }


}
