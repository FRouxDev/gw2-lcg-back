import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';
import { OctgnConfig } from './octgn-config/game-uuid/entities/octgn.entity';
import { OctgnConfigModule } from './octgn-config/octgn-config.module';
import DEFAULT_PASSWORD from './data';
import { CardsModule } from './cards/cards.module';
import { SetsModule } from './sets/sets.module';
import { CardSet } from './sets/entities/sets.entities';
import { Ally, Attachment, Card, Enemy, Hero, Location, Quest, Treachery } from './cards/entities/cards.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '.env'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: DEFAULT_PASSWORD,
      database: 'gw2lcg',
      entities: [OctgnConfig, CardSet, Card, Hero, Ally, Event, Attachment, Enemy, Treachery, Location, Quest],
      synchronize: true,
    }),
    OctgnConfigModule,
    CardsModule,
    SetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
