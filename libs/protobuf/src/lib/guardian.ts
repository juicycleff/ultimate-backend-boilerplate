/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import Long from 'long';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'ultimate_backend.srv.guardian';

export interface Message {
  body: string;
}

export const ULTIMATE_BACKEND_SRV_GUARDIAN_PACKAGE_NAME = 'ultimate_backend.srv.guardian';

export interface GuardianServiceClient {
  sayHello(request: Message, metadata: Metadata, ...rest: any): Observable<Message>;
}

export interface GuardianServiceController {
  sayHello(
    request: Message,
    metadata: Metadata,
    ...rest: any
  ): Promise<Message> | Observable<Message> | Message;
}

export function GuardianServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['sayHello'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('GuardianService', method)(
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
      GrpcStreamMethod('GuardianService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const GUARDIAN_SERVICE_NAME = 'GuardianService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
