/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Put, Query, Param } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { query } from 'express';
import { TourApiService } from 'src/service/api/tour-api/tour-api.service';
import { TourSelectService } from 'src/service/tour_select/tour_select.service';

export class tourbooking {
  @ApiProperty()
  country: string;
}


export class ActiveClass {
  @ApiProperty()
  active1: number;
}
export class Audittrail{
  @ApiProperty()
  entry_by_user_id:string;
  @ApiProperty()
  entry_type:string;
  @ApiProperty()
  entry_datetime:string;
}

@Controller('tour-booking')
export class TourBookingController {
  constructor(
    private _tourApi: TourApiService,
    private activeApi: TourSelectService,
  ) {}
  // @Post('selected-country')
  // post_country(@Body()selectcountry:tourbooking){
  //     console.log(selectcountry,'from controller file');
  //     const postcountry=this._tourApi.post_country(selectcountry)
  // }


  @Put('active')
  async update_active(
    @Query('camp-id') camp_id: number,
    @Body() active_value: any[], 
  ) {
    const active_value1=active_value[0];
    const audit_trail=active_value[1];
    

    return this.activeApi.update_active(camp_id, active_value1,audit_trail);
  }
  @Get('get-users')
  async getUsersLists(@Query('country') country:string) {
    const users = this._tourApi.getUsers(country);
    // console.log(country,"country value");
    
    return users;
  }
   @Get('data-1')
   async getdata(){
    const users=this._tourApi.getdata();
    console.log(users);
      return users;
   }

  //  @Get('data-2')
  //  async  getPlace(@Query('data')data:string){
  //   const users=this._tourApi. getPlace(data);
  //   console.log(users);
  //     return users;
  //  }
     @Get('Audit')
     async Audit(){
       const Value=this.activeApi.getValue();
       return Value;
     }

}
