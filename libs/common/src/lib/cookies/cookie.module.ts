import { Module, OnModuleInit, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Application } from 'express';
import { FastifyInstance } from 'fastify';
import { NestCookieRequest } from './cookie.interface';

@Module({})
export class CookieModule implements OnModuleInit, NestModule {
  constructor(private readonly adapterHost: HttpAdapterHost) {}

  onModuleInit(): void {
    const adapterInstance = this.adapterHost.httpAdapter.getInstance<
      Application | FastifyInstance
    >();
    if (this.adapterIsFastify(adapterInstance)) {
      adapterInstance.addHook('onRequest', this.parseCookies as any);
    }
  }

  configure(consumer: MiddlewareConsumer): void {
    if (!this.adapterIsFastify(this.adapterHost.httpAdapter.getInstance())) {
      consumer.apply(this.parseCookies).forRoutes('*');
    }
  }

  private adapterIsFastify(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    adapter: Application | FastifyInstance,
  ): adapter is FastifyInstance {
    return this.adapterHost.httpAdapter.getType() === 'fastify';
  }

  private parseCookies(
    req: NestCookieRequest<{ headers: Record<string, any> }>,
    res,
    next,
  ): void {
    req._cookies = [];
    req.cookies = {};
    const cookieHeader: string = req.headers['cookie'] ?? '';
    const cookies = cookieHeader.split('; ');
    cookies
      .filter((cookie) => !!cookie)
      .forEach((cookie: string) => {
        const [cookieName, cookieValue] = cookie.split('=');
        req.cookies[cookieName] = decodeURIComponent(cookieValue);
      });
    next();
  }
}
