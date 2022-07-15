import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Ally, Attachment, Card, Enemy, Hero, Location, Quest, Treachery } from './entities/cards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Hero, Ally, Event, Attachment, Enemy, Treachery, Location, Quest])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
