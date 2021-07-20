import { Field, ObjectType } from '@nestjs/graphql';

export type HealthStatus = 'PENDING' | 'READY' | 'DOWN_GRADED' | 'FAILING' | 'IDLE';

@ObjectType('HealthStatus')
export class HealthStatusResponse {
  @Field()
  status: string;

  @Field()
  authSystem: string;

  @Field()
  version: string;
}
