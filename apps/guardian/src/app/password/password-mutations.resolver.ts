import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { PasswordService } from './password.service';
import { PasswordMutations } from './password.types';
import { PasswordScoreEnum, PasswordScoreRequest } from './dtos';

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
