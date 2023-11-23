import { Test, TestingModule } from '@nestjs/testing';
import { TourSelectService } from './tour_select.service';

describe('TourSelectService', () => {
  let service: TourSelectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TourSelectService],
    }).compile();

    service = module.get<TourSelectService>(TourSelectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
