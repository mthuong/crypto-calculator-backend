import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Coin } from './coin.entity';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';

@Injectable()
export class CoinService {
  constructor(
    @InjectRepository(Coin)
    private readonly coinRepository: Repository<Coin>,
  ) {}

  getCoinRepository(manager?: EntityManager): Repository<Coin> {
    return manager ? manager.getRepository(Coin) : this.coinRepository;
  }

  create(createCoinDto: CreateCoinDto) {
    createCoinDto;

    return 'This action adds a new coin';
  }

  async findAll() {
    const repo = this.getCoinRepository();

    return repo.createQueryBuilder().getManyAndCount();
  }

  findOne(id: number) {
    return `This action returns a #${id} coin`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateCoinDto: UpdateCoinDto) {
    return `This action updates a #${id} coin`;
  }

  remove(id: number) {
    return `This action removes a #${id} coin`;
  }
}
