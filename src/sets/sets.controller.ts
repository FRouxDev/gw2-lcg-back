import { Controller, Get, Post, Delete, Body, Param, Put } from '@nestjs/common';
import { CardSetDto } from './sets.dto';
import { SetsService } from './sets.service';
import { randomUUID } from 'crypto';
import { Languages } from 'src/config/i18n/lang';

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

  @Put()
  async updateSet(@Body() { data }: { data: { uuid: string; setName: string } }) {
    const { uuid, setName } = data;
    await this.setsService.updateSet(uuid, setName);
    return { update: 'OK' };
  }

  @Post()
  async createSet(@Body() { data }: { data: CardSetDto }) {
    const { name, type } = data;
    const uuid = randomUUID();
    const newSet = await this.setsService.createSet({ name, type, uuid }, Languages.FR);
    return newSet;
  }

  @Post(':lang')
  async createSetWithLang(@Body() { data }: { data: CardSetDto }, @Param() params: { lang: Languages }) {
    const { name, type } = data;
    const uuid = randomUUID();
    const newSet = await this.setsService.createSet({ name, type, uuid }, params.lang);
    return newSet;
  }

  @Delete(':uuid')
  deleteSet(@Param() params) {
    this.setsService.deleteSet(params.uuid);
  }
}
