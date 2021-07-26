import { Mutation, Resolver } from '@nestjs/graphql';
import { SessionMutations } from './session.types';

@Resolver()
export class SessionsResolver {
  /**
   * @description Root mutation for all session related mutations
   */
  @Mutation(() => SessionMutations, {
    nullable: true,
    description: 'Root mutation for all session related mutations',
    name: 'session',
  })
  sessionMutation(): SessionMutations {
    return {};
  }
}
