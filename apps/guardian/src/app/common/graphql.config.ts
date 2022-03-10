import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { corsApolloOptions } from '@ub-boilerplate/common';
import { JSONResolver, JSONObjectResolver } from 'graphql-scalars';
import { RedisCache } from 'apollo-server-cache-redis';
import { BootConfig } from '@ultimate-backend/bootstrap';
import { ApolloFederationDriver } from '@nestjs/apollo';

@Injectable()
export class GqlConfigProvider implements GqlOptionsFactory {
  constructor(private readonly boot: BootConfig) {}

  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    const redisOptions = this.boot.get<any>('clients.redis.redisOptions');

    return {
      autoSchemaFile: true,
      fieldResolverEnhancers: ['guards'],
      context: ({ req, res, payload, connection, request, reply }) => {
        return {
          req: request ?? req,
          res: reply ?? res,
          request,
          reply,
          payload,
          connection,
        };
      },
      // autoTransformHttpErrors: true,
      driver: ApolloFederationDriver,
      useGlobalPrefix: true,
      // cors: corsApolloOptions,
      resolvers: { JSON: JSONObjectResolver, JSONObject: JSONResolver },
      // cache: new RedisCache(redisOptions),
    };
  }
}
