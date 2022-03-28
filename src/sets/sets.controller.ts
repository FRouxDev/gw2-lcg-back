import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
import { CardSetDto } from './sets.dto';
import { SetsService } from './sets.service';

@Controller('sets')
export class SetsController {
  constructor(private setsService: SetsService) {}

  @Get(':uuid')
  async getSet(@Param() params) {
    const cardSet = await this.setsService.getSet(params.uuid);
    return cardSet;
  }

  @Get()
  async allSets() {
    const sets = await this.setsService.getAllSets();
    return { sets };
  }

  @Post()
  async createSet(@Body() { name, type }: CardSetDto) {
    const newSet = await this.setsService.createSet({ name, type });
    return newSet;
  }

  /* @Put()
  async changeGameUUid(@Body() { uuid }: GameUUidDto) {
    if (isValidUUIDV4(uuid)) {
      const gameUuid = await this.gameUuidService.upsertGameUuid(uuid);
      return gameUuid;
    } else {
      throw new HttpException(`Error: ${uuid} is not a valid uuid.`, HttpStatus.BAD_REQUEST);
    }
  } */

  @Delete(':uuid')
  deleteSet(@Param() params) {
    this.setsService.deleteSet(params.uuid);
  }
}
