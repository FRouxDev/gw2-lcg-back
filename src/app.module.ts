import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { OctgnConfig } from './octgn-config/game-uuid/entities/octgn.entity';
import { OctgnConfigModule } from './octgn-config/octgn-config.module';
import DEFAULT_PASSWORD from './data';
import { CardsModule } from './cards/cards.module';
import { SetsModule } from './sets/sets.module';
import { CardSet } from './sets/entities/sets.entities';
import {
  Ally,
  Attachment,
  Card,
  Event,
  Enemy,
  Hero,
  Location,
  Quest,
  Treachery,
  ObjectiveAlly,
  Objective,
} from './cards/entities/cards.entity';
import { join } from 'path';
import { GameModule } from './game/game.module';
import { CardSetI18n } from './sets/entities/sets.i18n.entities';
import { CardI18n } from './cards/entities/cards.i18n.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads/img'),
      serveRoot: '/uploads/img',
    }),
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
      entities: [
        OctgnConfig,
        CardSet,
        CardI18n,
        CardSetI18n,
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
      ],
      synchronize: true,
    }),
    OctgnConfigModule,
    CardsModule,
    SetsModule,
    GameModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
