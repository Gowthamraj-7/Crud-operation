import { SelectionModel } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { of } from 'rxjs';

export interface TreeData {
  category_id: string;
  parent_category_id?: string;
  category_name: string;
  ishidden: boolean | string | number;
  children: TreeData[];
  level?: number;
  expandable?: boolean;
}

@Component({
  selector: 'app-radio-without-parent',
  templateUrl: './radio-without-parent.component.html',
  styleUrls: ['./radio-without-parent.component.scss'],
})
export class RadioWithoutParentComponent implements OnInit {
  constructor() {
  
    this.nestedTreeControl = new NestedTreeControl<TreeData>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }
  nestedTreeControl: NestedTreeControl<TreeData>;
  nestedDataSource: MatTreeNestedDataSource<TreeData>;
  checklistSelection = new SelectionModel<TreeData>(true /* multiple */);
  selected_category_val: any = [];

  ngOnInit(): void {
    const TREE_DATA: any[] = [
      {
        id: 4,
        user_category_id: 'q58fKyDmbKBmyUu',
        parent_user_category_id: null,
        user_category_name: 'Students',
        is_the_category_hidden: 0,
        category_type: 2,
        children: [
          {
            id: 5,
            user_category_id: 'yZHYHjC9OBx8iJW',
            parent_user_category_id: 'q58fKyDmbKBmyUu',
            user_category_name: '8th-Std',
            is_the_category_hidden: 0,
            category_type: 2,
            children: [
              {
                id: 6,
                user_category_id: 'quL514rHDMdpMw0',
                parent_user_category_id: 'yZHYHjC9OBx8iJW',
                user_category_name: 'Section-A',
                is_the_category_hidden: 0,
                category_type: 2,
                children: [],
              },
              {
                id: 7,
                user_category_id: 'b6Zq0X7PcU1yNfy',
                parent_user_category_id: 'yZHYHjC9OBx8iJW',
                user_category_name: 'Section-B',
                is_the_category_hidden: 0,
                category_type: 2,
                children: [],
              },
              {
                id: 8,
                user_category_id: 'I2nNV9dAPSYplpA',
                parent_user_category_id: 'yZHYHjC9OBx8iJW',
                user_category_name: 'Section-C',
                is_the_category_hidden: 0,
                category_type: 2,
                children: [],
              },
            ],
          },
          {
            id: 9,
            user_category_id: 'rcmQXQrpWFP4bRg',
            parent_user_category_id: 'q58fKyDmbKBmyUu',
            user_category_name: '9th-Std',
            is_the_category_hidden: 0,
            category_type: 2,
            children: [
              {
                id: 13,
                user_category_id: 'OaI0B4mNNkPoZPS',
                parent_user_category_id: 'rcmQXQrpWFP4bRg',
                user_category_name: 'Section-A',
                is_the_category_hidden: 0,
                category_type: 2,
                children: [],
              },
              {
                id: 14,
                user_category_id: 'XorCGbsNVlMIFQr',
                parent_user_category_id: 'rcmQXQrpWFP4bRg',
                user_category_name: 'Section-B',
                is_the_category_hidden: 0,
                category_type: 2,
                children: [],
              },
              {
                id: 15,
                user_category_id: 'WPRaDa2b0aYqnMB',
                parent_user_category_id: 'rcmQXQrpWFP4bRg',
                user_category_name: 'Section-C',
                is_the_category_hidden: 0,
                category_type: 2,
                children: [],
              },
            ],
          },
          {
            id: 10,
            user_category_id: 'pyIggUScRGe3GC0',
            parent_user_category_id: 'q58fKyDmbKBmyUu',
            user_category_name: '10th-Std',
            is_the_category_hidden: 0,
            category_type: 2,
            children: [
              {
                id: 16,
                user_category_id: 'uBcfNHHQ1Maqdop',
                parent_user_category_id: 'pyIggUScRGe3GC0',
                user_category_name: 'Section-A',
                is_the_category_hidden: 0,
                category_type: 2,
                children: [],
              },
              {
                id: 17,
                user_category_id: 'fIuri58Ifdo95Cp',
                parent_user_category_id: 'pyIggUScRGe3GC0',
                user_category_name: 'Section-B',
                is_the_category_hidden: 0,
                category_type: 2,
                children: [],
              },
              {
                id: 18,
                user_category_id: 'tqjZqxusnmMrYXj',
                parent_user_category_id: 'pyIggUScRGe3GC0',
                user_category_name: 'Section-C',
                is_the_category_hidden: 0,
                category_type: 2,
                children: [],
              },
            ],
          },
          {
            id: 11,
            user_category_id: 'r2sO9ej1LOD7zeo',
            parent_user_category_id: 'q58fKyDmbKBmyUu',
            user_category_name: '11th-Std',
            is_the_category_hidden: 0,
            category_type: 2,
            children: [
              {
                id: 19,
                user_category_id: 'sx1NPHtWubfQqhy',
                parent_user_category_id: 'r2sO9ej1LOD7zeo',
                user_category_name: 'Biology/Mathematics',
                is_the_category_hidden: 0,
                category_type: 2,
                children: [
                  {
                    id: 22,
                    user_category_id: 'ap9ke9FAhyHXpru',
                    parent_user_category_id: 'sx1NPHtWubfQqhy',
                    user_category_name: 'Section-A',
                    is_the_category_hidden: 0,
                    category_type: 2,
                    children: [],
                  },
                  {
                    id: 23,
                    user_category_id: 'xkr9z1D3YxExQXp',
                    parent_user_category_id: 'sx1NPHtWubfQqhy',
                    user_category_name: 'Section-B',
                    is_the_category_hidden: 0,
                    category_type: 2,
                    children: [],
                  },
                  {
                    id: 24,
                    user_category_id: '3tqV3v1dAlZl0wI',
                    parent_user_category_id: 'sx1NPHtWubfQqhy',
                    user_category_name: 'Section-C',
                    is_the_category_hidden: 0,
                    category_type: 2,
                    children: [],
                  },
                ],
              },
              {
                id: 20,
                user_category_id: 'b1kelHpcdoI2chG',
                parent_user_category_id: 'r2sO9ej1LOD7zeo',
                user_category_name: 'Comp.Science/Mathematics',
                is_the_category_hidden: 0,
                category_type: 2,
                children: [
                  {
                    id: 25,
                    user_category_id: 'mTM6PCb8m6TJZTo',
                    parent_user_category_id: 'b1kelHpcdoI2chG',
                    user_category_name: 'Section-A',
                    is_the_category_hidden: 0,
                    category_type: 2,
                    children: [],
                  },
                  {
                    id: 26,
                    user_category_id: 'MyPHtFcrPi0YXLe',

                    parent_user_category_id: 'b1kelHpcdoI2chG',
                    user_category_name: 'Section-B',
                    is_the_category_hidden: 0,
                    category_type: 2,
                    children: [],
                  },
                  {
                    id: 27,
                    user_category_id: 'eSvXnkCHQF80UG0',
                    parent_user_category_id: 'b1kelHpcdoI2chG',
                    user_category_name: 'Section-C',
                    is_the_category_hidden: 0,
                    category_type: 2,
                    children: [],
                  },
                ],
              },
              {
                id: 21,
                user_category_id: 'qMmKcMWCjXBqVnc',
                parent_user_category_id: 'r2sO9ej1LOD7zeo',
                user_category_name: 'Commerce/Comp.Science',
                is_the_category_hidden: 0,
                category_type: 2,
                children: [
                  {
                    id: 28,
                    user_category_id: 'NGCCTSjyR15HQ98',
                    parent_user_category_id: 'qMmKcMWCjXBqVnc',
                    user_category_name: 'Section-A',
                    is_the_category_hidden: 0,
                    category_type: 2,
                    children: [],
                  },
                  {
                    id: 29,
                    user_category_id: 'cbW0CoviYAX1x77',
                    parent_user_category_id: 'qMmKcMWCjXBqVnc',
                    user_category_name: 'Section-B',
                    is_the_category_hidden: 0,
                    category_type: 2,
                    children: [],
                  },
                  {
                    id: 30,
                    user_category_id: 'jXviHWCP8DVpS2V',
                    parent_user_category_id: 'qMmKcMWCjXBqVnc',
                    user_category_name: 'Section-C',
                    is_the_category_hidden: 0,
                    category_type: 2,
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: 12,
            user_category_id: 'tWiZzODvMhoYNwQ',
            parent_user_category_id: 'q58fKyDmbKBmyUu',
            user_category_name: '12th-Std',
            is_the_category_hidden: 0,
            category_type: 2,
            children: [
              {
                id: 31,
                user_category_id: '4QKGyXpuvHLiwZn',
                parent_user_category_id: 'tWiZzODvMhoYNwQ',
                user_category_name: 'Biology/Mathematics',
                is_the_category_hidden: 0,
                category_type: 2,
                children: [
                  {
                    id: 34,
                    user_category_id: 'iqc4TMBG9c5J1io',
                    parent_user_category_id: '4QKGyXpuvHLiwZn',
                    user_category_name: 'Section-A',
                    is_the_category_hidden: 0,
                    category_type: 2,
                    children: [],
                  },
                  {
                    id: 35,

                    user_category_id: 'gAh6dpByXH2QNDt',
                    parent_user_category_id: '4QKGyXpuvHLiwZn',
                    user_category_name: 'Section-B',
                    is_the_category_hidden: 0,
                    category_type: 2,
                    children: [],
                  },
                  {
                    id: 36,
                    user_category_id: 'qL8hEtIvMJnCtMY',
                    parent_user_category_id: '4QKGyXpuvHLiwZn',
                    user_category_name: 'Section-C',
                    is_the_category_hidden: 0,
                    category_type: 2,
                    children: [],
                  },
                ],
              },
              {
                id: 32,
                user_category_id: 'SWT0lMfgoLBkRpb',
                parent_user_category_id: 'tWiZzODvMhoYNwQ',
                user_category_name: 'Comp.Science/Mathematics',
                is_the_category_hidden: 0,
                category_type: 2,
                children: [
                  {
                    id: 37,
                    user_category_id: 'Jx5paV5GwVEIML7',
                    parent_user_category_id: 'SWT0lMfgoLBkRpb',
                    user_category_name: 'Section-A',
                    is_the_category_hidden: 0,
                    category_type: 2,
                    children: [],
                  },
                  {
                    id: 39,
                    user_category_id: '1Up36BnlCLjXuVZ',
                    parent_user_category_id: 'SWT0lMfgoLBkRpb',
                    user_category_name: 'Section-B',
                    is_the_category_hidden: 0,
                    category_type: 2,
                    children: [],
                  },
                  {
                    id: 40,
                    user_category_id: 'NCina9PHSM6mQ2G',
                    parent_user_category_id: 'SWT0lMfgoLBkRpb',
                    user_category_name: 'Section-C',
                    is_the_category_hidden: 0,
                    category_type: 2,
                    children: [],
                  },
                ],
              },
              {
                id: 33,
                user_category_id: 'Ey7AGtdgrJXFatd',
                parent_user_category_id: 'tWiZzODvMhoYNwQ',
                user_category_name: 'Commerce/Comp.Science',
                is_the_category_hidden: 0,
                category_type: 2,
                children: [
                  {
                    id: 38,
                    user_category_id: 'oezDJD7ydQT21K2',
                    parent_user_category_id: 'Ey7AGtdgrJXFatd',
                    user_category_name: 'Section-A',
                    is_the_category_hidden: 0,
                    category_type: 2,
                    children: [],
                  },
                  {
                    id: 41,
                    user_category_id: 'AVXmVI683CNdyaR',
                    parent_user_category_id: 'Ey7AGtdgrJXFatd',
                    user_category_name: 'Section-B',
                    is_the_category_hidden: 0,
                    category_type: 2,

                    children: [],
                  },
                  {
                    id: 42,
                    user_category_id: 'ratCFsHLZ9gfulu',
                    parent_user_category_id: 'Ey7AGtdgrJXFatd',
                    user_category_name: 'Section-C',
                    is_the_category_hidden: 0,
                    category_type: 2,
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    this.nestedDataSource.data = TREE_DATA;
    this.nestedTreeControl.dataNodes = TREE_DATA;
  }
  // Tree Structure
  private _getChildren = (node: TreeData) => of(node.children);

  hasNestedChild = (_: string, nodeData: TreeData) =>
    nodeData.children.length > 0;

  refreshTreeData() {
    const data = this.nestedDataSource.data;
    this.nestedDataSource.data ;
    this.nestedDataSource.data = data;
  }

  getLevel = (node: TreeData) => node.level;

  isExpandable = (node: TreeData) => node.expandable;

  descendantsAllSelected(node: TreeData): boolean {
    const descendants = this.nestedTreeControl.getDescendants(node);
    const descAllSelected = descendants.every((child) =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /* Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TreeData): boolean {
    const descendants = this.nestedTreeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /* Toggle the to-do item selection. Select/deselect all the descendants node */
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

  /* Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TreeData): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
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

  /* Check root node checked state and change it accordingly */
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
      const currentNode = this.nestedTreeControl.dataNodes[i];

      // if (this.getLevel(currentNode) < currentLevel) {
      //   return currentNode;
      // }
    }
    return null;
  }
  // Tree End


  // common methods
  expandAll() {
    this.nestedTreeControl.expandAll();
  }
  collapseAll() {
    this.nestedTreeControl.collapseAll();
  }
}
