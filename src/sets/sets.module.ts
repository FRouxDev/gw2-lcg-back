import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from 'src/cards/cards.module';
import { CardSet } from './entities/sets.entities';
import { CardSetI18n } from './entities/sets.i18n.entities';
import { SetsController } from './sets.controller';
import { SetsService } from './sets.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardSet, CardSetI18n]), forwardRef(() => CardsModule)],
  controllers: [SetsController],
  providers: [SetsService],
  exports: [SetsService],
})
export class SetsModule {}
