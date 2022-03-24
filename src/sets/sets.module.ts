import { Module } from '@nestjs/common';
import { SetsController } from './sets.controller';
import { SetsService } from './sets.service';

@Module({
  controllers: [SetsController],
  providers: [SetsService],
})
export class SetsModule {}
