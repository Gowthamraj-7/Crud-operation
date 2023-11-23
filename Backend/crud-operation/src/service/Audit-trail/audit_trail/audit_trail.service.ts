/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { dbConnection } from 'src/app.module';
import * as mysql from 'mysql2';
import { DateTime } from 'luxon';
import { Interface } from 'readline';
import { EncryptService } from 'src/service/encrypt/encrypt/encrypt.service';

interface AuditInterface {
  entry_by_user_id: number;
  entry_type: string;
}

@Injectable()
export class AuditTrailService {


  constructor(public _data:EncryptService){}


  dbname = 'data';
  tablename = 'audit_trail';
  tablename2 = 'tree_view';
  tablename3 = 'subject_details';
  tablename4 = '01_syllabus_details_table';
  tablename5 = 'assigned_subject_syllabus';

  async Audittrail() {
    const data = await dbConnection.query(`
    SELECT * FROM ${this.dbname}.${this.tablename} ORDER BY id DESC 
              `);
    return data;
  }
  async subject_details() {
    const subject = await dbConnection.query(`
   SELECT * FROM ${this.dbname}.${this.tablename3}`);
    return subject;
  }

  //   async gettreedata() {
  //     const treeData = await dbConnection.query(`
  //    SELECT *FROM ${this.dbname}.${this.tablename4}`);
  //     //  if (treeData.length > 1) {
  //     //    const data = await this.treeConstruct(treeData);
  //     //    return data;
  //     //  }

  //     //  const obj = treeData[0];
  //     //  const pair = { children: [] };
  //     //  const objData = { ...obj, ...pair };
  //     //  if (obj !== undefined) {
  //     //    return [objData];
  //     //  }
  //     //  return [];
  //   }

  async getSyllabusDetails(subject_id: number) {
    const tablename = `${subject_id}_syllabus_details_table`;

    const subject = await dbConnection.query(`
     SELECT * FROM ${this.dbname}.${tablename}`);
    // console.log(subject);
    if (subject.length > 1) {
      const data = await this.treeConstruct(subject);
      return data;
    }

    const obj = subject[0];
    const pair = { children: [] };
    const objData = { ...obj, ...pair };
    if (obj !== undefined) {
      return [objData];
    }
    return [];
  }
  treeConstruct(treeData) {
    let constructedTree = [];
    for (let i of treeData) {
      let treeObj = i;
      let assigned = false;
      this.constructTree(constructedTree, treeObj, assigned);
    }
    return constructedTree;
  }

