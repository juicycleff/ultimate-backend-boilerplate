import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { OsoClass } from '@ultimate-backend/permissions';
import { ApiProperty } from '@nestjs/swagger';
import {
  Identity,
  RecoveryAddress,
  Session,
  VerifiableIdentityAddress,
} from '@ory/kratos-client';
import { BaseEntityType } from '@ub-boilerplate/common/database/models';
import { AxiosResponse } from 'axios';

@ObjectType()
export class AccountIdentityRecoveryAddress extends BaseEntityType {
  constructor(props?: RecoveryAddress) {
    super();

    if (props) {
      this.id = props.id;
      this.createdAt = new Date(props.created_at);
      this.updatedAt = new Date(props.updated_at);
      this.via = props.via;
      this.value = props.value;
    }
  }

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
}

@ObjectType()
export class AccountIdentityVerifiableAddress extends AccountIdentityRecoveryAddress {
  constructor(props?: VerifiableIdentityAddress) {
    super(props);

    if (props) {
      this.status = props.status;
      this.verifiedAt = new Date(props.verified_at);
      this.verified = props.verified;
    }
  }

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
   * @description The date the account was verified
   */
  @Field({
    description: 'The date the account was verified',
  })
  @ApiProperty({ description: 'The date the account was verified' })
  verifiedAt: Date;
}

@InputType('IdentityName')
@ObjectType()
export class IdentityNameTraits {
  /**
   * @description The first name of the user
   */
  @Field({
    description: 'The first name of the user',
  })
  @ApiProperty({ description: 'The first name of the user' })
  first: string;
}

@ObjectType()
export class KratosTraitsName {
  constructor(name?: Record<string, any>) {
    if (name) {
      this.first = name.first;
      this.last = name.last;
    }
  }

  @Field()
  last: string;

  @Field()
  first: string;
}

@ObjectType()
export class AccountIdentityTraits {
  constructor(traits?: Record<string, any>) {
    if (traits) {
      this.displayName = `${traits.name.first} ${traits.name.last}`;
      this.email = traits.email;
      this.name = new KratosTraitsName(traits.name);
    }
  }

  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field({
    description: 'Email is the unique identifier for an account',
  })
  @ApiProperty()
  email: string;

  @Field({
    description: 'Name object of a user',
  })
  @ApiProperty()
  name: KratosTraitsName;

  @Field({
    description: 'User display name',
  })
  @ApiProperty({ description: 'User display name' })
  displayName?: string;
}

/**
 * @description account response is a public representation of an account
 */
@ObjectType('AccountIdentity', {
  description: 'Account response is a public representation of an account',
})
@OsoClass({ name: 'User' })
export class AccountIdentity extends BaseEntityType {
  /**
   * @description State of the user account
   */
  @Field({
    description: 'State of the user account',
  })
  @ApiProperty()
  state: string;

  /**
   * @description ID field is a database generated unique identifier for an account
   */
  @Field(() => AccountIdentityTraits, {
    description: 'The user profile data',
  })
  @ApiProperty()
  profile: AccountIdentityTraits;

  /**
   * @description List of verified account addresses
   */
  @Field(() => [AccountIdentityVerifiableAddress], {
    description: 'List of verified account addresses',
    nullable: true,
  })
  @ApiProperty({ description: 'List of verified account addresses' })
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

  constructor(identity?: Identity) {
    super();

    if (identity) {
      this.id = identity.id;
      this.state = identity.state;
      this.createdAt = new Date(identity.created_at);
      this.updatedAt = new Date(identity.updated_at);
      this.profile = new AccountIdentityTraits(identity.traits);
      this.recoveryAddresses =
        identity.recovery_addresses.map<AccountIdentityRecoveryAddress>(
          (value) => new AccountIdentityRecoveryAddress(value),
        );
      this.verifiableAddresses =
        identity.verifiable_addresses.map<AccountIdentityVerifiableAddress>(
          (value) => new AccountIdentityVerifiableAddress(value),
        );
    }
  }
}

/**
 * @description account response is a public representation of an account
 */
@ObjectType('AccountIdentityToken', {
  description: 'Account authentication ad identity entity',
})
@OsoClass({ name: 'AccountIdentityToken' })
export class AccountIdentityToken {
  /**
   * @description ID field is a database generated unique identifier for an entity
   */
  @Field({
    description: 'ID field is a database generated unique identifier for an entity',
  })
  @ApiProperty({
    description: 'ID field is a database generated unique identifier for an entity',
  })
  id!: string;

  /**
   * @description Checks if the account is active or not active
   */
  @Field({
    description: 'Checks if the account is active or not active',
  })
  @ApiProperty({ description: 'Checks if the account is active or not active' })
  active: boolean;

  /**
   * @description The date the user authentication token expires,
   */
  @Field({
    description: 'The date the user authentication token expires',
  })
  @ApiProperty({ description: 'The date the user authentication token expires' })
  expiresAt: Date;

  /**
   * @description The date the user authentication was issued
   */
  @Field({
    description: 'The date the user authentication was issued',
  })
  @ApiProperty({ description: 'The date the user authentication was issued' })
  issuedAt: Date;

  /**
   * @description The date the user was authenticated
   */
  @Field({
    description: 'The date the user was authenticated',
  })
  @ApiProperty({ description: 'The date the user was authenticated' })
  authenticatedAt: Date;

  /**
   * @description The date the user was authenticated
   */
  @Field({
    description: 'The user identity info',
  })
  @ApiProperty({ description: 'The user identity info' })
  identity: AccountIdentity;

  constructor(session?: Session) {
    if (session) {
      this.id = session.id;
      this.active = session.active;
      this.expiresAt = new Date(session.expires_at);
      this.authenticatedAt = new Date(session.authenticated_at);
      this.issuedAt = new Date(session.issued_at);
      this.identity = new AccountIdentity(session.identity);
    }
  }
}
