import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Matches,
  Validate,
} from 'class-validator';
import { Match, PhoneNumberValidator } from '@ub-boilerplate/common';

/**
 * @description This is the phone number input request type
 *
 */
@InputType('PhoneNumberInput', {
  description: 'This is the phone number input type',
})
export class PhoneNumberInputRequest {
  /**
   * @description Digit is the local version of a phone number e.g 111 222 3333
   */
  @Field({
    description: 'Digit is the local version of a phone number e.g 111 222 3333',
  })
  @ApiProperty()
  @IsNumberString()
  digit: string;

  /**
   * @description The prefix is the international dialing preference e.g +234 or +1
   */
  @Field({
    description: 'The prefix is the international dialing preference e.g +234 or +1',
  })
  @ApiProperty()
  @Matches(/^[+]\d{1,3}$/g, { message: 'invalid international dialing prefix' })
  prefix: string;
}

/**
 * @description This is the input or data transfer object for creating an account
 *
 */
@InputType('CreateAccountInput', {
  description: 'This is the input or data transfer object for creating an account',
})
export class CreateAccountRequest {
  /**
   * @description Email field is a unique but optional identity of an account
   */
  @Field({
    description: 'Email field is a unique but optional identity of an account',
    nullable: true,
  })
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  /**
   * @description Username field is a unique but optional identity of an account
   */
  @Field({
    description: 'Username field is a unique but optional identity of an account',
    nullable: true,
  })
  @ApiProperty()
  @IsOptional()
  username?: string;

  /**
   * @description This is the password used together with any identity to verify an account by the owner
   */
  @Field({
    description:
      'This is the password used together with any identity to verify an account by the owner',
  })
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  /**
   * @description This is a matching combination of the password field
   */
  @Field({
    description: 'This is a matching combination of the password field',
    nullable: true,
  })
  @ApiProperty()
  @IsNotEmpty()
  @Match('password')
  confirmPassword: string;

  /**
   * @description phone number field is a unique but optional identity of an account
   */
  @Field({
    description: 'Phone number field is a unique but optional identity of an account',
    nullable: true,
  })
  @ApiProperty()
  @IsOptional()
  @Validate(PhoneNumberValidator, {
    message: 'Invalid international dialing prefix or digits',
  })
  phoneNumber?: PhoneNumberInputRequest;
}

/**
 * @description This is the input or data transfer object for updating an account
 *
 */
@InputType('UpdateAccountInput', {
  description: 'This is the input or data transfer object for creating an account',
})
export class UpdateAccountRequest {
  /**
   * @description Email field is a unique but optional identity of an account
   */
  @Field({
    description: 'email field is a unique but optional identity of an account',
    nullable: true,
  })
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  /**
   * @description Username field is a unique but optional identity of an account
   */
  @Field({
    description: 'username field is a unique but optional identity of an account',
    nullable: true,
  })
  @ApiProperty()
  @IsOptional()
  username?: string;

  /**
   * @description phone number field is a unique but optional identity of an account
   */
  @Field({
    description: 'phone number field is a unique but optional identity of an account',
    nullable: true,
  })
  @ApiProperty()
  @IsOptional()
  @Validate(PhoneNumberValidator, {
    message: 'Invalid international dialing prefix or digits',
  })
  phoneNumber?: PhoneNumberInputRequest;
}

/**
 * @description This is the input or data transfer object for checking account availability
 *
 */
@ArgsType()
@InputType('AccountAvailableInput', {
  description:
    'This is the input or data transfer object for checking account availability',
})
export class AccountAvailableRequest {
  /**
   * @description A unique field suc identity of an account
   */
  @Field({
    description: 'email, username or phoneNumber identity of an account',
  })
  @ApiProperty()
  @IsNotEmpty()
  identity: string;
}
