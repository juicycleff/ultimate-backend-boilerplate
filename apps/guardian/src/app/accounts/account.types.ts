import { ObjectType } from '@nestjs/graphql';

/**
 * @description Plain simple account mutations root object
 */
@ObjectType({ description: 'Plain simple account mutations root object' })
export class AccountMutations {}

/**
 * @description Plain simple account queries root object
 */
@ObjectType({ description: 'Plain simple account queries root object' })
export class AccountQueries {}
