import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { PasswordScoreRequest } from './commands';
import { PasswordService } from './password.service';
import { PasswordMutations } from './password.types';
import { PasswordScoreEnum } from './queries';

@Resolver(() => PasswordMutations)
export class PasswordMutationsResolver {
  constructor(private readonly passwordService: PasswordService) {}

  @ResolveField(() => PasswordScoreEnum)
  score(@Args() args: PasswordScoreRequest): PasswordScoreEnum {
    return this.passwordService.scorePassword(args.password);
  }

  @ResolveField(() => Boolean)
  reset(): boolean {
    return null;
  }
}
