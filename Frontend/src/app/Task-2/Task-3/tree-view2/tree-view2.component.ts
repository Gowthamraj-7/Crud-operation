import { SelectionModel } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { of } from 'rxjs';
import { TourService } from 'src/app/services/tour.service';

export interface TreeData {
  category_id: string;
  syllabus_parent_id?: string;
  syllabus_name: string;
  ishidden: boolean | string | number;
  children: TreeData[];
  level?: number;
  expandable?: boolean;
}

@Component({
  selector: 'app-tree-view2',
  templateUrl: './tree-view2.component.html',
  styleUrls: ['./tree-view2.component.scss'],
})
export class TreeView2Component implements OnInit {
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

  // Set up the paginator
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;

  text = new FormGroup({
    value: new FormControl('', Validators.required),
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  menuTrigger: any;

  constructor(private _api: TourService, private _dialog: MatDialog) {
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
    this.getSyllabusDetails();
  }

  // getSubject() {
  //   this._tourService.subjectSelect().subscribe((res) => {
  //     this.SubjectSelect = res;
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

  getSyllabusDetails() {
    this._api.treeView().subscribe((res) => {
      console.log(res, 'res');

      this.nestedDataSource.data = res;
      this.nestedTreeControl.dataNodes = res;
      this.nestedTreeControl.expandAll();
    });
  }
  id: any;
  data(node: any) {
    console.log(node, 'from node');
    this.id = node;

    // console.log(this.id.length);
  }

  data1: any={};
  value() {
    const text= this.text.controls['value'].value ;
    this.data1.text_area=text;
    this.data1.id=this.id.syllabus_id

    if (this.data1) {
      // console.log(true);
      
      this._api.post_user(this.data1).subscribe((res) =>{
        if (res === true) {
           this.text.controls['value'].patchValue('');
          
        }
      }
      )
      
    }
  }
}
