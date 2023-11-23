import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Alert1Component } from './alert1.component';

describe('Alert1Component', () => {
  let component: Alert1Component;
  let fixture: ComponentFixture<Alert1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Alert1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Alert1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
