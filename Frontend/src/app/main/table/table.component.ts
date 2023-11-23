import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SecondTableComponent } from './second-table/second-table.component';
import { ApiService } from 'src/app/services/api.service';

export interface PeriodicElement {
  position: number;
  State: boolean;
  name: string;
  age: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { State: false, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   { State: false, position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { State: false, position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   {
//     State: false,
//     position: 4,
//     name: 'Beryllium',
//     weight: 9.0122,
//     symbol: 'Be',
//   },
//   { State: false, position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { State: false, position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { State: false, position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { State: false, position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { State: false, position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { State: false, position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'id',
    'name',
    'age',
     
     'dob',
      'gender',
      'course',
      'address',
    
  ];

  disble:boolean=true;
  dataSource:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _dialog: MatDialog, private _api: ApiService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.getData();
  }

  addUser() {
    this._dialog.open(SecondTableComponent, {
      disableClose: true,
      data:{
        type:1,
        dialog_title:'Add User'
      }
    }).afterClosed().subscribe((res)=>{
      console.log(res,'table');
      if(res==1){
       this.getData();
      }
    });
  }
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // toggleAllRows() {
  //   if (this.isAllSelected()) {
  //     this.selection.clear();
  //     return;
  //   }

  //   this.selection.select(...this.dataSource.data);
  // }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: PeriodicElement): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }

  // Filter Event
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getData() {
    this._api.getData().subscribe((res) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
    });
  }
  delete_method() {
    this._api.deleteUser(this.selectedData.id).subscribe((res) => {
console.log(res);
if(res==true){
  this.getData();

}
    });
   
  }

  editData(){
    this._dialog.open(SecondTableComponent,{
      data:{
        type:2,
        dialog_title:'Edit User',
        selected_data:this.selectedData
      }
    }).afterClosed().subscribe((res)=>{
      if(res==1){
        this.getData();
      }
    })
  }

  del() {
    confirm('are you want to delete');
  }



  selectedData:any;
  selectedRow(data:any){
    console.log(data);
    this.selectedData=data;
    this.disble=false;
  }
}
