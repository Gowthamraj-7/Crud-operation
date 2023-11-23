import { Test, TestingModule } from '@nestjs/testing';
import { CampBookingController } from './camp-booking.controller';

describe('CampBookingController', () => {
  let controller: CampBookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampBookingController],
    }).compile();

    controller = module.get<CampBookingController>(CampBookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
