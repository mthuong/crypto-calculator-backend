import { DoesCoinExistById } from '@modules/coin/validators';
import { Frequency } from '@modules/common/enums/frequency.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, Validate } from 'class-validator';

export class CalculateSavingDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    enum: Frequency,
    enumName: 'Frequency',
    required: false,
    description: 'Frequency to calculate your saving',
  })
  @IsEnum(Frequency, { each: true, message: 'frequency $value is not allowed.' })
  frequency: Frequency;

  @ApiProperty()
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @Validate(DoesCoinExistById)
  coinId: string;

  constructor(partial: Partial<CalculateSavingDto>) {
    Object.assign(this, partial);
  }
}
