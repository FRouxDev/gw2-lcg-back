import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OctgnConfig } from './game-uuid/entities/octgn.entity';
import { GameUuidController } from './game-uuid/game-uuid.controller';
import { GameUUidService } from './game-uuid/game-uuid.service';

@Module({
  imports: [TypeOrmModule.forFeature([OctgnConfig])],
  controllers: [GameUuidController],
  providers: [GameUUidService],
})
export class OctgnConfigModule {}
