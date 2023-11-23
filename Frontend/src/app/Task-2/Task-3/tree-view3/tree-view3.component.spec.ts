import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeView3Component } from './tree-view3.component';

describe('TreeView3Component', () => {
  let component: TreeView3Component;
  let fixture: ComponentFixture<TreeView3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeView3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeView3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
