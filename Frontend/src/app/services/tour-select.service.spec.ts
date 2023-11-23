import { TestBed } from '@angular/core/testing';

import { TourSelectService } from './tour-select.service';

describe('TourSelectService', () => {
  let service: TourSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
