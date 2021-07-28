import { GetPriceQuery } from '@modules/price/dto/get-price.dto';
import { Price } from '@modules/price/price.entity';
import { PriceService } from '@modules/price/price.service';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CalculateSavingDto } from './dto/calculate-saving.dto';

@Injectable()
export class SavingService {
  constructor(private readonly priceService: PriceService) {}

  async calculateSaving(saving: CalculateSavingDto, manager: EntityManager): Promise<Price[]> {
    // Get list of price from requested day to today
    const query: GetPriceQuery = {
      coinId: saving.coinId,
      fromDate: saving.startDate,
      toDate: new Date(),
    };

    const [prices] = await this.priceService.findAll(query, manager);

    return prices;
  }
}
