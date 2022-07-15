import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
import { ObjectID } from 'typeorm';
import { CardSetDto } from './sets.dto';
import { SetsService } from './sets.service';

@Controller('sets')
export class SetsController {
  constructor(private setsService: SetsService) {}

  @Get(':id')
  async getSet(@Param() params) {
    const cardSet = await this.setsService.getSet(params.id);
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

  @Delete(':id')
  deleteSet(@Param() params) {
    this.setsService.deleteSet(params.id);
  }
}
