import { Controller, Get } from '@nestjs/common';

@Controller('sets')
export class SetsController {
  @Get()
  getSets() {
    return { msg: 'Ok' };
  }
}
