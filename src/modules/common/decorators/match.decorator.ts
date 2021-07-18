import {
  ValidationOptions,
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { safeKey } from '../utils';

export function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[safeKey(relatedPropertyName)];

    return value === relatedValue;
  }

  public defaultMessage(args: ValidationArguments): string {
    const [relatedPropertyName] = args.constraints;
    const propertyName = args.property;

    return `${propertyName} and ${relatedPropertyName} do not match`;
  }
}
