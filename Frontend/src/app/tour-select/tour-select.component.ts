import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SecondTableComponent } from '../main/table/second-table/second-table.component';
import { AddTourComponent } from './add-tour/add-tour.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TourSelectService } from '../services/tour-select.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-tour-select',
  templateUrl: './tour-select.component.html',
  styleUrls: ['./tour-select.component.scss'],
})
export class TourSelectComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['select', 'id', 'country', 'place', 'active'];
  disble!: boolean;



  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Set up the paginator
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;

  constructor(private _dialog: MatDialog, private tour1: TourSelectService) {}

  ngOnInit(): void {
    this.method();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Current Time
  currentTime: any = DateTime.local({
    zone: 'Asia/Kolkata',
  }).toFormat('dd MMM y h:mm a');

  test = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    dob: new FormControl(''),
    gender: new FormControl(''),
    select: new FormControl(''),
    address: new FormControl(''),
  });

  addUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '350px';
    this._dialog
      .open(AddTourComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        this.method();
      });
  }

  method() {
    this.tour1.getData().subscribe((res) => {
      console.log(res, 'table value');
      this.dataSource.data = res; // Assign data to the MatTableDataSource
    });
  }

  selectedData: any;
  id: any;
  active: any;
  disableBtn: boolean = true;

  audit = {
    entry_by_user_id: 1,
    entry_type: 'update',
    entry_datetime: this.currentTime,
  };

  selectedRow(data: any) {
    this.disableBtn = false;

    console.log(data);
    this.selectedData = data;
    this.id = data.camp_id;
    this.active = data.active1;
    this.disble = false;
  }

  activeBtn() {
    console.log(this.id);
    console.log(this.active, 'hdtfmxfx');

    this.tour1
      .active_value(this.id, this.active, this.audit)
      .subscribe((res) => {
        // console.log(res,"res value");
        this.method();
        this.disableBtn = true;
      });
  }
}
