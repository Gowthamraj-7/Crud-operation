import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AssignClassComponent } from '../assign-class/assign-class.component';
import { AssignClass1Component } from '../assign-class1/assign-class1.component';
import { TourService } from 'src/app/services/tour.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialogRef } from '@angular/material/dialog';
import { WarningComponent } from '../assign-class1/warning/warning.component';

export interface PeriodicElement {
  position: number;
  // State: boolean;
  // name: string;
  // age: number;
  // weight: number;
  // symbol: string;
  studentname: string;
  class_name: string;
}

@Component({
  selector: 'app-class-assign',
  templateUrl: './class-assign.component.html',
  styleUrls: ['./class-assign.component.scss'],
})
export class ClassAssignComponent implements OnInit {
  disble: boolean = true;
  dataSource: any;
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  displayedColumns: string[] = ['select', 'studentname', 'class_name'];
  // Set up the paginator
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // selection: any;
  selectedData: any = [];
  disableBtn: boolean = false;

  selection = new SelectionModel<PeriodicElement>(true, []);
  selectedStudentId: any[] = [];

  applyFilter(event: Event) {
    console.log(this.dataSource);
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    // console.log(filterValue);

    // this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // checkBox() {
  //   console.log('ok');

  //   this.disableBtn = true;
  // }
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   this.selectedData = this.selection.selected;

  //   const numRows = this.dataSource?.data.length;
  //   return numSelected === numRows;
  // }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    this.selectedData = this.selection.selected;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  row: any;
  click() {
    this._dialog.open(AssignClassComponent, {
      disableClose: true,
    });
  }

  open() {
    const dialog = this._dialog
      .open(AssignClass1Component, {
        data: this.selectedData,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.getdetails();
          this.selection.clear();
          this.selectedData = [];
          console.log('after close');
          console.log(this.selectedData, 'after close');
        }
        // this.selectedData=[]
        // console.log('after close');
        // console.log(this.selectedData,'after close');
      });
    // dialog.afterClosed().subscribe((res) =>{
    //   this.getdetails();
    //   // this.selectedData=[]
    //   // console.log('after close');
    //   // console.log(this.selectedData,'after close');

    // })
  }

  constructor(private _dialog: MatDialog, private _api: TourService) {}

  ngOnInit(): void {
    this.getdetails();
    //  this.data(this.row);
  }
  getdetails() {
    this._api.studentdetails().subscribe((res) => {
      // console.log(res), 'from res';

      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  value(element: any) {
    this._dialog
      .open(WarningComponent, {
        data: element,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res) => {
        if ((res = true)) {
          this.getdetails();
          this.selection.clear();
        }
      });
    // console.log(element, 'from element');
    // this._api.deleteclass(element).subscribe((res) => {
    //   this.getdetails();
    // });
  }
  // dialogClose() {
  //   this._dialogRef.close();
  // }
}
