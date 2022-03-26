import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@InputType('CreatePasswordInput')
export class CreatePasswordRequest {
  /**
   * @description Identity field accepts a username, email or phoneNumber of an account
   */
  @Field({
    description: 'Identity field accepts a username, email or phoneNumber of an account',
    nullable: true,
  })
  @ApiProperty()
  identity: string;

  /**
   * @description This is the password used together with any identity to verify an account by the owner
   */
  @Field({
    description:
      'This is the password used together with any identity to verify an account by the owner',
  })
  @ApiProperty()
  password: string;
}

@ArgsType()
export class PasswordScoreRequest {
  /**
   * @description A password string or text
   */
  @Field({
    description: 'a password string or text',
  })
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
