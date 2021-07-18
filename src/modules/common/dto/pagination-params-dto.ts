import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PaginationParamsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  readonly page?: number = 1;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly perPage?: number = 25;

  @ApiProperty({ required: false, description: 'Ex: createdAt|DESC' })
  @IsOptional()
  readonly orderBy?: string;

  constructor(partial: Partial<PaginationParamsDto>) {
    Object.assign(this, partial);
  }
}
