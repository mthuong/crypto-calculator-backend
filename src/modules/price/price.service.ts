import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { format } from 'date-fns';
import { lastValueFrom, Observable } from 'rxjs';
import { CreatePriceDto } from './dto/create-price.dto';
import { GetPriceResponse } from './dto/get-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PriceService {
  constructor(private httpService: HttpService) {}

  create(createPriceDto: CreatePriceDto) {
    return 'This action adds a new price';
  }

  findAll() {
    return `This action returns all price`;
  }

  findOne(id: number) {
    return `This action returns a #${id} price`;
  }

  update(id: number, updatePriceDto: UpdatePriceDto) {
    return `This action updates a #${id} price`;
  }

  remove(id: number) {
    return `This action removes a #${id} price`;
  }

  async getPrice(
    identify: string,
    date: Date,
  ): Promise<AxiosResponse<GetPriceResponse>> {
    const response: Observable<AxiosResponse<GetPriceResponse>> =
      this.httpService.get(
        `https://api.coingecko.com/api/v3/coins/${identify}/history?date=${format(
          date,
          'dd-MM-yyyy',
        )}&localization=false`,
      );
    const res = lastValueFrom(response);

    return res;
  }
}
