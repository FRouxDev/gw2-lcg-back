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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '.env'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: DEFAULT_PASSWORD,
      database: 'gw2_lcg',
      entities: [OctgnConfig],
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
