/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AuditTrailService } from './audit_trail.service';
import { ApiProperty } from '@nestjs/swagger';
import { log } from 'console';
import { dbConnection } from 'src/app.module';
import { audit } from 'rxjs';
import { EncryptionService } from 'src/service/encrypt/encryption/encryption.service';

export class AuditDto {
  @ApiProperty()
  entry_by_user_id: number;
  @ApiProperty()
  entry_type: string;
}
export class value {
  @ApiProperty()
  user_categorey_id: string;
  @ApiProperty()
  parent_categorey_id: string;
  @ApiProperty()
  user_catrgorey_name: string;
}
export class subject_details {
  @ApiProperty()
  subject_id: string;
  @ApiProperty()
  subject_name: string;
}
export class AssignClass {
  @ApiProperty()
  class_name: string;
  @ApiProperty()
  is_active: number;
  @ApiProperty()
  class_capacity: number;
}
export class updateIsActive {
  @ApiProperty()
  class_id: number;
  @ApiProperty()
  is_active: number;
}

export class data {
  @ApiProperty()
  student_name: string;
  @ApiProperty()
  college_id: string;
  @ApiProperty()
  booking_datetime: string;
}

@Controller('audit-trail')
export class AuditTrailController {
  constructor(
    private _api: AuditTrailService,
    private readonly encryptionService: EncryptionService,
  ) {}

  @Get('Audit-trail')
  async Audittrail() {
    const data = await this._api.Audittrail();
    // console.log(data, 'value inserted succesfully');
    return data;
  }
  //   @Get('tree-view')
  //   async data() {
  //     const data = await this._api.gettreedata();
  //     return data;
  //   }

  @Get('Subject-details')
  async subject() {
    const data = await this._api.subject_details();
    return data;
  }

  @Get('syllabus-details')
  async getSyllabusDetails(@Query('subject_id') subject_id: number) {
    try {
      const data = await this._api.getSyllabusDetails(subject_id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  @Post('subject-value')
  async getdata(@Body() data: any) {
    // console.log(data[0],'fsfsfs');
    // console.log(typeof(data[1].length),'sddsfdsf');

    try {
      const value = await this._api.getData(data);
      // console.log(value);

      return value;
    } catch (error) {
      throw error;
    }
  }

  @Get('subject-table')
  async data() {
    const data = await this._api.getTableData();
    return data;
  }
  @Get('subject-table2')
  async gowtham(@Query('id') id: number) {
    const data = await this._api.gowtham(id);
    return data;
  }
  @Get('subject-table3')
  async data2(@Query('id') id: any) {
    const data = await this._api.data1(id);
    return data;
  }

  @Post('add-class')
  async getdata1(@Body() data: AssignClass) {
    try {
      // console.log(data,'from ctrl');
      const value = await this._api.addClass(data);
      console.log(data);

      return value;
    } catch (error) {
      throw error;
    }
  }
  @Get('get_class')
  async data3() {
    const data = await this._api.getclass();
    return data;
  }

  @Put('update_is_active')
  async updateusers(@Body() value: updateIsActive) {
    try {
      console.log(value, 'from controller ');

      const data = await this._api.updateIsActive(value);
      return data;
    } catch (error) {
      throw error;
    }
  }

  @Put('updata_class')
  async update_value(@Body() data: any) {
    try {
      const update_data = await this._api.update(data);
      return update_data;
    } catch (error) {
      throw error;
    }
  }

  @Get('students')
  async data4() {
    const data = await this._api.getdetails();
    return data;
  }

  @Put('assign_class_students')
  async assign_student(@Body() value: any) {
    try {
      console.log(value, 'from controller');
      const data = await this._api.postclass(value);
      return data;
    } catch (error) {
      throw error;
    }
  }

  @Put('update_null')
  async update_class(@Body() value: any) {
    try {
      console.log(value, 'from controller');
      const data = await this._api.updateclass(value);
      return data;
    } catch (error) {
      throw error;
    }
  }
  @Get('select-value')
  async selectValue() {
    const data = await this._api.activeValue();
    return data;
  }

  @Get('treeview2')
  async data5() {
    const value = await this._api.treevalue();
    return value;
  }
  @Post('post_user')
  async data6(@Body() data: any) {
    console.log(data, 'from data');

    const value2 = await this._api.post_user(data);
    return value2;
  }

  @Get('Student_name')
  async data7(@Query('data') data: string) {
    console.log(data, 'from controller');

    const value = await this._api.student_Data(data);
    return value;
  }

  @Get('ShowSyllabus')
  async subjectData() {
    try {
      const syllabus = await this._api.showSubjects();
      return syllabus;
    } catch (error) {
      throw error;
    }
  }

  @Get('TreeeView')
  async treedata(
    @Query('data') data: string,
    @Query('country') country: string,
    @Query('id') id: number,
  ) {
    // console.log(data,'data');

    try {
      const tree = await this._api.showTree(data, country, id);
      return tree;
    } catch (error) {
      throw error;
    }
  }
  @Post('postvalue')
  async postValue(
    @Body() user_details: string,
    @Query('country') country: string,
    @Query('User_id') user_code: number,
    @Query('user') User: number,
  ) {
    console.log(user_details,'from controller');
    // console.log(country,user_code,User, 'user_details');

    try {
      const data2 = await this._api.PostValue(
        user_details,
        country,
        user_code,
        User,
      );
      return data2;
    } catch (error) {
      throw error;
    }
  }

  @Get('Getvalue')
  async getValue(
    @Query('country') country: string,
    @Query('User_id') user_code: number,
    @Query('user') User: number,
  ) {
    // console.log(country, user_code, User, 'user_details');
    try {
      const value = await this._api.getValue(country, user_code, User);
      return value;
    } catch (error) {
      throw error;
    }
  }
  @Put('deleteValue')
  async deleteValue(
    @Body() Audit: AuditDto,
    @Query('id') id: number,
    @Query('country') country: string,
    @Query('country_id') Country_id: number,
    @Query('user') user: number,
  ) {
    try {
      console.log('testing');
      console.log(id, 'from id');
      console.log(country, 'from country');
      console.log(Country_id, 'from Country_id');
      console.log(user, 'from user');
      console.log(Audit, 'from Audit');
      const value = await this._api.deletevalue(
        id,
        country,
        Country_id,
        user,
        Audit,
      );
      return value;
    } catch (error) {
      throw error;
    }
  }
  @Get('Getvalue6')
  async getCompleteValue(
    @Query('country') country: string,

    @Query('User_id') user_code: number,
    @Query('user') User: number,
  ) {
    try {
      const value = await this._api.completeValue(country, user_code, User);
      return value;
    } catch (error) {
      throw error;
    }
  }
  @Put('updateValue')
  async updateValue(
    @Body() data: any,
    @Query('country') country: string,
    @Query('User_id') user_code: number,
    @Query('user') User: number,
  ) {
    // console.log(data,'from controller from updated data');

    try {
      const data2 = await this._api.upadateValue(
        data,
        country,
        user_code,
        User,
      );
      return data2;
    } catch (error) {
      throw error;
    }
  }
}
