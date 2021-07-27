import { countByConditions } from '@modules/common/utils/query';
import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CoinService } from '../coin.service';

/**
 * Custom validation constraint for coin identify
 */
@ValidatorConstraint({ async: true })
@Injectable()
export class DoesCoinExistById implements ValidatorConstraintInterface {
  constructor(readonly coinService: CoinService) {}

  /**
   * Check coin id for coin against existing coin entities
   *
   * @param id - Coin id
   */
  public async validate(id: string): Promise<boolean> {
    const countExists = await countByConditions({ id, deletedAt: null }, this.coinService.getCoinRepository());

    return countExists > 0;
  }

  /**
   * Default error message
   */
  public defaultMessage(validationArguments?: ValidationArguments): string {
    if (validationArguments?.value) {
      return `Coin id ${validationArguments?.value} is not exists.`;
    }

    return 'Coin is not exists.';
  }
}
