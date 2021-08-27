import { Query, Resolver } from '@nestjs/graphql';
import { FormQueries } from './forms.types';

@Resolver()
export class FormsResolver {
  /**
   * @description Root mutation for all password related mutations
   */
  @Query(() => FormQueries, {
    nullable: true,
    description: 'Root Query for all forms related queries',
    name: 'forms',
  })
  formQueries(): FormQueries {
    return {};
  }
}
