import {
  PermissionsModuleOptions,
  PermissionsOptionsFactory,
} from '@ultimate-backend/permissions/src/lib/interfaces';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionsConfig implements PermissionsOptionsFactory {
  createPermissionsOptions():
    | Promise<PermissionsModuleOptions>
    | PermissionsModuleOptions {
    return {
      debug: true,
      polars: {
        polar: path.resolve(__dirname, 'assets/authorization.polar'),
        file: true,
      },
    };
  }
}
