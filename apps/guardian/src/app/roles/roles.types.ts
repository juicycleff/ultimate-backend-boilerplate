import { ObjectType } from '@nestjs/graphql';

/**
 * @description Plain simple session mutations root object
 */
@ObjectType({ description: 'Plain simple session mutations root object' })
export class RolesMutations {}

/**
 * @description Plain simple session queries root object
 */
@ObjectType({ description: 'Plain simple session queries root object' })
export class RolesQueries {}
