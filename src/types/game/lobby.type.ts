import { Player } from './player.type';

export interface PickDeckDto {
  playerId: string;
  deckName: string;
}

export interface LobbyRecord {
  player: Player;
  deckName?: string;
}

export interface LobbyMessage {
  author: Player;
  message: string;
  datetime: number;
}
