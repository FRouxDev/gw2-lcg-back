import { Controller, Get } from '@nestjs/common';

@Controller('cards')
export class CardsController {
  @Get()
  getCards() {
    return { msg: 'Ok' };
  }
}
