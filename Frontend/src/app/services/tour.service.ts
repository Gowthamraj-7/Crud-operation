import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  [x: string]: any;

  constructor(private _http: HttpClient) {}
  getData(): Observable<any> {
    return this._http.get<any>(environment.getdata);
  }
  postData(value: any) {
    console.log(value, 'from service page');

    return this._http.post(environment.postdata, value);
  }

  finalvalue(date: any) {
    console.log(date, 'from service');
    return this._http.get<any>(`${environment.finalvalue}?datetime=${date}`);
  }

  treeData() {
    return this._http.get<any>(`${environment.treeData}`);
  }
  subjectSelect() {
    return this._http.get(`${environment.subjectSelect}`);
  }
  getSyllabusDetails(subject_id: number) {
    return this._http.get<any>(
      `${environment.getSyllabusDetails}?subject_id=${subject_id}`
    );
  }
  subjectData(data: any) {
    console.log(data, 'service');

    return this._http.post(`${environment.subjectTable}`, data);
  }
  getdata1() {
    return this._http.get(`${environment.subjectGet}`);
  }
  treeedata1(subject_id: any) {
    console.log(subject_id, 'from service front');

    return this._http.get(`${environment.treeDataget}?id=${subject_id}`);
  }
  treedata2(subject_id: any) {
    return this._http.get(`${environment.treedata1}?id=${subject_id}`);
  }
  addclass(data: any) {
    console.log(data, 'from service');
    console.log(typeof data);

    return this._http.post<any>(`${environment.assignclass}`, data);
  }
  getclass() {
    return this._http.get<any>(`${environment.getclass}`);
  }
  updateIsActive(value: any) {
    return this._http.put<any>(`${environment.updateIsActive}`, value);
  }
  editvalue(update_value: any) {
    return this._http.put<any>(`${environment.updateclass}`, update_value);
  }
  studentdetails() {
    return this._http.get<any>(`${environment.studentdetails}`);
  }
  assignclass(value1: any) {
    console.log(value1, 'from serice');

    return this._http.put<any>(`${environment.classassign}`, value1);
  }
  deleteclass(element: any) {
    return this._http.put<any>(`${environment.update_class}`, element);
  }
  activeValue() {
    return this._http.get<any>(`${environment.active_value}`);
  }
  treeView() {
    return this._http.get<any>(`${environment.treeView}`);
  }
  post_user(value: any) {
    console.log(value);

    return this._http.post<any>(`${environment.post_user}`, value);
  }
  get_students(id: any) {
    console.log(id, 'from service');

    return this._http.get<any>(`${environment.get_students}?data=${id}`);
  }
  showSubject() {
    return this._http.get<any>(`${environment.showsubject}`);
  }
  getSyllabusdetails2(data: any, country: any, id: number) {
    // console.log(country,'from service');

    return this._http.get<any>(
      `${environment.treeData2}?data=${data}&country=${country}&id=${id}`
    );
  }
  postValue(data: string,country:any,country_id:any,id:any) {
    console.log(data,'from service');

    // console.log(User_details,'user_details');

    console.log(data, 'data');

    return this._http.post<any>(`${environment.PostValue}?country=${country}&User_id=${country_id}&user=${id}`, {data});
  }
  getValue(country:any,country_id:any,id:any) {
    return this._http.get<any>(`${environment.getValue}?country=${country}&User_id=${country_id}&user=${id}`);
  }
  deleteValue(value: number,country:any,id:any,user:any,data:any) {
    console.log(country,id,'from service');
    console.log(data,'data');
    
    return this._http.put<any>(`${environment.deleteValue}?id=${value}&country=${country}&country_id=${id}&user=${user}`,data);
  }
  CompleteValue(country:any,country_id:any,id:any) {
    return this._http.get<any>(`${environment.completeValue}?country=${country}&User_id=${country_id}&user=${id}`);
  }
  updateValue(data: any,country:any,country_id:any,id:any) {
    console.log(data, 'from service');

    return this._http.put<any>(`${environment.updateValue}?country=${country}&User_id=${country_id}&user=${id}`, data);
  }
}
