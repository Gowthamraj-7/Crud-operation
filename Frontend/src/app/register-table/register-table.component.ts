import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { TourService } from '../services/tour.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataSharingService } from '../services/data-sharing/data-sharing-service';

@Component({
  selector: 'app-register-table',
  templateUrl: './register-table.component.html',
  styleUrls: ['./register-table.component.scss'],
})
export class RegisterTableComponent implements OnInit {
  disble: boolean = true;
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'mobile_number',
    'firstname',
    'lastname',
    'gender',
    'dob',
    'country',
  ];
  // Set up the paginator
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _gowtham: TourService,private _dataSharingService:DataSharingService) {}
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this._dataSharingService.return_submit_status.subscribe((res)=>{
      this.getData();
      console.log(res);
    });
    console.log(this.dataSource);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  selectedData: any;
  selectedRow(data: any) {
    console.log(data);
    this.selectedData = data;
    this.disble = false;
  }

  getData() {
    this._gowtham.getData().subscribe((res) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
  }
}
