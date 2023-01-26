import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetsModule } from 'src/sets/sets.module';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import {
  Ally,
  Attachment,
  Card,
  Enemy,
  Event,
  Hero,
  Location,
  Objective,
  ObjectiveAlly,
  Quest,
  Treachery,
} from './entities/cards.entity';
import { CardI18n } from './entities/cards.i18n.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Card,
      Hero,
      Ally,
      Event,
      Attachment,
      Enemy,
      Treachery,
      Location,
      Quest,
      Objective,
      ObjectiveAlly,
      CardI18n,
    ]),
    SetsModule,
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
