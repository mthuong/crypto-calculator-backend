import { safeKey } from '@modules/common/utils';
import { Price } from '@modules/price/price.entity';
import { Body, ClassSerializerInterceptor, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Connection } from 'typeorm';
import { CalculateSavingDto } from './dto/calculate-saving.dto';
import { Saving } from './dto/saving.dto';
import { SavingService } from './saving.service';

@Controller('saving')
@UseInterceptors(ClassSerializerInterceptor)
export class SavingController {
  constructor(private readonly connection: Connection, private readonly savingService: SavingService) {}

  @Post()
  @HttpCode(200)
  @ApiBody({ type: CalculateSavingDto })
  @ApiOperation({ description: 'Calculate crypto savings' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Price,
  })
  async findAll(@Body() dto: CalculateSavingDto): Promise<Saving[]> {
    return this.connection.transaction(async (manager) => {
      const prices = await this.savingService.calculateSaving(dto, manager);

      const savings: Saving[] = [];
      let totalCoins = 0,
        totalSpent = 0;

      for (let index = prices.length - 1; index >= 0; index--) {
        const price = prices[safeKey(index)];

        const saving = new Saving(price);

        // Calculate saving
        const coinsBought = dto.amount / price.usd;

        totalCoins += coinsBought;

        totalSpent += dto.amount;

        const totalValue = totalCoins * price.usd;

        saving.spentSoFar = totalSpent;
        saving.amountOfCoinIOwn = totalCoins;
        saving.valueOfMySaving = totalValue;

        // Insert saving into savings at the specified index 0 (deleting 0 items first, that is, it's just an insert).
        savings.splice(0, 0, saving);
      }

      return savings;
    });
  }
}
