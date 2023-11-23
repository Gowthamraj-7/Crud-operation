import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TabComponent } from '../main/tab/tab.component';
import { TableComponent } from '../main/table/table.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { 
   
    }


    getData():Observable<any>{
     return this._http.get<any>(environment.getUsers);
    }

    postData(value:any){
      return this._http.post(environment.postusers,value)
    }
    udpateDate(value:any,id:number){
      return this._http.put(environment.update(id),value)
    }

    deleteData(value:number){
      return this._http.delete<any>(environment.deleteUsers(value))
    }

    deleteUser(value:number){
      return this._http.delete<any>(`${environment.delete_user}?id=${value}`)
    }

  }

  

