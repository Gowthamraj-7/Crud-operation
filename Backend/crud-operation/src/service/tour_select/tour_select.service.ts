/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { dbConnection } from 'src/app.module';
import { Tour } from 'src/controller/tour_select/tour_select.controller';
import * as mysql from 'mysql2';
import { Audittrail } from 'src/controller/tour-booking/tour-booking.controller';

@Injectable()
export class TourSelectService {  
  dbName = 'data';
  tableName = 'tour_select';
  tablename2 ='audit_trail';
  getData() {
    const usersData = dbConnection.query(`
   SELECT * FROM ${this.dbName}.${this.tableName};
   `);
    return usersData;
  }
  getValue(){ 
    const data =dbConnection.query(`
    SELECT * FROM ${this.dbName}.${this.tablename2} order by id desc;
    `);
    return data
  }

  async postData(insertvalue: Tour) {
    const insertData = await dbConnection.query(`
    INSERT INTO ${this.dbName}.${this.tableName}(
     camp_id,
     Country_select,
     country_place,
     active1,
     created_user_id
    )
    VALUES(
   ${mysql.escape(insertvalue.camp_id)},
    ${mysql.escape(
     insertvalue[0].Country_select,
   )},${mysql.escape(insertvalue[0].country_place)},
    ${mysql.escape(
     insertvalue[0].active1,
   )},
   ${mysql.escape(
    insertvalue[0].created_user_id
  )}
  
    )
     `);

const Audit= dbConnection.query(`
INSERT INTO ${this.dbName}.${this.tablename2}(
  entry_by_user_id,
  entry_type,
  entry_datetime
)VALUES(
  ${mysql.escape(insertvalue[1].entry_by_user_id)},
  ${mysql.escape(insertvalue[1].entry_type)},
  ${mysql.escape(insertvalue[1].entry_datetime)}
)
`)

    return 1;
  }

  async update_active(camp_id:number,active1:any,Audit_value:Audittrail){    
    const Audit =dbConnection.query(`
    INSERT INTO ${this.dbName}.${this.tablename2}  (
      entry_by_user_id,
      entry_type,
      entry_datetime
    ) VALUES(
      '${Audit_value.entry_by_user_id}',
      '${Audit_value.entry_type}',
      '${Audit_value.entry_datetime}'
    )`)

   if(active1.active1==0){
    const usersData = dbConnection.query(`
    UPDATE ${this.dbName}.${this.tableName} set active1=1 where camp_id=${camp_id};
    `);
    console.log("if part");
    
     
    return usersData
   }
   else if(active1.active1==1){
    const usersData = dbConnection.query(`
    UPDATE ${this.dbName}.${this.tableName} set active1=0 where camp_id=${camp_id};
    `);
    console.log("else part");

    return usersData
   }
  }
}
