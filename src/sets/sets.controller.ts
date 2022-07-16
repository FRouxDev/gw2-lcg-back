import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
import { CardSetDto } from './sets.dto';
import { SetsService } from './sets.service';
import { randomUUID } from 'crypto';

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
    const uuid = randomUUID();
    console.log(uuid);
    const newSet = await this.setsService.createSet({ name, type, uuid });
    return newSet;
  }

  @Delete(':uuid')
  deleteSet(@Param() params) {
    this.setsService.deleteSet(params.uuid);
  }
}
