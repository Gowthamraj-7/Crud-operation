/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { dbConnection } from 'src/app.module';
import * as mysql from 'mysql2';
import { camp } from 'src/controller/camp-booking/camp-booking.controller';
import { DateTime } from 'luxon';

@Injectable()
export class CampBookingService {
  dbname = 'data';
  tablename = 'camp_booking_details';
  tablename2 = 'audit_trail';
  getcamp() {
    const usersData = dbConnection.query(`
       SELECT * FROM ${this.dbname}.${this.tablename};
       `);
    return usersData;
  }
  insertvalue1: any;

  async postData(insertvalue: camp) {
    this.insertvalue1 = insertvalue;
    console.log(this.insertvalue1, 'from service file');

    // Current Time
    const currentTime = DateTime.local({
      zone: 'Asia/Kolkata',
    }).toFormat('yyyy-MM-dd TT');

    // Format datetime
    const triptime = DateTime.fromJSDate(
      new Date(insertvalue[0].trip_datetime),
    ).toFormat('yyyy-MM-dd TT');

    for (let i = 0; i < insertvalue[0].booking_user_id.length; i++) {
      const insertData = await dbConnection.query(`
        INSERT INTO data.camp_booking_details(
     booking_datetime,
        booking_user_id,
        country_code,
        booking_camp_id,
        trip_datetime,
        booking_by_user_id
        )
        VALUES(
      
        ${mysql.escape(currentTime)},
        ${mysql.escape(insertvalue[0].booking_user_id[i].id)},
        ${mysql.escape(insertvalue[0].country_code)},
        ${mysql.escape(insertvalue[0].booking_camp_id)},
        ${mysql.escape(triptime)},
        ${mysql.escape(insertvalue[0].booking_by_user_id)}
        );
         `);
      console.log(insertData, 'from return data');
    }

    const Audit = dbConnection.query(`
    INSERT INTO ${this.dbname}.${this.tablename2}(
      entry_by_user_id,
      entry_type,
      entry_datetime
    )VALUES(
      ${mysql.escape(insertvalue[1].entry_by_user_id)},
      ${mysql.escape(insertvalue[1].entry_type)},
      ${mysql.escape(insertvalue[1].entry_datetime)}
    )
    `);

    return 1;
  }
}
