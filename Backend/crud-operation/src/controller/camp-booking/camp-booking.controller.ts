/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { CampBookingService } from 'src/service/camp-booking/camp-booking.service';
export class camp {
  // @ApiProperty()
  // booking_id:number;
  @ApiProperty()
  booking_datetime: string;
  @ApiProperty()
  booking_user_id: any;
  @ApiProperty()
  country_code: string;
  @ApiProperty()
  booking_camp_id: number;
  @ApiProperty()
  trip_datetime: string;
  @ApiProperty()
  booking_by_user_id: number;
}
@Controller('camp-booking')
export class CampBookingController {
  constructor(private _camp: CampBookingService) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Get('campbooking')
  async getcamp() {
    const data = await this._camp.getcamp();
    console.log(data, 'value inserted succesfully');
    return data;
  }

  @Post('insert')
  async insertusers(@Body() insertValue: camp) {
    console.log(insertValue, 'from controller');
    const data = await this._camp.postData(insertValue);
    return data;
  }
}
