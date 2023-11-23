import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourSelectService {

  constructor(private _http:HttpClient) { }


  getData(){
    console.log(this._http.get<any>(`http://localhost:3000/tour/users`),'skjfgiu');
    
    return this._http.get<any>(`http://localhost:3000/tour-select/users`);
   }
   postData(value:any){
    console.log(value,'from service page');
    
    return this._http.post(environment.postvalue,value)
  }
  // post_country(selectvalue:any){
  //   return this._http.post<any>(`${select.post_country}`,selectvalue);
  // }
  get_place(selectCountry:string){
    // console.log(selectCountry,'from service file');
    // console.log(typeof(selectCountry),'from service file');
    
    return this._http.get<any>(`${environment.getUsersList}?country=${selectCountry}`);
  }
  active1:any
  active_value(id:number,active:number,audit:any){
    console.log(  audit,'service value');
    this.active1={
      active1:active
    }
    return this._http.put<any>(`${environment.activeApi}?camp-id=${id}`,[this.active1,audit])
  }
  getUsersList(){
    return  this._http.get<any>(`${environment.userdata}`)
  }
  getcamp(data:any){
    console.log(data,'from service file');
    
    return this._http.post<any>( `${environment.getcamp}`,data);
  }
  getAudit(){
    return this._http.get(`${environment.Auditvalue}`)
  }
}
