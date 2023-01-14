import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardSet } from './entities/sets.entities';
import { CardSetDto, PublicCardSetDto } from './sets.dto';
import * as fs from 'fs/promises';
import { CardSetI18n } from './entities/sets.i18n.entities';
import { Languages, SetsI18nFields } from 'src/config/i18n/lang';
@Injectable()
export class SetsService {
  constructor(
    @InjectRepository(CardSet)
    private setsRepository: Repository<CardSet>,
    @InjectRepository(CardSetI18n)
    private setsI18nRepository: Repository<CardSetI18n>,
  ) {}

  async createSet({ name, type, uuid }: CardSetDto): Promise<CardSet> {
    const newSet: CardSet = await this.setsRepository.save({ type, uuid });
    await this.setsI18nRepository.save({
      set: newSet,
      field: SetsI18nFields.NAME,
      lang: Languages.FR,
      value: name,
    });
    await fs.mkdir(`./uploads/img/${uuid}`);
    return newSet;
  }

  async deleteSet(uuid: string): Promise<void> {
    await this.setsRepository.delete(uuid);
  }

  async getSet(uuid: string): Promise<PublicCardSetDto> {
    const cardSet: CardSet = await this.setsRepository.findOne({ where: { uuid }, relations: ['cards'] });
    const dataCardSet = await this.buildSetI18n(cardSet);
    return dataCardSet;
  }

  async getAllSets(): Promise<Array<PublicCardSetDto>> {
    const cardSets: Array<CardSet> = await this.setsRepository.find({ relations: ['cards'] });
    const dataCardSets = await Promise.all(cardSets.map(async (cardSet) => this.buildSetI18n(cardSet)));
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

    return { ...cardSet, ...dataCardSet } as PublicCardSetDto;
  }
}
