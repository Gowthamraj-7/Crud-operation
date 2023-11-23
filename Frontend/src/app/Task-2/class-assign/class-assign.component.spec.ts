import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAssignComponent } from './class-assign.component';

describe('ClassAssignComponent', () => {
  let component: ClassAssignComponent;
  let fixture: ComponentFixture<ClassAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassAssignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
