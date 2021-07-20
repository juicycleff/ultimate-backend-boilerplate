import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IGuardianSchema {
  @Field({ nullable: true })
  dataType?: 'String' | 'Number';

  @Field({ nullable: true })
  developmentOnly?: boolean;

  @Field({ nullable: true, defaultValue: true })
  mutable?: boolean;

  @Field()
  name: string;

  @Field({ nullable: true, defaultValue: false })
  required?: boolean;
}
