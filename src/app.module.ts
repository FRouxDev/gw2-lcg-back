import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameUuidController } from './game-uuid/game-uuid.controller';
import { SetsController } from './sets/sets.controller';
import { CardsController } from './cards/cards.controller';
import { SetsService } from './sets/sets.service';
import { GameUUidService } from './game-uuid/game-uuid.service';
import { CardsService } from './cards/cards.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, GameUuidController, SetsController, CardsController],
  providers: [AppService, SetsService, CardsService, GameUUidService],
})
export class AppModule {}
