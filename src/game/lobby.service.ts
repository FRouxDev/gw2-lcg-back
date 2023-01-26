import { Injectable } from '@nestjs/common';
import { LobbyMessage, LobbyRecord } from 'src/types/game/lobby.type';
import { Player } from 'src/types/game/player.type';

@Injectable()
export class LobbyService {
  entries: LobbyRecord[];
  messages: LobbyMessage[];
  scenario: string;

  constructor() {
    this.entries = [];
    this.messages = [];
  }

  addPlayerIfNotExists(player: Player) {
    if (!this.entries.length || !this.findPlayerByUuid(player.uuid)) {
      this.entries.push({ player });
    }
  }

  findPlayerByUuid(playerId: string) {
    return this.entries.find((entry) => entry.player.uuid === playerId).player;
  }

  setPlayerDeck(playerId: string, deckName: string) {
    const playerEntry = this.entries.find((entry) => entry.player.uuid === playerId);
    playerEntry.deckName = deckName;
  }

  getLobbyEntries() {
    return this.entries;
  }

  getLobbyMessages() {
    return this.messages;
  }

  getScenario() {
    return this.scenario;
  }

  postMessage(message: LobbyMessage) {
    this.messages.push(message);
  }

  setScenario(scenario: string) {
    this.scenario = scenario;
  }
}
