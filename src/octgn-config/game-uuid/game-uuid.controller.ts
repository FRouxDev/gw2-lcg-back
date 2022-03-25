import { Controller, Get, Post, Put, Delete, Body, HttpStatus, HttpException } from '@nestjs/common';
import { GameUUidDto } from './game-uuid.dto';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import { GameUUidService } from './game-uuid.service';
import { GameUUidInterface } from './game-uuid.interface';

@Controller('game-uuid')
export class GameUuidController {
  constructor(private gameUuidService: GameUUidService) {}

  @Get()
  async gameUuidExists() {
    const doesUuidExists = await this.gameUuidService.gameUuidExists();
    return { exists: doesUuidExists };
  }

  @Post()
  async createGameUUid(@Body() { uuid }: GameUUidDto) {
    if (isValidUUIDV4(uuid)) {
      const gameUuid = await this.gameUuidService.upsertGameUuid(uuid);
      return gameUuid;
    } else {
      throw new HttpException(`Error: ${uuid} is not a valid uuid.`, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async changeGameUUid(@Body() { uuid }: GameUUidDto) {
    if (isValidUUIDV4(uuid)) {
      const gameUuid = await this.gameUuidService.upsertGameUuid(uuid);
      return gameUuid;
    } else {
      throw new HttpException(`Error: ${uuid} is not a valid uuid.`, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  deleteGameUUId() {
    this.gameUuidService.resetGameUuid();
  }
}
