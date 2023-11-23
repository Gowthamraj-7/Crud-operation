import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampBookingComponent } from './camp-booking.component';

describe('CampBookingComponent', () => {
  let component: CampBookingComponent;
  let fixture: ComponentFixture<CampBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
