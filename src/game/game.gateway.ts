import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { LobbyMessage, PickDeckDto } from 'src/types/game/lobby.type';
import { Player } from 'src/types/game/player.type';
import { LobbyService } from './lobby.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway {
  @WebSocketServer()
  server: Server;

  constructor(private lobbyService: LobbyService) {}

  @SubscribeMessage('join-lobby')
  handleJoinLobby(@MessageBody() player: Player) {
    console.log(player);
    this.lobbyService.addPlayerIfNotExists(player);
    this.server.emit('refresh-lobby', this.lobbyService.getLobbyEntries());
  }

  @SubscribeMessage('pick-deck')
  handlePickDeck(@MessageBody() data: PickDeckDto) {
    this.lobbyService.setPlayerDeck(data.playerId, data.deckName);
    this.server.emit('refresh-lobby', this.lobbyService.getLobbyEntries());
  }

  @SubscribeMessage('post-message')
  postMessage(@MessageBody() { message, playerId }: { message: string; playerId: string }) {
    const player = this.lobbyService.findPlayerByUuid(playerId);
    const chatMessage: LobbyMessage = {
      message,
      author: player,
      datetime: new Date().getTime(),
    };
    this.lobbyService.postMessage(chatMessage);
    this.server.emit('refresh-chat', this.lobbyService.getLobbyMessages());
  }
}
