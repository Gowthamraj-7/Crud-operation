import { Component, OnInit } from '@angular/core';
import { BookingUsersComponent } from './booking-users/booking-users.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TourSelectService } from '../services/tour-select.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-camp-booking',
  templateUrl: './camp-booking.component.html',
  styleUrls: ['./camp-booking.component.scss'],
})
export class CampBookingComponent implements OnInit {
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
  place:any[]=[];
  getvalue:any[]=[];  
  data:any;
  remove_id:any;
  currentDate = new Date();
  isButtonDisabled = true;
 

  constructor(private _dialog: MatDialog, private _api: TourSelectService) {}

  ngOnInit(): void {
    console.log(this.getvalue);
  }


  campBook = new FormGroup({
    country: new FormControl('',Validators.required),
    place: new FormControl('',Validators.required),
    dateTime: new FormControl('',Validators.required)
  });
  // post_method() {
   
  // }

  getPlace(country:any){
    // const postcountry :any= this.campBook.controls['country'].value;
    // console.log(country,'country value');
    
    // console.log(postcountry);
    // console.log(typeof(postcountry));
    
    this._api.get_place(country).subscribe((res) => {
      console.log(res,'place value');
      this.place=res
      
    
    });
  }

   
selectedplaces:any;
    selectedPlaces(selectedPlace:any){
      console.log(selectedPlace);
this.selectedplaces=selectedPlace
      
    }

    currentTime: any = DateTime.local({
      zone: 'Asia/Kolkata',
    }).toFormat('dd MMM y h:mm a');

  click() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = 'fit-content';
    this._dialog.open(BookingUsersComponent).afterClosed().subscribe(res=>{
      console.log(res);
      if (Array.isArray(res)) { 
      
        for (const item of res) { 
          if (!this.getvalue.some((user) => user.id === item.id)) { 
            this.getvalue.push(item);  
          } 
          else { 
            console.log('invalid data'); 
          } 
        } 
         
        console.log(this.getvalue); 
         
      }
      // if(res.length>0){
      //   this.getvalue=res;
      // }
      // console.log(this.getvalue[0].id);
      
    });
    
  }
  finalvalue:any[]=[]
  
  insert(){
   
    const tripdate:any=this.campBook.controls['dateTime'].value
    const date=tripdate._d;
    const data=[{
      country_code: this.campBook.controls['country'].value,
      booking_camp_id:this.selectedplaces.camp_id,
      trip_datetime:tripdate, 
      // bookingdate:new Date(),
      booking_user_id:this.getvalue,
      booking_by_user_id:1,    
   },
   {
    entry_by_user_id: 1,
    entry_type: 'insert campbooking',
    entry_datetime: this.currentTime,
  },
]
  //  this.finalvalue.push(data)
  //  console.log(data);

  //  }

  // console.log(data.booking_user_id); 
  
   console.log(data,'final value');
   this._api.getcamp(data).subscribe(res =>{
    console.log( res);
  });
  }
  // post_method(){
   
  // }
  
  method(id:number){
    this.remove_id=id
    console.log(this.remove_id);
    this.EnableisableButton();
    
  }

  

  remove() { 
    console.log(this.remove_id, 'remove id'); 
   
    if (this.remove_id !== undefined) { 
      const indexToRemove = this.getvalue.findIndex( 
        (item: { id: any }) => item.id === this.remove_id 
      ); 
   
      if (indexToRemove !== -1) { 
        this.getvalue.splice(indexToRemove, 1); 
      } else { 
        console.warn('User not found in receivedUser array.'); 
      } 
   
      console.log(this.getvalue, 'new receivedUser'); 
    } else { 
      console.warn('No user selected for removal.'); 
    } 

    this.DisableButton()
  }


  DisableButton() { 
  
    this.isButtonDisabled = true; 
  } 
  EnableisableButton() { 
  
    this.isButtonDisabled = false; 
  }
  
}



