import { SelectionModel } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DateTime } from 'luxon';
import { of } from 'rxjs';
import { DataSharingService } from 'src/app/services/data-sharing/data-sharing-service';
import { EncryptService } from 'src/app/services/encrypt/encrypt.service';
import { TourService } from 'src/app/services/tour.service';

interface Food {
  value: string;
  viewValue: string;
}
export interface TreeData {
  category_id: string;
  syllabus_parent_id?: string;
  syllabus_name: string;
  ishidden: boolean | string | number;
  children: TreeData[];
  level?: number;
  expandable?: boolean;
  syllabus_id: number;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  currentDate = new Date();
  nestedTreeControl!: NestedTreeControl<TreeData>;
  nestedDataSource!: MatTreeNestedDataSource<TreeData>;
  checklistSelection = new SelectionModel<TreeData>(true /* multiple */);
  selected_category_val: any[] = [];
  selected_data: any = [];
  SubjectSelect: any = [];
  selectedSubject: string | null = null;
  Value: string | null = null;
  disble: boolean = true;
  dataSource: any = [];
  data6: any;
  Add: FormGroup;
  Date!: FormControl;
  // = new FormGroup({

  //   Name: new FormControl('', Validators.required),
  //   Date: new FormControl(),
  //   subject: new FormControl('', Validators.required),
  //   Status: new FormControl('1', Validators.required),
  // });

  constructor(
    private _tourService: TourService,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data1: any,
    private _dialogRef: MatDialogRef<AddComponent>,
    private _formBuilder: FormBuilder,
    public _encrypt:EncryptService
  ) {
    this.nestedTreeControl = new NestedTreeControl<TreeData>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.Add = this._formBuilder.group({
      Name: ['', Validators.required],
      Date: [this.Date],
      subject: ['', Validators.required],
      Status: ['1', Validators.required],
    });
    // const formattedDate = DateTime.fromJSDate(new Date(this.data1.selectedRow.due_datetime)).toFormat(
    //   'yyyy-MM-dd'
    // );
    // console.log(formattedDate, 'due');

    // const currentDate = new Date();
    // const formattedDate1 = DateTime.fromJSDate(new Date(currentDate)).toFormat(
    //   'yyyy-MM-dd'
    // );
    // console.log(formattedDate1, 'curr');

    // console.log(
    //   formattedDate <= formattedDate1,
    //   'formattedDate < formattedDate1'
    // );
    // if (formattedDate <= formattedDate1) {
    //   console.log('if');

    //   this.Date = this._formBuilder.control( []);

    //   //       this.Add.get('Date')?.updateValueAndValidity();
    // } else {
    //   console.log('else');
    //   this.Date = this._formBuilder.control( [Validators.required]);

    //   // this.Add.controls['Date'].setValidators(Validators.required);
    // }
  }
  title: any;
  selctedSubject: any;

  ngOnInit(): void {
    this.getSubject();
    if (this.data1.type == 1) {
      this.title = this.data1.dialog_title;
    } else {
      // console.log(this.data1.selectedRow.task_id,'sadcdsdsedug');
      // // console.log(typeof(this.data1.selectedRow.task_completion_status),'addj');
      console.log(this.data1.selectedRow.due_datetime);

      console.log(this.data1);

      this.title = this.data.dialog_title;
      this.Add.controls['Name'].patchValue(this.data1.selectedRow.task_name);
      this.Add.controls['Date'].setValue(this.data1.selectedRow.due_datetime);
      this.Add.controls['subject'].patchValue(
        this.data1.selectedRow.relevent_subject
      );
      this.Add.controls['Status'].patchValue(
        this.data1.selectedRow.task_completion_status.toString()
      );
      this.selctedSubject =
        this.data1.selectedRow.relevent_institutional_course_subject_id;
      this.isDatetimeInFuture(this.data1.selectedRow.due_datetime);
      // this.dateNotInPast(this.data1.selectedRow.due_datetime)
      this.getSyllabusDetails();
    }
  }
  // ngDoCheck(): void {
  //   //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //   //Add 'implements DoCheck' to the class.
  //   this.isDatetimeInFuture(this.data1.selectedRow.due_datetime)

