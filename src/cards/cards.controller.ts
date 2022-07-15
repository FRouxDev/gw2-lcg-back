import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AllyDto, CardDto, HeroDto } from './cards.dto';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get()
  async getAllCards() {
    const cards = await this.cardsService.getAllCards();
    return { cards };
  }

  @Get('/types/:type')
  async getAllCardsFromType(@Param() params) {
    const cards = await this.cardsService.getAllCardsFromType(params.type);
    return { cards };
  }

  @Post()
  async createCard(@Body() card: CardDto) {
    const newCard = await this.cardsService.createCard(card);
    return newCard;
  }

  @Delete(':id')
  deleteCard(@Param() params) {
    this.cardsService.deleteCard(params.id);
  }
}
