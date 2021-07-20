import { ResolveField, Resolver } from '@nestjs/graphql';
import { SessionQueries } from './session.types';
import { SessionsService } from './sessions.service';

@Resolver(() => SessionQueries)
export class SessionQueriesResolver {
  constructor(private readonly sessionsService: SessionsService) {}

  @ResolveField(() => Boolean)
  passwordlessToken(): boolean {
    return null;
  }
}
