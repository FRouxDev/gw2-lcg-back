import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardSet } from './entities/sets.entities';
import { SetsController } from './sets.controller';
import { SetsService } from './sets.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardSet])],
  controllers: [SetsController],
  providers: [SetsService],
})
export class SetsModule {}
