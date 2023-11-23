/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { TourSelectService } from 'src/service/tour_select/tour_select.service';
export class Tour{
    @ApiProperty()
    camp_id: number;
    @ApiProperty()
    Country_select: string;
    @ApiProperty()
    country_place: string;
    @ApiProperty()
    active1:number;
    @ApiProperty()
    created_user_id:number;
    
}

export class Audittrail{
  @ApiProperty()
  entry_by_user_id:string;
  @ApiProperty()
  entry_type:string;
  @ApiProperty()
  entry_datetime:string;
}


@Controller('tour-select')
export class TourSelectController {
    constructor(private _apiService: TourSelectService) {}
    @Get('users')
    getUsers() {
      const usersData = this._apiService.getData();
      return usersData;
    }


    @Post('insert')
    async insertusers(@Body() insertValue: Tour) {
      console.log( insertValue,'value inserted succesfully');
      // console.log( audit,' inserted succesfully');

      const data=await this._apiService.postData(insertValue);
      return data;
    }




}

 
   
   