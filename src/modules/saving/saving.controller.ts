import { Price } from '@modules/price/price.entity';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Connection } from 'typeorm';
import { CalculateSavingDto } from './dto/calculate-saving.dto';
import { SavingService } from './saving.service';

@Controller('saving')
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
  async findAll(@Body() dto: CalculateSavingDto): Promise<Price[]> {
    return this.connection.transaction(async (manager) => {
      const prices = await this.savingService.calculateSaving(dto, manager);

      return prices;
    });
  }
}
