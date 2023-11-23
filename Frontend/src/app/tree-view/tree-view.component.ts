import { Component, OnInit, ViewChild } from '@angular/core';
import { TourService } from '../services/tour.service';
import { SelectionModel } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { of } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CardComponent } from './card/card.component';
import { DataSharingService } from '../services/data-sharing/data-sharing-service';

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
  category_id: string;
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
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
})
export class TreeViewComponent implements OnInit {
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
  displayedColumns: string[] = ['subject_name', 'syllabus_name'];
  // Set up the paginator
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  menuTrigger: any;

  constructor(private _tourService: TourService, private _dialog: MatDialog,private _dataSharingService: DataSharingService) {
    this.nestedTreeControl = new NestedTreeControl<TreeData>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    // this.getTreeData();
    this.getSubject();
    this.getData1();
  }

  getSubject() {
    this._tourService.subjectSelect().subscribe((res) => {
      this.SubjectSelect = res;
    });
  }

  // getTreeData() {
  //   this._tourService.treeData().subscribe((res) => {
  //     console.log(res, 'from tree view ');
  //   });
  // }

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
  // Tree End
  // selectedData:any;

  // selectedRow(dataNodes: any) {
  //   console.log(dataNodes);
  //   this.selectedData = dataNodes;
  // }
  getUsers() {
    // console.log(this.selected_data,'udyv');
    //  this.selected_data
    // console.log(this.selected_category_val, 'sdgvg');
    // this.data.push(this.chooseSubject);
    // console.log(this.data);
    // this.data.push(this.selected_category_val);
    // console.log(this.data, 'fsgfus');
  }

  data: any = [];
  selctedSubject: any;
  chooseSubject: any;
  syllabusData: any;

  getSelectedSubject(selectedSubject: any) {
    this.selctedSubject = selectedSubject.subject_id;
    this.chooseSubject = selectedSubject.subject_name;
    this.checklistSelection.clear();
    this.selected_category_val = [];
    this.getSyllabusDetails();
  }

  syllabusid: any;
  getSyllabusDetails() {
    this._tourService
      .getSyllabusDetails(this.selctedSubject)
      .subscribe((res) => {
        console.log(res, 'res');
        // this.syllabusid = this.syllabusid.syllabus_id;
        // console.log(this.syllabusid);
        this.nestedDataSource.data = res;
        this.nestedTreeControl.dataNodes = res;
        this.nestedTreeControl.expandAll();
      });
  }
  value() {
    let data2: any[] = [];
    data2.push(this.selctedSubject);
    data2.push(this.selected_category_val);
    // console.log('Syllabus:', this.checklistSelection.selected);
    console.log(data2);

    this._tourService.subjectData(data2).subscribe((res) => {

      console.log(res,'selected by faculty');
      
      this._dataSharingService.updateSubmitStatus(true);
      if (res) {
        this.getData1();
        // this.clearArray(data2);
      }
    });
  }
  // clearArray(array: any) {
  //   while (array.length > 0) {
  //     array.pop();
  //   }
  // }
  item: any = [];
  subject_name: any[] = [];
  syllabus_id_value: any = [];

  getData1() {
    this._tourService.getdata1().subscribe((res: any) => {
      console.log(res);


      // for (let i = 0; i < res.length; i++) {
      //   const item1 = res[i].syllabus_name.split(',');
      //   this.item.push(item1)
      // }

      // console.log(this.item,'tttttt');

      // for (let j = 0; j < this.item.length; j++) {
      //   for (let k = 0; k < this.item[j].length; k++) {
      //     const foundObject = this.selected_category_val.find(
      //       (obj) => obj.syllabus_id === this.item[j][k].syllabus_id
      //     );
      //     console.log(foundObject, this.item[j][k].syllabus_id);
      //     }
      // }
      // console.log(this.item, 'item');

      //   if (res[2].syllabus_id =this.data.selctedSubject) {
      //     this.item.push(res[2].syllabus_id)

      //     console.log(this.item,'value from subject names');

      // }
      // }
      // const arrayToString: any = this.syllabus_id_value.join(', ');
      // const varrr:any={
      //   id:1,
      //   subject_name:'maths',
      //   syllabus_id:arrayToString
      // }

      // console.log(varrr,"syllabus_id");
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
  }
  onSubjectSelected() {
    // Implement your logic here to fetch and display syllabus details
    // based on the selectedSubject value.
    // For example, you can make an API call here to retrieve the data.
    if (this.selectedSubject) {
      // Subject is selected, fetch and display syllabus details
      // this.getSyllabusDetails(this.selectedSubject);
    } else {
      this.nestedDataSource.data = [];
    }
    // } else {
    //   // Subject is not selected, you can clear or hide syllabus details
    //   // based on your application's requirements.
    //   // For instance, reset the tree data source:
    //   this.dataSource.data = [];
    // }
  }

  selectedItemIndex = -1;

  onItemClick(index: number) {
    this.selectedItemIndex = index;
  }
  
  // openMenu(event: MouseEvent) {
  //   this.menuTrigger.openMenu();
  //   event.stopPropagation(); // Prevent the click event from bubbling up
  // }

  // open(Element: any) {
  //   const dialogconfig = new MatDialogConfig();
  //   let dialog = this._dialog.open(CardComponent, { data: Element });
  //   dialog.afterClosed().subscribe();
  // }
}