  // }
  data5: any;
  getSubject() {
    this._tourService.showSubject().subscribe((res) => {
      this.SubjectSelect = res;
    });
  }

  onExpandRow(item: any, row: Element) {
    console.log(item);
  }

  private _getChildren = (node: TreeData) => of(node.children);

  hasNestedChild = (_: string, nodeData: TreeData) =>
    nodeData.children.length > 0;

  refreshTreeData() {
    const data = this.nestedDataSource.data;
    this.nestedDataSource.data = [];
    this.nestedDataSource.data = data;
  }

  getLevel = (node: TreeData): any => node.level;

  isExpandable = (node: TreeData) => node.expandable;

  descendantsAllSelected(node: TreeData): boolean {
    const descendants = this.nestedTreeControl.getDescendants(node);
    const descAllSelected = descendants.every((child) =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TreeData): boolean {
    const descendants = this.nestedTreeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TreeData): void {
    this.checklistSelection.toggle(node);
    const descendants = this.nestedTreeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
    this.selected_category_val = this.checklistSelection.selected;
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TreeData): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
    // console.log(node.user_catrgorey_name,'node value11');

    this.selected_category_val = this.checklistSelection.selected;
    console.log(this.selected_category_val, 'from select');
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TreeData): void {
    let parent: TreeData | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TreeData): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.nestedTreeControl.getDescendants(node);
    const descAllSelected = descendants.every((child) =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TreeData): TreeData | null {
    const currentLevel: any = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.nestedTreeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode: any = this.nestedTreeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  data: any = [];
  noData: any;
  chooseSubject: any;
  syllabusData: any;
  country: any;
  id: any;
  getSelectedSubject(place: any) {
    this.selctedSubject = place.institutional_course_subject_id;
    // console.log(this.selctedSubject, 'from id');
    // this.selctedSubject=this.data1.selectedRow.relevent_institutional_course_subject_id
    // this.chooseSubject = selectedSubject.subject_name;

    this.checklistSelection.clear();
    this.selected_category_val = [];
    this.getSyllabusDetails();
  }

  Ids: any;

  getSyllabusDetails() {
    this.country = 'in';
    this.id = 9;

    // this.selctedSubject=this.data1.selectedRow.relevent_institutional_course_subject_id
    this._tourService
      .getSyllabusdetails2(this.selctedSubject, this.country, this.id)
      .subscribe((res) => {
        console.log(res, 'res from tree');
        this.Ids = res;
        if (this.Ids != 2) {
          this.nestedDataSource.data = res;
          // this.nestedDataSource.data = res;
          this.nestedTreeControl.dataNodes = res;
          this.nestedTreeControl.expandAll();

          this.selectedCategoryTick(this.Ids);
          this.selected_category_val = this.checklistSelection.selected;
        } else {
          this.nestedDataSource.data = [];
          this.nestedTreeControl.dataNodes = [];
        }
      });
  }
  data2: any = [];
  User_details: any = [];
  click() {
    if (this.data1.type == 1) {
      const datetime: any = this.Add.controls['Date'].value;
      // console.log(datetime,'from datetime');
      this.User_details = {
        Country: 'in',
        id: 9,
        db_id: 30,
        User_id: 4335,
      };
      this.data2 = {
        data: {
          Date: this.Add.controls['Date'].value,
          Name: this.Add.controls['Name'].value,
          dateTime: datetime._d,
          Subject: this.selctedSubject,
          Status: this.Add.controls['Status'].value,
          tree: this.selected_category_val,
          updated_by_user_id: 35,
        },
        Audit:{
            entry_by_user_id: 4335,
            entry_type: 'insert To_do task',
            entry_datetime: this.currentDate,
          
        }
      };
      (this.country1 = 'in'),
       (this.id = 9),
        (this.User_id = 4335);
      console.log(this.data2.length, 'from data');
      const encrypt =JSON.stringify(this._encrypt.encryptionAES(this.data2))
      if (encrypt) {
        console.log(this.data2, 'data2');
        console.log(encrypt,'lourdhu');
        console.log(typeof(encrypt));
        
      
        this._tourService
          .postValue(encrypt, this.country1, this.id, this.User_id)
          .subscribe((res: any) => {
            if (res == true) {
              this._dialog.closeAll();
            }
          });
      }
    }
  }

  selectedCategoryTick(data: any) {
    if (this.data1.type == 2) {
      // console.log(data, 'Data');
      let a: any[] = [];
      let count = 1;
      a.push(data);
      // console.log(a);

      while (a.length > 0) {
        let b: any[] = [];
        for (let i = 0; i < a.length; i++) {
          // console.log(a[i],'from ai');

          for (let j = 0; j < a[i].length; j++) {
            // console.log([a][i],'from aij');
            // console.log(this.data1.selectedRow.relevent_syllabus_ids,'relevent');

            for (
              let k = 0;
              k < this.data1.selectedRow.relevent_syllabus_ids.length;
              k++
            ) {
              // console.log(this.data1.selectedRow.relevent_syllabus_ids[k],'from sub');

              if (
                a[i][j].syllabus_id ==
                this.data1.selectedRow.relevent_syllabus_ids[k]
              ) {
                count++;
                this.checklistSelection.select(a[i][j]);
                this.nestedTreeControl.expandAll();
              }
            }
            b.push(a[i][j].children);
          }
        }
        a = b;
      }
    }
  }
  data3: any = [];
  Concadenate: any;

  country1: any;
  User_id: any;
  User: any;
  updateValue() {
    this.Concadenate = this.data1.selectedRow.relevent_syllabus_ids;
    console.log(this.Concadenate);

    let tree_value;
    let items: any = [];
    let concatenatedString: any;

    if (this.selected_category_val.length > 0) {
      for (let i = 0; i < this.selected_category_val.length; i++) {
        items.push(this.selected_category_val[i].syllabus_id);
        concatenatedString = items.join(',');
      }
      console.log(concatenatedString, 'from string');

      tree_value = concatenatedString;
      console.log(this.selected_category_val, 'selected value');
    } else {
      for (let i = 0; i < this.Concadenate.length; i++) {
        items.push(this.Concadenate[i]);
        concatenatedString = items.join(',');
      }
      tree_value = concatenatedString;

      // console.log(tree_value, 'tree_value');
    }

    const datetime2: any = this.Add.controls['Date'].value;

    // this.User_details = {
    //   Country: 'in',
    //   id: 9,
    //   User_id: 4335
    // };
    //  console.log(datetime2,'from datetime');

    this.data3 = {
      data: {
        Date: this.Add.controls['Date'].value,
        Name: this.Add.controls['Name'].value,
        dateTime: datetime2._d,
        Subject: this.selctedSubject,
        Status: this.Add.controls['Status'].value,
        tree: tree_value,
        updated_by_user_id: 35,
        task_id: this.data1.selectedRow.task_id,
      },
      Audit:{
        entry_by_user_id: 4335,
        entry_type: 'Update To_do Task',
        entry_datetime: this.currentDate,
      
    }
    };

    (this.country1 = 'in'), (this.id = 9), (this.User_id = 4335);
    console.log(this.data3, 'from data');
    if (this.data3) {
      this._tourService
        .updateValue(this.data3, this.country1, this.id, this.User_id)
        .subscribe((res) => {
          if ((res = true)) {
            this._dialogRef.close(true);
          }
        });
    }
  }

  isDatetimeInFuture(datetime: Date) {
    const formattedDate = DateTime.fromJSDate(new Date(datetime)).toFormat(
      'yyyy-MM-dd'
    );
    console.log(formattedDate, 'due');

    const currentDate = new Date();
    const formattedDate1 = DateTime.fromJSDate(new Date(currentDate)).toFormat(
      'yyyy-MM-dd'
    );
    console.log(formattedDate1, 'curr');

    // console.log(
    //   formattedDate <= formattedDate1,
    //   'formattedDate < formattedDate1'
    // );
    if (formattedDate <= formattedDate1) {
      console.log('if');
      this.currentDate = new Date(datetime);
      this.Date = this._formBuilder.control('', []);

      //       this.Add.get('Date')?.updateValueAndValidity();
    } else {
      console.log('else');
      this.Date = this._formBuilder.control('', [Validators.required]);

      // this.Add.controls['Date'].setValidators(Validators.required);
    }
    // return formattedDate > formattedDate1;
    this.Add.get('Date')?.updateValueAndValidity();
  }
}
