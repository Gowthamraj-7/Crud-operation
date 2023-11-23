import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snack-bar/snackbar.service';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  deletedata: any=[]
  country: any;
  id: any;

  Delete_id:any
  user: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data1: any,
    private _api: TourService,
    private _dialogRef: MatDialogRef<DeleteComponent>,
    private _dialog: MatDialog,
    private _snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.Delete_id = this.data1.selectedRow.task_id;
  }

  delete() {

    this.country = 'in';
    this.id = 9;
    this.user=4335
    this.deletedata={
     
   
        entry_by_user_id: 4335,
        entry_type: 'Delete To_do task',
 
      
    
    }
  
    console.log(this.deletedata,'sdysgudsyg');

    this._api.deleteValue(this.Delete_id,this.country,this.id,this.user,this.deletedata).subscribe((res) => {
    
      
      if ((res)) {
        this._dialogRef.close(true);
        this._snackBar.success('Data deleted Successfully');
      }
    });
  }
  DialogClose() {
    this._dialogRef.close();
  }
}
