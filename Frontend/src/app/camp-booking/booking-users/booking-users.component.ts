import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CountryCode } from 'ngx-mat-intl-tel-input/lib/data/country-code';
import { TourSelectService } from 'src/app/services/tour-select.service';
import { TourService } from 'src/app/services/tour.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-booking-users',
  templateUrl: './booking-users.component.html',
  styleUrls: ['./booking-users.component.scss'],
})
export class BookingUsersComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['select', 'id', 'country', 'place'];

  // Set up the paginator
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selecteddata: any[] = [];
  selection = new SelectionModel<PeriodicElement>(true, []);
  constructor(
    private _gowtham: TourSelectService,
    private _dialogref: MatDialogRef<BookingUsersComponent>
  ) {}

  ngOnInit(): void {
    this.getUsersList();
 
  }
  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    this.selecteddata = this.selection.selected;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
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

  selectedData: any;
  selectedRow(data: any) {
    console.log(data);
    this.selectedData = data;
  }

  getUsersList() {
    this._gowtham.getUsersList().subscribe((res) => {
      console.log(res);
      const data: any = res;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  getUsers() {
    this._dialogref.close(this.selecteddata);
  }

  selectedvalue(data: any) {}
}
