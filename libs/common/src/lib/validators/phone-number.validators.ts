import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class PhoneNumberPrefixValidator implements ValidatorConstraintInterface {
  validate(text: string, validationArguments: ValidationArguments) {
    return text.length > 1 && text.search(/^[+]\d{1,3}$/g) !== -1;
  }
}

@ValidatorConstraint()
export class PhoneNumberValidator implements ValidatorConstraintInterface {
  validate(phoneNumber: any, validationArguments: ValidationArguments) {
    return (
      phoneNumber.digit.search(/^\d*$/g) !== -1 &&
      phoneNumber.prefix.search(/^[+]\d{1,3}$/g) !== -1
    );
  }
}
