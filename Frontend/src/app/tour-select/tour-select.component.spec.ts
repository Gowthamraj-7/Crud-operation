import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourSelectComponent } from './tour-select.component';

describe('TourSelectComponent', () => {
  let component: TourSelectComponent;
  let fixture: ComponentFixture<TourSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