  constructTree(constructedTree, treeObj, assigned) {
    if (treeObj.syllabus_parent_id == null) {
      treeObj.children = [];
      constructedTree.push(treeObj);
      return true;
    } else if (treeObj.syllabus_parent_id == constructedTree.syllabus_id) {
      treeObj.children = [];
      constructedTree.children.push(treeObj);
      return true;
    } else {
      if (constructedTree.children != undefined) {
        for (let index = 0; index < constructedTree.children.length; index++) {
          let constructedObj = constructedTree.children[index];
          if (assigned == false) {
            assigned = this.constructTree(constructedObj, treeObj, assigned);
          }
        }
      } else {
        for (let index = 0; index < constructedTree.length; index++) {
          let constructedObj = constructedTree[index];
          if (assigned == false) {
            assigned = this.constructTree(constructedObj, treeObj, assigned);
          }
        }
      }
      return false;
    }
  }
  full_subject_id: any;
  async getData(data: any) {
    let items: any = [];
    // console.log(data, 'data');
    const subject_id = data[0];
    for (let i = 0; i < data[1].length; i++) {
      items.push(data[1][i].syllabus_id);
    }
    // console.log(items, 'this.items');

    this.full_subject_id = dbConnection.query(
      `SELECT * from data.assigned_subject_syllabus;`,
    );
    this.full_subject_id.then((result) => {
      if (result.find((obj) => obj.subject_id == subject_id)) {
        dbConnection.query(
          `UPDATE data.assigned_subject_syllabus 
           SET
           syllabus_id='${items}'
           WHERE
           subject_id=${subject_id}`,
        );
      } else {
        dbConnection.query(
          `INSERT data.assigned_subject_syllabus
           (subject_id,syllabus_id)
           VALUES 
           (${subject_id},'${items}')`,
        );
      }

      //   for (let j=0;j<result.length;j++) {
      //   console.log(result[j].subject_id,'for');

      //   if (result[j].subject_id==subject_id) {
      //     console.log('if ');
      //     dbConnection.query(`UPDATE data.assigned_subject_syllabus SET syllabus_id='${items}' WHERE subject_id=${result[j].subject_id}`)
      //   }
      //   else{

      //   }
      // }
    });

    return this.full_subject_id;
  }
  item: any;
  subject_name: any = [];
  subject_name1: any = [];
  masterarry1: any[] = [];
  syllabus_details: [] = [];
  syllabus_data: any;
  final_data1: any = [];
  async getTableData() {
    this.final_data1 = [];
    const final_value: any[] = [];
    const subject = await dbConnection.query(`
     SELECT subject_id,CONCAT('[', GROUP_CONCAT(syllabus_id SEPARATOR ','), ']') AS syllabus_id
     FROM ${this.dbname}.${this.tablename5}  group by subject_id,syllabus_id`);

    for (let i = 0; i < subject.length; i++) {
      let data: any =
        await dbConnection.query(`SELECT * FROM data.subject_details
         where subject_id=${subject[i].subject_id};
         `);
      console.log(data, 'data');

      const syllabus = subject[i].syllabus_id.slice(1, -1).split(',');

      let syllabus_data1: any = [];
      for (let j = 0; j < syllabus.length; j++) {
        const data1 =
          await dbConnection.query(`SELECT syllabus_name,syllabus_id FROM data.${subject[i].subject_id}_syllabus_details_table
      where syllabus_id ="${syllabus[j]}";
     `);
        syllabus_data1.push(...data1);
      }

      const final_data = {
        subject_id: data[0].subject_id,
        subject_name: data[0].subject_name,
        syllabus_name: syllabus_data1,
      };
      // console.log(masterarry,'masterarry');
      this.final_data1.push(final_data);
    }

    console.log(this.final_data1, 'this.gowtham');

    return this.final_data1;
  }

  async gowtham(syllabus: number) {
    // const subject_data :any=[];
    console.log(syllabus, 'dscc');

    const data = await dbConnection.query(`SELECT syllabus_id
       FROM data.assigned_subject_syllabus
    where subject_id =${syllabus};
   `);
    console.log(data, 'data v alue');
    const resultArray = data.map((item) => item.syllabus_id.split(','));
    const flattenedArray = [].concat(...resultArray);
    console.log(flattenedArray);
    console.log(flattenedArray.length);

    return flattenedArray;
  }

  async data1(id: any) {
    const data1 =
      await dbConnection.query(`SELECT * FROM data.${id}_syllabus_details_table
       
      
     `);
    console.log(data1.length, 'jnhughui');
    return data1;
  }

  async addClass(data: any) {
    const dbname = 'gowtham';
    const tablename = 'registerd_student_details';
    const value = await dbConnection.query(`INSERT INTO ${dbname}.${tablename}(
      class_name,
      is_active,
      class_capacity
    )
    values( 
      ${mysql.escape(data.class_name)},
    ${mysql.escape(data.is_active)},
    ${mysql.escape(data.class_capacity)})
    `);

    return {
      message: 'Data insert succesfully',
      statusCode: 200,
      data: true,
    };
  }

