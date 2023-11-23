/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { dbConnection } from 'src/app.module';
import { Gowtham } from 'src/controller/api/tour/tour/tour.controller';
import * as mysql from 'mysql2';
import { distinct } from 'rxjs';
@Injectable()
export class TourApiService {
  dbName = 'data';
  tableName = 'tour_register';
  async getData() {
    const usersData = await dbConnection.query(`
     SELECT * FROM ${this.dbName}.${this.tableName};
     `);
    console.log(usersData);

    return usersData;
  }
  //  ========================================
  async postData(insertvalue: Gowtham) {
    // console.log(insertvalue);
    const insertData = await dbConnection.query(`
      INSERT INTO ${this.dbName}.${this.tableName}(
        mobile_number,

        firstname,
        lastname,
        gender,
        dob,
        country
      )
      VALUES(
        ${mysql.escape(insertvalue.mobile_number)},
     ${mysql.escape(insertvalue.firstname)},
     ${mysql.escape(insertvalue.lastname)},
     ${mysql.escape(insertvalue.gender)},
     ${mysql.escape(insertvalue.dob)},
     ${mysql.escape(insertvalue.country)}
      )
       `);
    return 1;
  }
  selected_country: any;
//  async post_country(selectcountry: any) {
//     try {
//       this.selectedCountry =await selectcountry;
//       console.log(this.selectedCountry,'from post service method');
      
//       return true;
//     } catch (error) {
//       throw error;
//     }
//   }
  // async getPlace(selectedCountry:string) {
  //   console.log(selectedCountry);
  //   this.selected_country=selectedCountry;
  //   const dbname='data';
  //   const tablename='tour_select'
  //   try {
  //     const usersData = await dbConnection.query(`
  //    SELECT country_place,camp_id FROM ${dbname}.${tablename}  WHERE Country_select=${selectedCountry};
  //    `);
  //     console.log(usersData,'value of variable');

  //     return usersData;
  //   } 
  //   catch (error) {
  //     throw error;
  //   }
  // }
selectedCountry:any;
 async getUsers(country:any){
  this.selectedCountry=country;
    const dbname='data';
    const tablename='tour_register'
    const tablename1='tour_select'
    try {
    
      const usersData=await dbConnection.query(`
     

      select * from ${dbname}.${tablename1} where Country_select='${country}' and active1=1;
      `);     
      console.log(usersData,'value of variable');

      return usersData;
    } 
    catch (error) {
      throw error;
    }
  }

  async getdata(){
    const Dbname='data';
    const tableNAme='tour_register';
    try {

   const data=await dbConnection.query  (`SELECT ${Dbname}.${tableNAme}.id,${Dbname}.${tableNAme}.firstname,${Dbname}.${tableNAme}.country from ${Dbname}.${tableNAme} where country='${this.selectedCountry}'`)

   return data;

    } 
    catch (error) {
      throw error;
    }
  }
}
