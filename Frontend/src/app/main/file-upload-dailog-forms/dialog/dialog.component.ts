import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
export interface DialogData {
  source: string;
  destination: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  firstTextField = new FormGroup({
    message: new FormControl('', Validators.required),
  });

  source: any;
  destination: any;

  constructor(private _dialog: MatDialog) {}

  openDialog(): void {
    const _dialogRef = this._dialog.open(AlertDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { source: this.source, destination: this.destination },
    });
    _dialogRef.afterClosed().subscribe((res) => {
      this.destination = res;
    });
  }

  ngOnInit(): void {}
}
