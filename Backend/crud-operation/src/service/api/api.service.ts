/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { dbConnection } from 'src/app.module';
import * as mysql from 'mysql2';
import { PostValue } from 'src/controller/api/api.controller';
import { DateTime } from 'luxon';  
// export class PostValue1 {
   
  
//   name: string;
  
//   age: number;
 
//   dob:string;
  
//   gender:string;
  
//   select1:string;
// //   @ApiProperty()
//   address:string;
// }

@Injectable()
export class ApiService {
  dbName = 'data';
  tableName = 'users';
  getData() {
    const usersData = dbConnection.query(`
   SELECT * FROM ${this.dbName}.${this.tableName};
   `);
    return usersData;
  }

  async postData(insertvalue: any) {
    
      // console.log(insertvalue);
      const insertData = await dbConnection.query(`
      INSERT INTO ${this.dbName}.${this.tableName}(
        name,
        age,
        dob,
        gender,
        select1,
        address
      )
      VALUES(
     '${insertvalue.name}',${insertvalue.age},'${insertvalue.dob}','${insertvalue.gender}','${insertvalue.select1}','${insertvalue.address}'
      )
       `)
       ;

       return 1;
    
  }

  deleteData(id: number) {
    console.log(id, 'service');

   const deleteData= dbConnection.query(
      `DELETE from ${this.dbName}.${this.tableName} where id=(?);`,
      [id],
    );
      return true;
  }

  async udpateData(insertvalue: PostValue) {
    try {
      console.log(insertvalue);
      
      const udpateData = await dbConnection.query(`
      update ${this.dbName}.${this.tableName}
      set name =${mysql.escape(insertvalue.name)},
      age=${mysql.escape(insertvalue.age)},
      dob=${mysql.escape(insertvalue.dob)},
      gender=${mysql.escape(insertvalue.gender)},
      address=${mysql.escape(insertvalue.address)}
      where id=${insertvalue.id}
       `);
       console.log(udpateData);
       
       return 1;
    } catch (error) {
      throw error;
    }
  }


  async select_Trip_data(trip_date: any) { 
    // const varr= await dbConnection.query(`select distinct campname from users.campcenter`) 
    //   console.log(varr,'distinct value'); 
 
    const dbname = 'data'; 
    const tablename = 'camp_booking_details'; 
    const tablename1 = 'tour_select'; 
    const tablename2 = 'tour_register'; 
    const selectQuery1: any[] = []; 
    // variable declaration 
    let masterArray: any[] = []; 
    // try { 
    // } catch (error) { 
    //   throw error; 
    // } 
 
    const trip_datetime = DateTime.fromJSDate(new Date(trip_date)).toFormat( 
      'yyyy-MM-dd', 
    ); 
    selectQuery1.push( 
      await dbConnection.query(` 
      SELECT DISTINCT c.camp_id, c.Country_select, c.country_place 
      FROM ${dbname}.${tablename1} AS c 
      JOIN ${dbname}.${tablename} b ON c.camp_id = b.booking_camp_id 
      JOIN ${dbname}.${tablename2} AS e ON b.booking_user_id = e.id 
    WHERE DATE(b.trip_datetime) = "${trip_datetime}";`), 
    ); 
    console.log(selectQuery1, 'selectuqery'); 
 
    // updated code 
    const camp = await dbConnection.query(` 
SELECT DISTINCT c.camp_id,c.Country_select,c.country_place 
FROM ${dbname}.${tablename1} AS c 
JOIN ${dbname}.${tablename} AS b ON c.camp_id = b.booking_camp_id 
JOIN ${dbname}.${tablename2} AS e ON b.booking_user_id = e.id 
WHERE DATE(b.trip_datetime) = "${trip_datetime}";`); 
    console.log(camp); 
    for (let i = 0; i < camp.length; i++) { 
      const details = await dbConnection.query(` 
       SELECT count(booking_user_id) as count FROM ${dbname}.${tablename} 
       WHERE  DATE(trip_datetime) =${mysql.escape( 
         trip_datetime, 
       )} and booking_camp_id=${mysql.escape(camp[i].camp_id)} 
       `); 
      const user_details = await dbConnection.query(` 
       SELECT booking_user_id FROM ${dbname}.${tablename} 
       WHERE  DATE(trip_datetime) =${mysql.escape( 
         trip_datetime, 
       )} and booking_camp_id=${mysql.escape(camp[i].camp_id)} 
       `); 
      // get booking id 
      let user_Profile_data: any[] = []; 
      let maleCount = 0; 
      let femaleCount = 0; 
      for (let j = 0; j < user_details.length; j++) { 
        const bookingUserId = user_details[j].booking_user_id; 
        // get user data 
        const user_Profile = await dbConnection.query(` 
            SELECT * FROM ${dbname}.${tablename2} 
            WHERE id = ${mysql.escape(bookingUserId)}  
        `); 
         
        user_Profile_data.push(...user_Profile); 
    
 
     
     } 
     for (let k = 0; k < user_Profile_data.length; k++) { 
      if (user_Profile_data[k].gender == '1') { 
        maleCount++; 
      } else if (user_Profile_data[k].gender == '2') { 
        femaleCount++; 
      } 
    } 
      
      
      masterArray.push({ 
        camp_id: camp[i].camp_id, 
        country_code: camp[i].Country_select, 
        camp_name: camp[i].country_place, 
        total_count: details[0].count, 
        male_count:maleCount, 
        femaleCount:femaleCount, 
        user_details:user_Profile_data,
      }); 
      console.log(masterArray);
      
    } 
 
  console.log(masterArray);
  
    return masterArray; 
  } 
 
  // *-----------------------------*// 
  // async selected_user_data(Selected_id: number) { 
  //   const dbname = 'users'; 
  //   const tablename = 'booking_trip'; 
  //   const tablename1 = 'campcenter'; 
  //   const tablename2 = 'enrollnewuser'; 
  //   const usersData = await dbConnection.query(` 
  //       SELECT  b.camp_id, e.fname,e.lname, e.dob,e.gender,e.contact,e.country 
  //       FROM ${dbname}.${tablename2} AS e 
  //       INNER JOIN ${dbname}.${tablename} AS b ON b.booking_userid=e.id 
  //       WHERE b.camp_id = "${Selected_id}"; 
  //       `); 
 
  //   // console.log(usersData); 
  //   // console.log(usersData.length); 
  //   return
}

