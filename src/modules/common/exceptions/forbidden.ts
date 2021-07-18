import { ForbiddenException } from '@nestjs/common';

export class ForbiddenResourceException extends ForbiddenException {
  constructor(message: string = 'forbidden resource', description: string = 'forbidden') {
    super(message, description);
  }
}
