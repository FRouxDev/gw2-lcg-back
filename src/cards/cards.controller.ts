import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CardDto } from './cards.dto';
import { randomUUID } from 'crypto';
import { CardsService } from './cards.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { CardSetDto } from 'src/sets/sets.dto';
import { SetsService } from 'src/sets/sets.service';
import { XMLCardDto } from './xmlCards.dto';
import { Languages } from 'src/config/i18n/lang';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService, private setsService: SetsService) {}

  @Get()
  async getAllCards() {
    const cards = await this.cardsService.getAllCards();
    return { cards };
  }

  @Get('/simplified')
  async getAllSimplifiedCards() {
    const cards = await this.cardsService.getAllSimplifiedCards(Languages.FR);
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

  @Get(':uuid')
  async getSingleCard(@Param() params) {
    const card = await this.cardsService.getSingleCard(params.uuid);
    return { card };
  }

  @Post()
  async createCard(@Body() { data }: { data: CardDto }) {
    data.uuid = randomUUID();
    const newCard = await this.cardsService.createCard(data, Languages.FR);
    return newCard;
  }

  @Post(':lang')
  async createCardWithLang(@Body() { data }: { data: CardDto }, @Param() params: { lang: Languages }) {
    data.uuid = randomUUID();
    const newCard = await this.cardsService.createCard(data, params.lang);
    return newCard;
  }

  @Put()
  async updateCard(@Body() { data }: { data: CardDto }) {
    const updatedCard = await this.cardsService.updateCard(data, Languages.FR);
    return updatedCard;
  }

  @Delete('reset')
  resetCards() {
    this.cardsService.resetCards();
  }

  @Delete(':uuid')
  deleteCard(@Param() params) {
    this.cardsService.deleteCard(params.uuid);
  }

  @Post('upload/:setUuid/:uuid')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req: any, filename: any, cb: any) => {
          const finalDirName = `./uploads/img/${req.params.setUuid}`;
          cb(null, finalDirName);
        },
        filename: (req: any, filename: any, cb: any) => {
          const finalName = `${req.params.uuid}.jpg`;
          cb(null, finalName);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Param() params): void {
    this.cardsService.createCardRef(params.uuid, params.setUuid, Languages.FR);
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
    const newSetDto: CardSetDto = {
      uuid: set._id,
      name: set._name,
      type: set._setType,
    };

    const newSet = await this.setsService.createSet(newSetDto, Languages.FR);
    const cards: XMLCardDto[] = set.cards.card;
    for (const xmlCard of cards) {
      const card = this.cardsService.cardBuilder(xmlCard, newSet);
      await this.cardsService.createCard(card, Languages.FR);
    }
  }
}
