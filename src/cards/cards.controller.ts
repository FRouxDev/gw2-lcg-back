import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CardDto } from './cards.dto';
import { randomUUID } from 'crypto';
import { CardsService } from './cards.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
  async createCard(@Body() { data }: { data: CardDto }) {
    data.uuid = randomUUID();
    const newCard = await this.cardsService.createCard(data);
    return newCard;
  }

  @Delete(':uuid')
  deleteCard(@Param() params) {
    this.cardsService.deleteCard(params.uuid);
  }

  @Post('upload/:uuid')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/img',
        filename: (req: any, filename: any, cb: any) => {
          const finalName = `${req.params.uuid}.jpg`;
          cb(null, finalName);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Param() params): void {
    this.cardsService.updateCard(params.uuid, { cardImage: file.filename });
  }
}
