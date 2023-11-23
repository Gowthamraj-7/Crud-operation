import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AddClassComponent } from '../add-class/add-class.component';
import { TourService } from 'src/app/services/tour.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

export interface PeriodicElement {
  position: number;
  State: boolean;
  name: string;
  age: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-assign-class',
  templateUrl: './assign-class.component.html',
  styleUrls: ['./assign-class.component.scss'],
})
export class AssignClassComponent implements OnInit {
  disble: boolean = true;
  dataSource: any;

  displayedColumns: string[] = ['select', 'class_name', 'Capacity', 'isactive'];
  active: any;

  // Set up the paginator
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selecteddata: any;
  disableBtn: boolean = true;
  selection = new SelectionModel<PeriodicElement>(true, []);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  // selectedData: any;
  // selectedRow(data: any) {
  //   console.log(data);
  //   this.selectedData = data;
  // }
  selectedStudentId: any[] = [];
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    this.selecteddata = this.selection.selected;
    // for (let i = 0; i < this.selecteddata.length; i++) {
    //   this.selectedStudentId.push(this.selecteddata[i].student_id);
    // }
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  click() {
    this._dialog
      .open(AddClassComponent, {
        disableClose: false,
        data: {
          type: 1,
          dialog_title: 'Add User',
        },
      })

      .afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.getclass();
        }
      });
  }

  constructor(private _dialog: MatDialog, private _api: TourService) {}

  ngOnInit(): void {
    this.getclass();
  }
  selectedData: any;
  selectedData1: any;
  getclass() {
    this._api.getclass().subscribe((res: any) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  updateIsActive() {
    this._api.updateIsActive(this.selectedData1).subscribe((res) => {
      console.log(res, 'isactive');
      this.disableBtn = true;
      this.getclass();
    });
  }

  data(row: any) {
    this.disableBtn = false;
    console.log(row);
    this.selectedData = row.is_active;
    this.selectedData1 = row;
    // // this.selectedData1.push(row)
    // this.selectedData.push(row)
    console.log(this.selectedData, 'settr');
  }

  edit() {
    this._dialog
      .open(AddClassComponent, {
        disableClose: false,
        data: {
          type: 2,
          dialog_title: 'Edit User',
          selectedRow: this.selectedData1,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.getclass();
          this.disableBtn=true;
        }
      });
  }

  // activebtn(){
  //   this._api.
  // }
}
