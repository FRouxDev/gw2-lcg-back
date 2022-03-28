import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OctgnConfigInterface } from '../octgn-config.interface';
import { OctgnConfig } from './entities/octgn.entity';
import { GameUUidInterface } from './game-uuid.interface';

@Injectable()
export class GameUUidService {
  constructor(
    @InjectRepository(OctgnConfig)
    private configRepository: Repository<OctgnConfig>,
  ) {}

  async upsertGameUuid(uuid: string): Promise<GameUUidInterface> {
    const configObj: OctgnConfigInterface = { key: 'uuid', value: uuid };
    const newUuid: OctgnConfig = await this.configRepository.save(configObj);
    return { uuid: newUuid.value };
  }

  async resetGameUuid(): Promise<void> {
    await this.configRepository.delete({
      key: 'uuid',
    });
  }

  async gameUuidExists(): Promise<boolean> {
    const gameUUidConfig = await this.configRepository.findOne({
      where: {
        key: 'uuid',
      },
    });
    return !!gameUUidConfig;
  }
}
