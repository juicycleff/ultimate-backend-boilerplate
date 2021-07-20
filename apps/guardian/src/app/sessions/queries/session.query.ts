import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @description session response is a public representation of an session
 */
@ObjectType('session', {
  description: 'Session response is a public representation of an session',
})
export class SessionResponse {
  /**
   * @description this is the jwt token of the account
   */
  @Field({
    description: 'this is the jwt token of the account',
    nullable: true,
  })
  @ApiProperty()
  idToken?: string;
}
