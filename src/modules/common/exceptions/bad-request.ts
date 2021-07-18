import { BadRequestException } from '@nestjs/common';

export class InvalidRequestException extends BadRequestException {
  constructor(message: string = 'bad request', description: string = 'bad_request') {
    super(message, description);
  }
}
