/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'IsTHPhoneNumber', async: false })
export class IsTHPhoneNumber implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return this.isPhoneNumber(text); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Phone number is incorrect!';
  }

  isPhoneNumber(phone: string): boolean {
    const reg = /^0([9|6|8]{1})([0-9]{8})$/im;

    if (phone.match(reg)) {
      return true;
    }

    return false;
  }
}
