import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CardDto } from './cards.dto';
import { randomUUID } from 'crypto';
import { CardsService } from './cards.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { CardSetDto } from 'src/sets/sets.dto';
import { SetsService } from 'src/sets/sets.service';
import { XMLCardDto } from './xmlCards.dto';
import { CardSet } from 'src/sets/entities/sets.entities';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService, private setsService: SetsService) {}

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

  @Get('/player')
  async getAllPlayerCards() {
    const cards = await this.cardsService.getAllPlayerCards();
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

  @Post('import')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  async importFile(@UploadedFile() file: Express.Multer.File): Promise<void> {
    const importContent = JSON.parse(file.buffer.toString());

    const { set } = importContent;
    const newSet: CardSetDto = {
      uuid: set._id,
      name: set._name,
      type: set._setType,
    };

    await this.setsService.createSet(newSet);
    const cards: XMLCardDto[] = set.cards.card;
    for (const xmlCard of cards) {
      const card = this.cardsService.cardBuilder(xmlCard, newSet as CardSet);
      await this.cardsService.createCard(card);
    }
  }
}
