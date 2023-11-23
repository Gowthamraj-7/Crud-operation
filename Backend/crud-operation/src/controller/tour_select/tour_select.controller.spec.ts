import { Test, TestingModule } from '@nestjs/testing';
import { TourSelectController } from './tour_select.controller';

describe('TourSelectController', () => {
  let controller: TourSelectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TourSelectController],
    }).compile();

    controller = module.get<TourSelectController>(TourSelectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
