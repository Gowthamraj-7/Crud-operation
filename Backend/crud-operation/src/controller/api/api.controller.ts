/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ApiService } from 'src/service/api/api.service';

export class PostValue {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  dob:string;
  @ApiProperty()
  gender:string;
  @ApiProperty()
  select1:string;
  @ApiProperty()
  address:string;
}
@Controller('api')
export class ApiController {
  constructor(private _apiService: ApiService) {}
  @Get('users')
  getUsers() {
    const usersData = this._apiService.getData();
    return usersData;
  }
  @Post('insert')
  async insertusers(@Body() insertValue: PostValue) {
    console.log( insertValue,'value inserted succesfully');
    const data=await this._apiService.postData(insertValue);
    return data;
  }

  @Delete('delete-user')
  deleteUsers(@Query('id') id: number) {
    console.log(id, 'id value');
    return this._apiService.deleteData(id);
  }

  @Put(':update')
  async updateusers(@Body() insertValue: PostValue) {
    console.log(insertValue);
    const data=await this._apiService.udpateData(insertValue);
    return data;
  }
  @Get('final_value')
  async data(@Query('datetime')datetime:string){
    console.log(datetime);
    const data=await this._apiService.select_Trip_data(datetime);
    return data;
  }
}
