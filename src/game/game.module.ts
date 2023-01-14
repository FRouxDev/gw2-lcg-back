import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { LobbyService } from './lobby.service';

@Module({
  providers: [GameGateway, LobbyService],
})
export class GameModule {}
