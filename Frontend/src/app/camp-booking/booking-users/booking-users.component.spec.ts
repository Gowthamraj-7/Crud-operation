import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingUsersComponent } from './booking-users.component';

describe('BookingUsersComponent', () => {
  let component: BookingUsersComponent;
  let fixture: ComponentFixture<BookingUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
