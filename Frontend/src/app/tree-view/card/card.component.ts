import { SelectionModel } from '@angular/cdk/collections';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { count, of } from 'rxjs';
import { DataSharingService } from 'src/app/services/data-sharing/data-sharing-service';
import { TourSelectService } from 'src/app/services/tour-select.service';
import { TourService } from 'src/app/services/tour.service';

// Tree interfaces
export class TodoItemNode {
  children!: TodoItemNode[];
  syllabus_name!: string;
}

export interface DialogData {
  syllabus_name: string;
  Component: string;
  parent: TreeData;
  isTop: boolean;
}

export interface TreeData {
  id: number;
  syllabus_id: string;
  effective_from_datetime: string;
  syllabus_parent_id?: string;
  syllabus_name: string;
  ishidden: boolean | string | number;
  children: TreeData[];
  level?: number;
  expandable?: boolean;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  syllabus_name!: string;
  level!: number;
  expandable!: boolean;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
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
  // checklistSelection = new SelectionModel<TreeData>(true /* multiple */);

  constructor(
    private _tourService: TourService,
    private _dataSharingService: DataSharingService
  ) {
    this.nestedTreeControl = new NestedTreeControl<TreeData>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }

  ngOnInit(): void {
    this.getSubject();
    // this.getData1();

    // this. getSyllabusDetails() ;
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
  selctedSubject: any;
  chooseSubject: any;
  syllabusData: any;

  getSelectedSubject(selectedSubject: any) {
    this.selctedSubject = selectedSubject.subject_id;
    console.log(this.selctedSubject, 'dgswfdhwgwdf');

    this.chooseSubject = selectedSubject.subject_name;
    this.checklistSelection.clear();
    this.selected_category_val = [];
    this.getSyllabusDetails();
    this.data3();
    this.data2();
    // this.click();
  }

  syllabusid: any;
  Ids: any;
  getSyllabusDetails() {
    console.log(this.selctedSubject, 'this.selctedSubject');

    this._tourService
      .getSyllabusDetails(this.selctedSubject)
      .subscribe((res) => {
        console.log(res, 'res');
        this.Ids = res;
        // this.syllabusid = this.syllabusid.syllabus_id;
        // console.log(this.syllabusid);
        this.nestedDataSource.data = res;
        this.nestedTreeControl.dataNodes = res;
        this.nestedTreeControl.expandAll();
      });
  }

  getSubject() {
    this._tourService.subjectSelect().subscribe((res) => {
      this.SubjectSelect = res;
    });
  }

  // getData1() {
  //   this._tourService.getdata1().subscribe((res: any) => {
  //     console.log(res, 'res');
  //   });
  // }

  onSubjectSelected() {
    if (this.selectedSubject) {
    } else {
      this.nestedDataSource.data = [];
    }
  }
  selectedItemIndex = -1;

  onItemClick(index: number) {
    this.selectedItemIndex = index;
  }

  subject_syllabusId: any;
  data2() {
    this._tourService.treeedata1(this.selctedSubject).subscribe((res) => {
      // console.log(res, 'yftefdgtwdfd');
      this.subject_syllabusId = res;
      // console.log(this.subject_syllabusId,'gowtham');
      
      // console.log(this.subject_syllabusId, 'K');
      // if (
      //   this.subject_syllabusId &&
      //   this.subject_syllabusId.length !== undefined
      // ) {
      //   for (let k = 0; k < this.subject_syllabusId.length; k++) {
      //     // console.log(this.subject_syllabusId[k],'hello ');

      //     for (let n = 0; n < this.subjectdata1.length; n++) {
      //       if (
      //         this.subjectdata1[n].syllabus_id == this.subject_syllabusId[k]
      //       ) {
      //         console.log(this.subjectdata1[n], 'dwdb');
      //         this.checklistSelection.select(this.subjectdata1[n]);
      //         this.nestedTreeControl.expandAll();
      //       }
      //     }
      //   }
      // }
      this.selectedCategoryTick(this.Ids);
    });
  }

  selectedCategoryTick(data: any) {
    console.log(data, 'Data');
    let a: any[] = [];
    let count = 1;
    a.push(data);
    console.log(a);

    while (a.length > 0) {
      let b: any[] = [];
      for (let i = 0; i < a.length; i++) {
        // console.log(a[i],'from ai');

        for (let j = 0; j < a[i].length; j++) {

          // console.log([a][i],'from aij');
          
          for (let k = 0; k < this.subject_syllabusId.length; k++) {

            // console.log(this.subject_syllabusId.length,'from sub');
            
            if (a[i][j].syllabus_id == this.subject_syllabusId[k]) {
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

  subjectdata1: any;
  data3() {
    this._tourService.treedata2(this.selctedSubject).subscribe((res) => {
      console.log(res, 'fianla djd');
      this.subjectdata1 = res;
    });

    // this.click();
  }

  click() {
    // this.data2();
    // this.data3();
    // if (this.subject_syllabusId && this.subject_syllabusId.length !== undefined) {
    // for (let k = 0; k < this.subject_syllabusId.length; k++) {
    //   // for (let j = 0; j < this.subjectdata1[k].length; j++) {
    // // console.log(this.subject_syllabusId[k],'hello ');
    //     for (let n = 0; n < this.subjectdata1.length; n++) {
    //       if (this.subjectdata1[n].syllabus_id==this.subject_syllabusId[k]) {
    //           console.log(this.subjectdata1[n].syllabus_id,'dwdb');
    //         this.checklistSelection.select(this.subject_syllabusId[k]);
    //         this.nestedTreeControl.expandAll();
    //       }
    //     }
    //   }
    // }
    // }
  }
}
