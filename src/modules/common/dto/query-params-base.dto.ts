import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationParamsDto } from './pagination-params-dto';

export class QueryParamsBaseDto extends PartialType(PaginationParamsDto) {
  @ApiProperty({ required: false, description: 'Search key word' })
  @IsOptional()
  @IsString()
  readonly q?: string;
}
