import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { forwardRef } from '@nestjs/common/utils';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AllyI18nFields,
  AttachementI18nFields,
  CardsI18nFields,
  EnemyI18nFields,
  EventI18nFields,
  HeroI18nFields,
  Languages,
  LocationI18nFields,
  ObjectiveAllyI18nFields,
  ObjectiveI18nFields,
  QuestI18nFields,
  TreacheryI18nFields,
} from 'src/config/i18n/lang';
import { CardSet } from 'src/sets/entities/sets.entities';
import { SetsService } from 'src/sets/sets.service';
import { SetType } from 'src/shared/types/setType.type';
import { Repository } from 'typeorm';
import { CardDto } from './cards.dto';
import {
  Card,
  Hero,
  Ally,
  Event,
  Attachment,
  Enemy,
  Location,
  Treachery,
  Quest,
  Objective,
  ObjectiveAlly,
} from './entities/cards.entity';
import { CardI18n } from './entities/cards.i18n.entity';
import { keysToExclude, XMLToCardMapping } from './utils/XMLToCard.helpers';
import { XMLCardDto } from './xmlCards.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    @InjectRepository(Hero)
    private heroesRepository: Repository<Hero>,
    @InjectRepository(Ally)
    private alliesRepository: Repository<Ally>,
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(Attachment)
    private attachmentsRepository: Repository<Attachment>,
    @InjectRepository(Enemy)
    private enemiesRepository: Repository<Enemy>,
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
    @InjectRepository(Treachery)
    private treacheriesRepository: Repository<Treachery>,
    @InjectRepository(Quest)
    private questsRepository: Repository<Quest>,
    @InjectRepository(Objective)
    private objectiveRepository: Repository<Objective>,
    @InjectRepository(ObjectiveAlly)
    private objectiveAllyRepository: Repository<ObjectiveAlly>,
    @InjectRepository(CardI18n)
    private cardsI18nRepository: Repository<CardI18n>,
    @Inject(forwardRef(() => SetsService))
    private setsService: SetsService,
  ) {}

  getRepository(entity: string): Repository<Card> {
    const repositoryMap = {
      Hero: this.heroesRepository,
      Ally: this.alliesRepository,
      Event: this.eventsRepository,
      Attachment: this.attachmentsRepository,
      Enemy: this.enemiesRepository,
      Location: this.locationsRepository,
      Treachery: this.treacheriesRepository,
      Quest: this.questsRepository,
      Objective: this.objectiveRepository,
      ObjectiveAlly: this.objectiveAllyRepository,
    };

    return repositoryMap[entity];
  }

  getTranslationMap(entity: string) {
    const i18nMap = {
      Hero: HeroI18nFields,
      Ally: AllyI18nFields,
      Event: EventI18nFields,
      Attachment: AttachementI18nFields,
      Enemy: EnemyI18nFields,
      Location: LocationI18nFields,
      Treachery: TreacheryI18nFields,
      Quest: QuestI18nFields,
      Objective: ObjectiveI18nFields,
      ObjectiveAllyI18n: ObjectiveAllyI18nFields,
    };

    return i18nMap[entity];
  }

  async createCard(card: CardDto, lang: Languages): Promise<Card> {
    const cardsRepository = this.getRepository(card.type);
    const newCard: Card = await cardsRepository.save(card);
    const i18nMap = this.getTranslationMap(card.type);

    card.cardImage = `./uploads/img/${card.set.uuid}/${newCard.uuid}.jpg`;

    for (const fieldKey in i18nMap) {
      const field = i18nMap[fieldKey];
      if (field === CardsI18nFields.KEYWORDS || field === CardsI18nFields.TRAITS) {
        const valuesArray = card[field];
        if (valuesArray) {
          valuesArray.forEach(async (value) => {
            await this.cardsI18nRepository.save({
              card: newCard,
              field,
              value,
              lang,
            });
          });
        }
      } else {
        const value = card[field] as string;
        if (value) {
          await this.cardsI18nRepository.save({
            card: newCard,
            field,
            value,
            lang,
          });
        }
      }
    }
    return newCard;
  }

  async updateCard(uuid: string, card: Partial<CardDto>): Promise<void> {
    // await this.cardsRepository.update({ uuid }, { cardImage: card.cardImage });
  }

  async deleteCard(uuid: string): Promise<void> {
    await this.cardsRepository.delete(uuid);
  }

  async getAllCards(): Promise<Array<CardDto>> {
    const cards: Array<Card> = await this.cardsRepository.find({ relations: ['set'] });
    const cardsData = await Promise.all(cards.map(async (card) => this.buildCardI18n(card)));
    return cardsData;
  }

  async getAllCardsFromType(type: string): Promise<Array<Card>> {
    const cardsRepository = this.getRepository(type);
    const cards: Array<Card> = await cardsRepository.find({ relations: ['set'] });
    return cards;
  }

  async getAllPlayerCards(): Promise<Array<Card>> {
    const cards: Array<Card> = await this.cardsRepository.find({
      relations: ['set'],
      where: {
        set: {
          type: SetType.PLAYER,
        },
      },
    });
    return cards;
  }

  async buildCardI18n(card: Card): Promise<CardDto> {
    const dataCard: Partial<CardDto> = {};
    const i18nMap = this.getTranslationMap(card.type);

    for (const fieldKey in i18nMap) {
      const field = i18nMap[fieldKey];
      if (field === CardsI18nFields.KEYWORDS || field === CardsI18nFields.TRAITS) {
        const i18nValues = await this.cardsI18nRepository.find({ where: { card, field } });
        if (i18nValues && i18nValues.length) {
          dataCard[field] = i18nValues.map((entry) => entry.value);
        }
      } else {
        const i18nValue = await this.cardsI18nRepository.findOneBy({ card, field });
        if (i18nValue) {
          dataCard[i18nValue.field] = i18nValue.value;
        }
      }
    }

    const publicCard = { ...card, ...dataCard } as CardDto;
    if (card.set) {
      publicCard.set = await this.setsService.buildSetI18n(card.set);
    }
    return publicCard;
  }

  cardBuilder(xmlCard: XMLCardDto, cardSet: CardSet) {
    const type: string = xmlCard.property.find((prop) => prop._name === 'Type')._value;

    const newCard: Partial<CardDto> = {
      uuid: xmlCard._id,
      name: xmlCard._name,
      set: cardSet,
      cardImage: `./uploads/img/${cardSet.uuid}/${xmlCard._id}.jpg`,
      type,
    };

    const usefulProperties = xmlCard.property.filter((prop) => !keysToExclude.includes(prop._name));

    console.log(usefulProperties);
    console.log(cardSet);

    for (const property of usefulProperties) {
      const propKey = XMLToCardMapping[property._name].key;
      const propValue = XMLToCardMapping[property._name].process(property._value);
      newCard[propKey] = propValue;
    }

    return newCard as CardDto;
  }
}
