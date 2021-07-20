import { ObjectType } from '@nestjs/graphql';
import { AccountIdentity } from '@ub-boilerplate/common';

/**
 * @description account response is a public representation of an account
 */
@ObjectType('account', {
  description: 'Account response is a public representation of an account',
})
export class AccountResponse extends AccountIdentity {}
