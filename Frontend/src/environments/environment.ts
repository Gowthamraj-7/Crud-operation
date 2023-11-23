// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  getUsers: 'http://localhost:3000/api/users',
  postusers: `http://localhost:3000/api/insert`,
  update: (update: number) => `http://localhost:3000/api/${update}`,
  deleteUsers: (value1: number) => `http://localhost:3000/api/${value1}`,
  delete_user: 'http://localhost:3000/api/delete-user',
  getdata: 'http://localhost:3000/tour/users',
  postdata: 'http://localhost:3000/tour/post',

  // getUsers:'http://localhost:3000/tour-select/users',
  postvalue: 'http://localhost:3000/tour-select/insert',

  get_place: `http://localhost:3000/tour-booking/selectedcountry`,
  activeApi: `http://localhost:3000/tour-booking/active`,
  getUsersList: `http://localhost:3000/tour-booking/get-users`,
  getcamp: `http://localhost:3000/camp-booking/insert`,
  userdata: `http://localhost:3000/tour-booking/data-1`,
  finalvalue: `http://localhost:3000/api/final_value`,
  Auditvalue: `http://localhost:3000/tour-booking/Audit`,
  treeData: `http://localhost:3000/audit-trail/tree-view`,
  subjectSelect: `http://localhost:3000/audit-trail/Subject-details`,
  getSyllabusDetails:`http://localhost:3000/audit-trail/syllabus-details`,
  subjectTable:`http://localhost:3000/audit-trail/subject-value`,
  subjectGet:`http://localhost:3000/audit-trail/subject-table`,
  treeDataget:`http://localhost:3000/audit-trail/subject-table2`,
   treedata1:`http://localhost:3000/audit-trail/subject-table3`,
   assignclass:`http://localhost:3000/audit-trail/add-class`,
   getclass:`http://localhost:3000/audit-trail/get_class`,
   updateIsActive:`http://localhost:3000/audit-trail/update_is_active`,
   updateclass:`http://localhost:3000/audit-trail/updata_class`,
   studentdetails:`http://localhost:3000/audit-trail/students`,
   classassign:`http://localhost:3000/audit-trail/assign_class_students`,
   update_class:`http://localhost:3000/audit-trail/update_null`,
   active_value:`http://localhost:3000/audit-trail/select-value`,
   treeView:`http://localhost:3000/audit-trail/treeview2`,
   post_user:`http://localhost:3000/audit-trail/post_user`,
   get_students:`http://localhost:3000/audit-trail/Student_name`,
   showsubject:`http://localhost:3000/audit-trail/ShowSyllabus`,
   treeData2:`http://localhost:3000/audit-trail/TreeeView`,
   PostValue:`http://localhost:3000/audit-trail/postvalue`,
   getValue:`http://localhost:3000/audit-trail/Getvalue`,
   deleteValue:`http://localhost:3000/audit-trail/deleteValue`,
   completeValue:`http://localhost:3000/audit-trail/Getvalue6`,
   updateValue:`http://localhost:3000/audit-trail/updateValue`,
};

// export const gowtham={
//   production: false,
//   getUsers:'http://localhost:3000/tour/users',
//   postusers:'http://localhost:3000/tour/post'

// }

// export const select={
//   production: false,
//   getUsers:'http://localhost:3000/tour-select/users',
//   postusers:'http://localhost:3000/tour-select/insert',
//   post_country:`http://localhost:3000/tour-booking/selected-country`,
//   get_place:`http://localhost:3000/tour-booking/selectedcountry`,
//  activeApi:`http://localhost:3000/tour-booking/active`,
//  getUsersList:`http://localhost:3000/tour-booking/get-users`
// }

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
