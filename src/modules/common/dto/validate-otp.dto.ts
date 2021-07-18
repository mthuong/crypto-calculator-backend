import { MaxLength } from 'class-validator';

export class ValidateOtpDto {
  @MaxLength(10)
  readonly code: string;

  @MaxLength(50)
  readonly token: string;
}
