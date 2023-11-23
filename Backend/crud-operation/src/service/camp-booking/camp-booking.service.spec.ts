import { Test, TestingModule } from '@nestjs/testing';
import { CampBookingService } from './camp-booking.service';

describe('CampBookingService', () => {
  let service: CampBookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampBookingService],
    }).compile();

    service = module.get<CampBookingService>(CampBookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
