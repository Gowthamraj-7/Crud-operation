import { TestBed } from '@angular/core/testing';

import { EncryptionServiceService } from './encryption-service.service.service';

describe('EncryptionServiceServiceService', () => {
  let service: EncryptionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
