import { dateTimeQuery, orderByBuilder } from '@modules/common/utils/query';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { format } from 'date-fns';
import { firstValueFrom, Observable } from 'rxjs';
import { EntityManager, Repository } from 'typeorm';
import { CreatePriceDto } from './dto/create-price.dto';
import { GetPriceQuery, GetPriceResponse } from './dto/get-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Price } from './price.entity';

const alias = 'price';

@Injectable()
export class PriceService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
  ) {}

  getRepository(manager?: EntityManager): Repository<Price> {
    return manager ? manager.getRepository(Price) : this.priceRepository;
  }

  async create(createPriceDto: CreatePriceDto) {
    const repo = this.getRepository();

    return repo.save(createPriceDto.price);
  }

  async findAll(query: GetPriceQuery, manager: EntityManager) {
    const repo = this.getRepository(manager);
    const [queryArr, params] = this.getSearchQueryBuilder(query, repo);

    let orderBys: Record<string, 'ASC' | 'DESC'>[] = [{ [`${alias}.date`]: 'DESC' }];

    if (query.orderBy) {
      orderBys = orderByBuilder(query.orderBy, alias);
    }

    let searchQuery = manager.createQueryBuilder(Price, alias).where(queryArr.join(' AND '), params);

    // Order
    orderBys.forEach((orderBy) => {
      Object.entries(orderBy).forEach(([k, v]) => {
        searchQuery = searchQuery.addOrderBy(k, v);
      });
    });

    const result = await searchQuery.getManyAndCount();

    return result;
  }

  async findLastDate(): Promise<Date | undefined> {
    const repo = this.getRepository();

    const result = await repo.createQueryBuilder().select('MAX(date)', 'lastDate').getRawOne();

    return result.lastDate;
  }

  findOne(id: number) {
    return `This action returns a #${id} price`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updatePriceDto: UpdatePriceDto) {
    return `This action updates a #${id} price`;
  }

  remove(id: number) {
    return `This action removes a #${id} price`;
  }

  async getPrice(identify: string, date: Date): Promise<AxiosResponse<GetPriceResponse>> {
    const response: Observable<AxiosResponse<GetPriceResponse>> = this.httpService.get(
      `https://api.coingecko.com/api/v3/coins/${identify}/history?date=${format(date, 'dd-MM-yyyy')}&localization=false`,
    );

    return firstValueFrom(response);
  }

  private getSearchQueryBuilder(query: GetPriceQuery, repo: Repository<any>): [string[], any] {
    const whereClause = [];
    const params: any = {};

    if (query.coinId) {
      whereClause.push(`${alias}.coin_id = :coinId`);
      params.coinId = query.coinId;
    }

    if (query.toDate) {
      const { dateQuery, dateParam } = dateTimeQuery(repo, new Date(query.toDate), `${alias}.date`, ':toDate', '<=');

      whereClause.push(dateQuery);
      params.toDate = dateParam;
    }

    if (query.fromDate) {
      const { dateQuery, dateParam } = dateTimeQuery(repo, new Date(query.fromDate), `${alias}.date`, ':fromDate', '>=');

      whereClause.push(dateQuery);
      params.fromDate = dateParam;
    }

    return [whereClause, params];
  }
}
