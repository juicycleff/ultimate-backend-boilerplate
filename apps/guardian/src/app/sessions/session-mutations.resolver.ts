import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlContext } from '@ub-boilerplate/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSessionRequest, SessionResponse } from './dtos';
import { SessionMutations } from './session.types';
import { SessionsService } from './sessions.service';
import { CreateSessionCommand, DeleteSessionCommand } from './commands';

@Resolver(() => SessionMutations)
export class SessionMutationsResolver {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly commandBus: CommandBus,
  ) {}

  @ResolveField(() => SessionResponse)
  async create(
    @Args('input') input: CreateSessionRequest,
    @Context() ctx: GqlContext,
  ): Promise<SessionResponse> {
    return this.commandBus.execute(
      new CreateSessionCommand(input, ctx.req.identity, ctx),
    );
  }

  @ResolveField(() => Boolean)
  async delete(@Context() ctx: GqlContext): Promise<boolean> {
    return this.commandBus.execute(new DeleteSessionCommand(ctx.req.identity, ctx));
  }

  @ResolveField(() => Boolean)
  refresh(): boolean {
    return null;
  }
}
