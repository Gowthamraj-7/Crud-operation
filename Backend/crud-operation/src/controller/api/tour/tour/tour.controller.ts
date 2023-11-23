/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { TourApiService } from 'src/service/api/tour-api/tour-api.service';


export class Gowtham{
    // @ApiProperty()
    // id:number;
    @ApiProperty()
    mobile_number:string;
    @ApiProperty()
    firstname:string;
    @ApiProperty()
    lastname:string;
    @ApiProperty()
    gender:string;
    @ApiProperty()
    dob:string;
    @ApiProperty()
    country:string;

}


@Controller('tour')
export class TourController {
    constructor(private _tourService: TourApiService) {}
  @Get('users')
  getUsers() {
    const usersData = this._tourService.getData();
    return usersData;
  }
  @Post('post')
  async insertusers(@Body() insertValue: Gowtham) {
    
    console.log( insertValue,'value inserted succesfully');
    const data=await this._tourService.postData(insertValue);
    return data;
  }

}

