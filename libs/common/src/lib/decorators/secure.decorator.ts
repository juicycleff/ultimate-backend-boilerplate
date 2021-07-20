import { SetMetadata } from '@nestjs/common';
import { defaultsDeep } from 'lodash';

export const SECURE_KEY = 'secure';

export interface SecureHandlerOptions {
  claim?: 'service' | 'account' | 'all';
  roles?: Array<string>;
}

export const Secure = (options?: SecureHandlerOptions) =>
  SetMetadata(
    SECURE_KEY,
    defaultsDeep({}, options, {
      claim: 'all',
    }),
  );
