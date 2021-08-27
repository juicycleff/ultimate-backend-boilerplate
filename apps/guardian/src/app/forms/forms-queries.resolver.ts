import { ResolveField, Resolver } from '@nestjs/graphql';
import { JSONObjectResolver } from 'graphql-scalars';
import { FormsService } from './forms.service';
import { FormQueries } from './forms.types';

@Resolver(() => FormQueries)
export class FormsQueriesResolver {
  constructor(private readonly formService: FormsService) {}

  @ResolveField(() => [JSONObjectResolver])
  async login(): Promise<any> {
    return await this.formService.loginSchema();
  }

  @ResolveField(() => [JSONObjectResolver])
  async registration(): Promise<any> {
    return await this.formService.registrationSchema();
  }
}
