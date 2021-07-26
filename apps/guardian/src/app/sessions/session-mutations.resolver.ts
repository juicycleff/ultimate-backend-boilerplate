import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateSessionRequest } from './commands';
import { SessionResponse } from './queries';
import { SessionMutations } from './session.types';
import { SessionsService } from './sessions.service';
import { GqlContext } from '@ub-boilerplate/common';

@Resolver(() => SessionMutations)
export class SessionMutationsResolver {
  constructor(private readonly sessionsService: SessionsService) {}

  @ResolveField(() => SessionResponse)
  async create(
    @Args('input') input: CreateSessionRequest,
    @Context() ctx: GqlContext,
  ): Promise<SessionResponse> {
    return await this.sessionsService.create(input, ctx.req.identity, ctx.reply);
  }

  @ResolveField(() => Boolean)
  async delete(@Context() ctx: GqlContext): Promise<boolean> {
    return await this.sessionsService.delete(ctx.req.identity, ctx.reply);
  }

  @ResolveField(() => Boolean)
  refresh(): boolean {
    return null;
  }
}
