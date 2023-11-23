import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WarningComponent } from '../warning/warning.component';
import { TourService } from 'src/app/services/tour.service';
import { ClassAssignComponent } from '../../class-assign/class-assign.component';

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
  selector: 'app-alert1',
  templateUrl: './alert1.component.html',
  styleUrls: ['./alert1.component.scss'],
})
export class Alert1Component implements OnInit {
  dataSource: any;
  constructor(
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _api: TourService,
    private dialogRef: MatDialogRef<Alert1Component>
  ) {}

  ngOnInit(): void {
    this.data;
  }

  dialogclick() {
    this.dialogRef.close();
  }
}
