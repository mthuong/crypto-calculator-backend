import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CheckResult {
  @Expose()
  @ApiProperty()
  check: boolean;

  @Expose()
  @ApiProperty()
  message: string;
}
