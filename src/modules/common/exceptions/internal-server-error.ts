import { InternalServerErrorException } from '@nestjs/common';

export class SaveDataException extends InternalServerErrorException {
  constructor() {
    super('Failed to save data for some reasons.', 'save_data_failed');
  }
}

export class QueryFailedException extends InternalServerErrorException {
  constructor() {
    super('Executed query was failed.', 'query_failed');
  }
}

export class CannotUnlinkSocialProviderException extends InternalServerErrorException {
  constructor(errorMsg: string = 'Unable to disconnect social account.') {
    super(errorMsg, 'cannot_unlink_provider');
  }
}
