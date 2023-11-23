import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignClass1Component } from './assign-class1.component';

describe('AssignClass1Component', () => {
  let component: AssignClass1Component;
  let fixture: ComponentFixture<AssignClass1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignClass1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignClass1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
