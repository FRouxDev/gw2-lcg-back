import { Controller, Get, Post, Put, Delete, Body, HttpStatus, HttpException } from '@nestjs/common';
import { GameUUidDto } from './game-uuid.dto';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import { GameUUidService } from './game-uuid.service';
import { GameUUidInterface } from './game-uuid.interface';

@Controller('game-uuid')
export class GameUuidController {
  constructor(private gameUuidService: GameUUidService) {}

  @Get()
  gameUuidExists(): { exists: boolean } {
    const doesUuidExists: boolean = this.gameUuidService.gameUuidExists();
    return { exists: doesUuidExists };
  }

  @Post()
  createGameUUid(@Body() { uuid }: GameUUidDto): GameUUidInterface {
    if (isValidUUIDV4(uuid)) {
      const gameUuid = this.gameUuidService.setGameUuid(uuid);
      return gameUuid;
    } else {
      throw new HttpException(`Error: ${uuid} is not a valid uuid.`, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  changeGameUUid(@Body() { uuid }: GameUUidDto): GameUUidInterface {
    if (isValidUUIDV4(uuid)) {
      const gameUuid = this.gameUuidService.changeGameUuid(uuid);
      return gameUuid;
    } else {
      throw new HttpException(`Error: ${uuid} is not a valid uuid.`, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  deleteGameUUId(): void {
    this.gameUuidService.resetGameUuid();
  }
}
