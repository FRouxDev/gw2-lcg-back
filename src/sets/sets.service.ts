import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardSet } from './entities/sets.entities';
import { CardSetDto, PublicCardSetDto } from './sets.dto';
import * as fs from 'fs/promises';
import { CardSetI18n } from './entities/sets.i18n.entities';
import { Languages, SetsI18nFields } from 'src/config/i18n/lang';
import { CardsService } from 'src/cards/cards.service';
import { Inject } from '@nestjs/common/decorators';
import { forwardRef } from '@nestjs/common/utils';
@Injectable()
export class SetsService {
  constructor(
    @InjectRepository(CardSet)
    private setsRepository: Repository<CardSet>,
    @InjectRepository(CardSetI18n)
    private setsI18nRepository: Repository<CardSetI18n>,
    @Inject(forwardRef(() => CardsService))
    private cardsService: CardsService,
  ) {}

  async createSet({ name, type, uuid }: CardSetDto, lang: Languages): Promise<CardSet> {
    const newSet: CardSet = await this.setsRepository.save({ type, uuid });
    await this.setsI18nRepository.save({
      set: newSet,
      field: SetsI18nFields.NAME,
      lang,
      value: name,
    });
    await fs.mkdir(`./uploads/img/${uuid}`);
    return newSet;
  }

  async updateSet(uuid: string, setName: string): Promise<void> {
    const cardSet: CardSet = await this.setsRepository.findOneBy({ uuid });
    const i18nValue = await this.setsI18nRepository.findOneBy({ set: cardSet, field: 'name' });
    i18nValue.value = setName;
    await this.setsI18nRepository.save(i18nValue);
  }

  async deleteSet(uuid: string): Promise<void> {
    await this.setsRepository.delete(uuid);
    await fs.rm(`./uploads/img/${uuid}`, { recursive: true });
  }

  async getSet(uuid: string): Promise<PublicCardSetDto> {
    const cardSet: CardSet = await this.setsRepository.findOne({ where: { uuid }, relations: ['cards'] });
    const dataCardSet = await this.buildSetI18n(cardSet);
    return dataCardSet;
  }

  async getAllSets(): Promise<Array<PublicCardSetDto>> {
    const cardSets: Array<CardSet> = await this.setsRepository.find({ relations: ['cards'] });
    const dataCardSets = await Promise.all(cardSets.map(async (cardSet) => await this.buildSetI18n(cardSet)));
    return dataCardSets;
  }

  async buildSetI18n(cardSet: CardSet): Promise<PublicCardSetDto> {
    const dataCardSet: Partial<CardSetDto> = {};

    for (const fieldKey in SetsI18nFields) {
      const field = SetsI18nFields[fieldKey];
      const i18nValue = await this.setsI18nRepository.findOneBy({ set: cardSet, field });
      if (i18nValue) {
        dataCardSet[i18nValue.field] = i18nValue.value;
      }
    }

    const publicCardSet = { ...cardSet, ...dataCardSet } as PublicCardSetDto;
    if (cardSet.cards) {
      publicCardSet.cards = await Promise.all(
        cardSet.cards.map(async (card) => await this.cardsService.buildCardI18n(card)),
      );
    }

    return publicCardSet;
  }
}