  async getclass() {
    const data2 = await dbConnection.query(
      `select * from gowtham.registerd_student_details`,
    );
    return data2;
  }
  async updateIsActive(value: any) {
    try {
      const dbName = 'gowtham';
      const tableName = 'registerd_student_details';
      if (value.is_active == 1) {
        const usersData = dbConnection.query(`
      UPDATE ${dbName}.${tableName} set is_active=0 where class_id='${value.class_id}';
    `);
        console.log('if part');
      } else {
        const usersData = dbConnection.query(`
      UPDATE ${dbName}.${tableName} set is_active=1 where class_id='${value.class_id}';
    `);
      }
      console.log('else part');

      return {
        message: 'Data updated succesfully',
        statusCode: 200,
        data: true,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(data: any) {
    try {
      const dbName = 'gowtham';
      const tableName = 'registerd_student_details';
      const update = dbConnection.query(`update ${dbName}.${tableName}
       set class_name =${mysql.escape(data.class_name)},
       class_capacity=${mysql.escape(data.class_capacity)}
       where class_id=${data.class_id}`);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getdetails() {
    //     const data2 = await dbConnection.query(
    //       `SELECT b.class_name,
    // a.first_name,
    // a.last_name,
    // a.student_id
    // FROM gowtham.registerd_student_details as b
    // INNER JOIN gowtham.registered_classes as a
    //  ON b.class_id = a.class_id`
    //     );
    //     return data2;

    const data = await dbConnection.query(
      `select * from gowtham.registered_classes`,
    );
    const data2 = await dbConnection.query(
      `select * from gowtham.registerd_student_details`,
    );
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data2.length; j++) {
        if (data2[j].class_id === data[i].class_id) {
          data[i].class_name = data2[j].class_name;
          break;
        } else {
          data[i].class_name = null;
        }
      }
    }
    // console.log(data,'data');

    return data;
  }

  async postclass(value: any) {
    const class_id = value[1].class_id;
    // console.log(class_id,'class_id for service');

    for (let i = 0; i < value[0].length; i++) {
      // console.log(value[0][i].student_id,'value');

      const data3 =
        await dbConnection.query(`UPDATE gowtham.registered_classes SET 
       class_id=${class_id} WHERE student_id=${value[0][i].student_id}`);
    }

    return true;
  }

  async updateclass(value: any) {
    const data = await dbConnection.query(`UPDATE gowtham.registered_classes
    SET class_id = NULL,
    class_assigned=0
    WHERE student_id=${value.student_id}`);
  }

  async activeValue() {
    const data = await dbConnection.query(
      `SELECT * FROM gowtham.registerd_student_details where is_active=1;`,
    );
    return data;
  }

  async treevalue() {
    const data = await dbConnection.query(
      `select * from gowtham.registered_colleges`,
    );
    if (data.length > 1) {
      const data1 = await this.treeConstruct(data);
      return data1;
    }

    const obj = data[0];
    const pair = { children: [] };
    const objData = { ...obj, ...pair };
    if (obj !== undefined) {
      return [objData];
    }
    return [];
  }
  treeConstruct1(treeData) {
    let constructedTree = [];
    for (let i of treeData) {
      let treeObj = i;
      let assigned = false;
      this.constructTree(constructedTree, treeObj, assigned);
    }
    return constructedTree;
  }

  constructTree1(constructedTree, treeObj, assigned) {
    if (treeObj.syllabus_parent_id == null) {
      treeObj.children = [];
      constructedTree.push(treeObj);
      return true;
    } else if (treeObj.syllabus_parent_id == constructedTree.syllabus_id) {
      treeObj.children = [];
      constructedTree.children.push(treeObj);
      return true;
    } else {
      if (constructedTree.children != undefined) {
        for (let index = 0; index < constructedTree.children.length; index++) {
          let constructedObj = constructedTree.children[index];
          if (assigned == false) {
            assigned = this.constructTree(constructedObj, treeObj, assigned);
          }
        }
      } else {
        for (let index = 0; index < constructedTree.length; index++) {
          let constructedObj = constructedTree[index];
          if (assigned == false) {
            assigned = this.constructTree(constructedObj, treeObj, assigned);
          }
        }
      }
      return false;
    }
  }
  async post_user(data3: any) {
    const value = data3.text_area.split(',');

    console.log(value, 'from value');

    // Current Time
    const currentTime = DateTime.local({
      zone: 'Asia/Kolkata',
    }).toFormat('yyyy-MM-dd TT');

    // // Format datetime
    const triptime = DateTime.fromJSDate(new Date(new Date())).toFormat(
      'yyyy-MM-dd TT',
    );

    // console.log(triptime);

    for (let i = 0; i < value.length; i++) {
      const data2 = await dbConnection.query(`
    INSERT INTO gowtham.student_booking_details (student_name, college_id,booking_datetime)
    VALUES (
      ${mysql.escape(value[i])},
      ${mysql.escape(data3.id)},
      ${mysql.escape(triptime)}
    )`);

      // console.log(data2, 'from data2');

      // results.push(data2);
      // console.log(results,'from result');
    }

    // console.log(results,'from result');

    return true;

    //        const data2= await dbConnection.query(` insert into gowtham.student_booking_details (student_name,
    //        college_id) values(
    //         ${mysql.escape(value[0])},
    //         ${mysql.escape(data3.id)}

    //        )`)
    // return data2
  }

  async student_Data(id: string) {
    const data = await dbConnection.query(
      `select * from gowtham.student_booking_details where college_id='${id}'`,
    );
    const data2 = await dbConnection.query(
      `select * from gowtham.registered_colleges`,
    );
    // console.log(data2,'from data');

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data2.length; j++) {
        if (data[i].college_id === data2[j].syllabus_id) {
          data[i].syllabus_name = data2[j].syllabus_name;
          break;
        } else {
          data[i].syllabus_name = null;
        }
      }
    }

    console.log(data, 'from service');

    return data;
  }

  /***********************Task 4 Apis****************************/
  subject: any;
  async showSubjects() {
    const data = await dbConnection.query(
      `SELECT * FROM in_9_edu_customer_db.30_userapp_institutional_study_subjects_course_details`,
    );
    // console.log(data, 'from service');

    return data;
  }
  async showTree(data: any, country: string, id: number) {
    const tablename = `30_userapp_${data}_institutional_course_subject_id_syllabus_details`;
    const dbname = `${country}_${id}_edu_customer_db`;
    // console.log(tablename);

    const check_table = await dbConnection.query(`
    SELECT count(*) as db FROM information_schema.tables 
    WHERE table_schema = ${mysql.escape(
      dbname,
    )} AND table_name = ${mysql.escape(tablename)}
    LIMIT 1;
        `);
    // console.log(check_table, 'check22');
    // console.log(data,'datsa');

    if (check_table[0].db > 0) {
      this.subject = await dbConnection.query(`
     SELECT * FROM ${country}_${id}_edu_customer_db.${tablename}`);
    } else {
      return 2;
    }

    if (this.subject.length > 1) {
      const data = await this.treeConstruct2(this.subject);
      return data;
    }

    const obj = this.subject[0];
    const pair = { children: [] };
    const objData = { ...obj, ...pair };
  }

  treeConstruct2(treeData) {
    let constructedTree = [];
    for (let i of treeData) {
      let treeObj = i;
      let assigned = false;
      this.constructTree2(constructedTree, treeObj, assigned);
    }
    return constructedTree;
  }

  constructTree2(constructedTree, treeObj, assigned) {
    if (treeObj.syllabus_parent_id == null) {
      treeObj.children = [];
      constructedTree.push(treeObj);
      return true;
    } else if (treeObj.syllabus_parent_id == constructedTree.syllabus_id) {
      treeObj.children = [];
      constructedTree.children.push(treeObj);
      return true;
    } else {
      if (constructedTree.children != undefined) {
        for (let index = 0; index < constructedTree.children.length; index++) {
          let constructedObj = constructedTree.children[index];
          if (assigned == false) {
            assigned = this.constructTree2(constructedObj, treeObj, assigned);
          }
        }
      } else {
        for (let index = 0; index < constructedTree.length; index++) {
          let constructedObj = constructedTree[index];
          if (assigned == false) {
            assigned = this.constructTree2(constructedObj, treeObj, assigned);
          }
        }
      }
      return false;
    }
  }

  async PostValue(data: any, country: any, user_id: any, user: any) {
    // console.log(user_details.Country, 'from service post value');
    const decrypt =this._data.decryptionAES(data);
 
    let items: any = [];
    let concatenatedString: any;
    // console.log(data.data.tree.length, 'data');
    const subject_id = decrypt[0];
    for (let i = 0; i < data.data.tree.length; i++) {
      items.push(data.data.tree[i].syllabus_id);
      concatenatedString = items.join(',');
    }

    // console.log(concatenatedString, 'from item');

    // Current Time
    const currentTime = DateTime.local({
      zone: 'Asia/Kolkata',
    }).toFormat('yyyy-MM-dd TT');

    // // Format datetime
    const triptime = DateTime.fromJSDate(new Date(new Date())).toFormat(
      'yyyy-MM-dd TT',
    );
    // Format datetime
    const triptime2 = DateTime.fromJSDate(
      new Date(data.data.dateTime),
    ).toFormat('yyyy-MM-dd TT');

    // Format datetime
    const triptime3 = DateTime.fromJSDate(
      new Date(data.data.dateTime),
    ).toFormat('dd MMM y h:mm a');

    const Audit =
      await dbConnection.query(`insert into data.audit_trail(entry_by_user_id,entry_type,entry_datetime) values(
      ${mysql.escape(data.Audit.entry_by_user_id)},
      ${mysql.escape(data.Audit.entry_type)},
      ${mysql.escape(triptime3)}
     )`);

    const data2 = await dbConnection.query(
      `insert into 
        ${country}_${user_id}_edu_customer_db.
        30_userapp_${user}_user_id_user_input_based_todo_and_done_list
        (
          task_name,
          due_datetime,
          task_completion_status,
          relevent_institutional_course_subject_id,
          relevent_syllabus_ids,
          updated_by_user_id,
          updated_datetime
          )      
          values(
            ${mysql.escape(data.data.Name)},
            ${mysql.escape(triptime2)},
            ${mysql.escape(data.data.Status)},
            ${mysql.escape(data.data.Subject)},
            ${mysql.escape(concatenatedString)},
            ${mysql.escape(data.data.updated_by_user_id)},
            ${mysql.escape(triptime)}

          )`,
    );

    return true;
  }

  final_data2: any = [];
  tree: any[];
  async getValue(country: string, id: any, user: any) {
    this.final_data2 = [];
    this.tree = [];
 
    
    // Current Time
    const currentTime = DateTime.local({
      zone: 'Asia/Kolkata',
    }).toFormat('yyyy-MM-dd TT');

    // // Format datetime
    const triptime = DateTime.fromJSDate(new Date(new Date())).toFormat(
      'yyyy-MM-dd TT',
    );
    const data =
      await dbConnection.query(`SELECT *    FROM ${country}_${id}_edu_customer_db.30_userapp_${user}_user_id_user_input_based_todo_and_done_list where task_completion_status =1
    `);
    const data3 = await dbConnection.query(
      `SELECT * FROM ${country}_${id}_edu_customer_db.30_userapp_institutional_study_subjects_course_details`,
    );
    // console.log(data[0].relevent_syllabus_ids, 'from syllabus id,s');

    for (let i = 0; i < data.length; i++) {
      let syllabus_data1: any = [];
      const syllabus = data[i].relevent_syllabus_ids.split(',');
      // console.log(syllabus, 'fewfrewfe');
      // const syllabusString = data[i].relevent_syllabus_ids;
      // const syllabus = syllabusString .split(',');
      const tablename2 = ` 30_userapp_${data[i].relevent_institutional_course_subject_id}_institutional_course_subject_id_syllabus_details`;

      const subject = await dbConnection.query(`
       SELECT * FROM ${country}_${id}_edu_customer_db.${tablename2}`);

      if (subject.length > 1) {
        this.tree = await this.treeConstruct(subject);
      }

      const obj = subject[0];
      const pair = { children: [] };
      const objData = { ...obj, ...pair };

      const tablename = ` 30_userapp_${data[i].relevent_institutional_course_subject_id}_institutional_course_subject_id_syllabus_details`;
      const data2 = await dbConnection.query(
        `SELECT * FROM ${country}_${id}_edu_customer_db.${tablename}`,
      );
      const difference =
        await dbConnection.query(`SELECT ABS (DATEDIFF(due_datetime, '${triptime}')) AS days_difference
    FROM ${country}_${id}_edu_customer_db.30_userapp_${user}_user_id_user_input_based_todo_and_done_list   where task_id=${data[i].task_id}`);
      // console.log(difference, 'from service');

      for (let j = 0; j < data2.length; j++) {
        for (let k = 0; k < syllabus.length; k++) {
          if (syllabus[k] === data2[j].syllabus_id) {
            data[i].relevent_syllabus_name = data2[j].syllabus_name;
            // console.log(data[i].relevent_syllabus_name,'efefefefefewfewfew');
            syllabus_data1.push(data[i].relevent_syllabus_name);
          }

          for (let k = 0; k < data3.length; k++) {
            if (
              data[i].relevent_institutional_course_subject_id ===
              data3[k].institutional_course_subject_id
            ) {
              data[i].relevent_subject = data3[k].course_subject_type;
            }
          }
        }
      }
      const final_data = {
        task_id: data[i].task_id,
        task_name: data[i].task_name,
        syllabus_name: syllabus_data1,
        due_datetime: data[i].due_datetime,
        task_completion_status: data[i].task_completion_status,
        updated_datetime: data[i].updated_datetime,
        relevent_subject: data[i].relevent_subject,
        relevent_syllabus_ids: syllabus,
        relevent_institutional_course_subject_id:
          data[i].relevent_institutional_course_subject_id,
        days: difference[0].days_difference,
        //  treee_view:this.tree
      };
      //  console.log(syllabus_data1, 'from service name');
      this.final_data2.push(final_data);
    }

    // console.log(this.final_data2, 'ejfhrughr');
    const encryption =JSON.stringify(this._data.encryptionAES(this.final_data2));
    return encryption;
  }
  treeConstruct3(treeData) {
    let constructedTree = [];
    for (let i of treeData) {
      let treeObj = i;
      let assigned = false;
      this.constructTree(constructedTree, treeObj, assigned);
    }
    return constructedTree;
  }

  constructTree3(constructedTree, treeObj, assigned) {
    if (treeObj.syllabus_parent_id == null) {
      treeObj.children = [];
      constructedTree.push(treeObj);
      return true;
    } else if (treeObj.syllabus_parent_id == constructedTree.syllabus_id) {
      treeObj.children = [];
      constructedTree.children.push(treeObj);
      return true;
    } else {
      if (constructedTree.children != undefined) {
        for (let index = 0; index < constructedTree.children.length; index++) {
          let constructedObj = constructedTree.children[index];
          if (assigned == false) {
            assigned = this.constructTree(constructedObj, treeObj, assigned);
          }
        }
      } else {
        for (let index = 0; index < constructedTree.length; index++) {
          let constructedObj = constructedTree[index];
          if (assigned == false) {
            assigned = this.constructTree(constructedObj, treeObj, assigned);
          }
        }
      }
      return false;
    }
  }

  async deletevalue(
    id: number,
    country: string,
    Country_id: number,
    user: number,
    Audit_value: AuditInterface,
  ) {
    // Current Time
    const currentTime = DateTime.local({
      zone: 'Asia/Kolkata',
    }).toFormat('yyyy-MM-dd TT');

    // // Format datetime
    const triptime = DateTime.fromJSDate(new Date(new Date())).toFormat(
      'dd MMM y h:mm a ',
    );
    // console.log(data.Audit.entry_by_user_id,'data.Audit.entry_by_user_id');

    const Audit =
      await dbConnection.query(`insert into data.audit_trail(entry_by_user_id,entry_type,entry_datetime) values(
      ${mysql.escape(Audit_value.entry_by_user_id)},
      ${mysql.escape(Audit_value.entry_type)},
      ${mysql.escape(triptime)}
     )`);

    const value =
      await dbConnection.query(`DELETE FROM ${country}_${Country_id}_edu_customer_db.30_userapp_${user}_user_id_user_input_based_todo_and_done_list
    WHERE  task_id=${id};`);
    return true;
  }

  final_data3: any = [];
  async completeValue(country: any, id: any, user: any) {
    this.final_data3 = [];
    const data =
      await dbConnection.query(`SELECT *    FROM ${country}_${id}_edu_customer_db.30_userapp_${user}_user_id_user_input_based_todo_and_done_list where task_completion_status =0
      ORDER BY task_id DESC `);
    const data3 = await dbConnection.query(
      `SELECT * FROM ${country}_${id}_edu_customer_db.30_userapp_institutional_study_subjects_course_details`,
    );

    //  console.log(data,'from service');

    //  const syllabus = data.relevent_syllabus_ids.split(',');

    for (let i = 0; i < data.length; i++) {
      let syllabus_data1: any = [];
      const syllabus = data[i].relevent_syllabus_ids.split(',');
      //  console.log(syllabus,'fewfrewfe');

      const tablename = ` 30_userapp_${data[i].relevent_institutional_course_subject_id}_institutional_course_subject_id_syllabus_details`;
      const data2 = await dbConnection.query(
        `SELECT * FROM ${country}_${id}_edu_customer_db.${tablename}`,
      );

      for (let j = 0; j < data2.length; j++) {
        for (let k = 0; k < syllabus.length; k++) {
          if (syllabus[k] === data2[j].syllabus_id) {
            data[i].relevent_syllabus_name = data2[j].syllabus_name;
            // console.log(data[i].relevent_syllabus_name,'efefefefefewfewfew');
            syllabus_data1.push(data[i].relevent_syllabus_name);
          }

          for (let k = 0; k < data3.length; k++) {
            if (
              data[i].relevent_institutional_course_subject_id ===
              data3[k].institutional_course_subject_id
            ) {
              data[i].relevent_subject = data3[k].course_subject_type;
            }
          }
        }
      }
      const final_data = {
        task_id: data[i].task_id,
        task_name: data[i].task_name,
        syllabus_name: syllabus_data1,
        due_datetime: data[i].due_datetime,
        task_completion_status: data[i].task_completion_status,
        updated_datetime: data[i].updated_datetime,
        relevent_subject: data[i].relevent_subject,
        relevent_syllabus_ids: syllabus,
        relevent_institutional_course_subject_id:
          data[i].relevent_institutional_course_subject_id,
        // daysDifferent:data[i].difference.days_difference
      };
      //  console.log(syllabus_data1, 'from service name');
      this.final_data3.push(final_data);
    }

    // console.log(this.final_data3, 'ejfhrughr');
    return this.final_data3;
  }

  async upadateValue(data: any, country: any, id: any, user: any) {
    // Current Time
    const currentTime = DateTime.local({
      zone: 'Asia/Kolkata',
    }).toFormat('yyyy-MM-dd TT');

    // // Format datetime
    const triptime = DateTime.fromJSDate(new Date(new Date())).toFormat(
      'yyyy-MM-dd TT',
    );
    // Format datetime
    const triptime2 = DateTime.fromJSDate(new Date(data.data.Date)).toFormat(
      'yyyy-MM-dd TT',
    );
    const triptime3 = DateTime.fromJSDate(new Date(data.data.Date)).toFormat(
      'dd MMM y h:mm a',
    );

    const Audit =
      await dbConnection.query(`insert into data.audit_trail(entry_by_user_id,entry_type,entry_datetime) values(
      ${mysql.escape(data.Audit.entry_by_user_id)},
      ${mysql.escape(data.Audit.entry_type)},
      ${mysql.escape(triptime3)}
     )`);

    // for (let i = 0; i < data[0].tree.length; i++) {
    //   console.log(data[0].tree[i], 'fefefew');

    const data2 = await dbConnection.query(
      `update 
      ${country}_${id}_edu_customer_db.30_userapp_${user}_user_id_user_input_based_todo_and_done_list
      set 
        task_name= ${mysql.escape(data.data.Name)},
        due_datetime= ${mysql.escape(triptime2)},
        task_completion_status=    ${mysql.escape(data.data.Status)},
        relevent_institutional_course_subject_id=${mysql.escape(
          data.data.Subject,
        )},
        relevent_syllabus_ids= ${mysql.escape(data.data.tree)},
        updated_by_user_id= ${mysql.escape(data.data.updated_by_user_id)},
        updated_datetime =  ${mysql.escape(triptime)}
       where task_id ='${data.data.task_id}'  
 `,
    );

    return true;
  }
}






