import { Module } from '@nestjs/common';
import { GameUuidController } from './game-uuid/game-uuid.controller';
import { GameUUidService } from './game-uuid/game-uuid.service';

@Module({
  controllers: [GameUuidController],
  providers: [GameUUidService],
})
export class OctgnConfigModule {}
