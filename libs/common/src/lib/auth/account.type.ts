import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Identity } from '@ory/kratos-client';

@ObjectType()
export class AccountIdentityRecoveryAddress {
  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field({
    description: 'ID field is a database generated unique identifier for an account',
  })
  @ApiProperty()
  id: string;

  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field({
    description: 'ID field is a database generated unique identifier for an account',
  })
  @ApiProperty()
  value: string;

  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field({
    description: 'ID field is a database generated unique identifier for an account',
  })
  @ApiProperty()
  via?: string;

  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field({
    description: 'ID field is a database generated unique identifier for an account',
  })
  @ApiProperty()
  createdAt: Date;

  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field({
    description: 'ID field is a database generated unique identifier for an account',
  })
  @ApiProperty()
  updatedAt: Date;
}

@ObjectType()
export class AccountIdentityVerifiableAddress extends AccountIdentityRecoveryAddress {
  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field({
    description: 'ID field is a database generated unique identifier for an account',
  })
  @ApiProperty()
  status: string;

  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field({
    description: 'ID field is a database generated unique identifier for an account',
  })
  @ApiProperty()
  verified: boolean;

  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field({
    description: 'ID field is a database generated unique identifier for an account',
  })
  @ApiProperty()
  verifiedAt: string;

  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field({
    description: 'ID field is a database generated unique identifier for an account',
  })
  @ApiProperty()
  createdAt: Date;

  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field({
    description: 'ID field is a database generated unique identifier for an account',
  })
  @ApiProperty()
  updatedAt: Date;
}

@InputType('IdentityName')
@ObjectType()
export class IdentityNameTraits {
  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field({
    description: 'ID field is a database generated unique identifier for an account',
  })
  @ApiProperty()
  first: string;
}

@ObjectType()
export class AccountIdentityTraits {
  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field({
    description: 'ID field is a database generated unique identifier for an account',
  })
  @ApiProperty()
  email: string;
}

/**
 * @description account response is a public representation of an account
 */
@ObjectType('AccountIdentity', {
  description: 'Account response is a public representation of an account',
})
export class AccountIdentity {
  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field({
    description: 'ID field is a database generated unique identifier for an account',
  })
  @ApiProperty()
  id: string;

  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field({
    description: 'ID field is a database generated unique identifier for an account',
  })
  @ApiProperty()
  state: string;

  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field(() => AccountIdentityTraits, {
    description: 'ID field is a database generated unique identifier for an account',
  })
  @ApiProperty()
  traits: AccountIdentityTraits;

  /**
   * @description Field is a database generated unique identifier for an account
   */
  @Field(() => [AccountIdentityVerifiableAddress], {
    description: 'Field is a database generated unique identifier for an account',
    nullable: true,
  })
  @ApiProperty()
  verifiableAddresses: AccountIdentityVerifiableAddress[];

  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field(() => [AccountIdentityRecoveryAddress], {
    description: 'ID field is a database generated unique identifier for an account',
    nullable: true,
  })
  @ApiProperty()
  recoveryAddresses: AccountIdentityRecoveryAddress[];

  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field({
    description: 'ID field is a database generated unique identifier for an account',
  })
  @ApiProperty()
  createdAt: Date;

  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field({
    description: 'ID field is a database generated unique identifier for an account',
  })
  @ApiProperty()
  updatedAt: Date;

  active: string;

  constructor(identity?: Identity) {
    if (identity) {
      this.id = identity.id;
      this.state = identity.state;
      this.createdAt = new Date(identity.created_at);
      this.updatedAt = new Date(identity.updated_at);
      this.traits = identity.traits;
      // this.recoveryAddresses = identity.id;
      // this.verifiableAddresses = identity.id;
    }
  }
}
