import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetsModule } from 'src/sets/sets.module';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Ally, Attachment, Card, Enemy, Event, Hero, Location, Quest, Treachery } from './entities/cards.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card, Hero, Ally, Event, Attachment, Enemy, Treachery, Location, Quest]),
    SetsModule,
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
