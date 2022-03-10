/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import Long from 'long';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'ultimate_backend.srv.application';

export interface Message {
  body: string;
}

export const ULTIMATE_BACKEND_SRV_APPLICATION_PACKAGE_NAME =
  'ultimate_backend.srv.application';

export interface ApplicationServiceClient {
  sayHello(request: Message, metadata: Metadata, ...rest: any): Observable<Message>;
}

export interface ApplicationServiceController {
  sayHello(
    request: Message,
    metadata: Metadata,
    ...rest: any
  ): Promise<Message> | Observable<Message> | Message;
}

export function ApplicationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['sayHello'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('ApplicationService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('ApplicationService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const APPLICATION_SERVICE_NAME = 'ApplicationService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
