import { Test, TestingModule } from '@nestjs/testing';
import { GameUuidController } from './game-uuid.controller';

describe('GameUuidController', () => {
  let controller: GameUuidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameUuidController],
    }).compile();

    controller = module.get<GameUuidController>(GameUuidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
