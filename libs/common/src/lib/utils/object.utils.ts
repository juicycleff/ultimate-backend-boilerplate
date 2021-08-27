import * as _ from 'lodash';

export function removeEmptyFields<T extends Record<string, any>>(obj: T): any {
  return _.omitBy(obj, _.isNil);
}
