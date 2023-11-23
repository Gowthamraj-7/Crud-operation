import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {


  isButtonDisabled = false;  
  noReservedTrips: any;  
  constructor(private _api:TourService) { } 
  final_value:any; 
  ngOnInit(): void { 
  } 
 list_data:any 
 count:any[]=[]; 
 filtered_users:any = []; 
 user_data:any; 
  Getreserved=new FormGroup({ 
    reserveddate:new FormControl('',Validators.required) 
  }) 
  get_Trip_Data(){ 
    const trip_date:any=this.Getreserved.controls['reserveddate'].value; 
 
    console.log(trip_date,'from get mehtod'); 
     
    this._api.finalvalue(trip_date._d).subscribe(res=>{ 
      console.log(res); 
this.final_value=res; 
this.noReservedTrips = !this.final_value || this.final_value.length === 0; 
 
     
  }); 
 
 
} 
}
