import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristRegisterComponent } from './tourist-register.component';

describe('TouristRegisterComponent', () => {
  let component: TouristRegisterComponent;
  let fixture: ComponentFixture<TouristRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouristRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
