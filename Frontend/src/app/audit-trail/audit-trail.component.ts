import { Component, OnInit, ViewChild } from '@angular/core';
import { TourSelectService } from '../services/tour-select.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.scss']
})
export class AuditTrailComponent implements OnInit {
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = [
    'id',    
    'entry_by_user_id',
    'entry_type',
    'entry_datetime'
  ];
 

applyFilter($event: KeyboardEvent) {
throw new Error('Method not implemented.');
}


  constructor(private _api:TourSelectService) { }

  ngOnInit(): void {
    this.getdata();
  }

  getdata(){
     this._api.getAudit().subscribe((res) =>{
       console.log(res)
       const data: any = res;
       this.dataSource = new MatTableDataSource(data);
       this.dataSource.paginator=this.paginator; 
     })
  }
  
}
