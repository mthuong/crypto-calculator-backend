import { Price } from '@modules/price/price.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class Saving {
  @ApiProperty()
  @IsNumber()
  spentSoFar: number;

  @ApiProperty()
  @IsNumber()
  amountOfCoinIOwn: number;

  @ApiProperty()
  @IsNumber()
  valueOfMySaving: number;

  @ApiProperty()
  @Expose()
  @IsDate()
  date: Date;

  constructor(partial: Partial<Price>) {
    this.date = partial.date;
  }
}
