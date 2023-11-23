import { Test, TestingModule } from '@nestjs/testing';
import { TourApiService } from './tour-api.service';

describe('TourApiService', () => {
  let service: TourApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TourApiService],
    }).compile();

    service = module.get<TourApiService>(TourApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
