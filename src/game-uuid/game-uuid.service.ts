import { Injectable } from '@nestjs/common';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import { GameUUidInterface } from './game-uuid.interface';

@Injectable()
export class GameUUidService {
  setGameUuid(uuid: string): GameUUidInterface {
    return { uuid };
  }

  resetGameUuid(): void {}

  changeGameUuid(uuid: string) {
    return { uuid };
  }

  gameUuidExists(): boolean {
    return true;
  }
}
