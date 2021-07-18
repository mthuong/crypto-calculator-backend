import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super('The user is not found', 'user_not_found');
  }
}

export class DataNotFoundException extends NotFoundException {
  constructor() {
    super('The requested data is not found', 'data_not_found');
  }
}
