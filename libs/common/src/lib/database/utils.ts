import { basename } from 'path';

export function importAll(r): Record<string, any> {
  const migrations = {};
  r.keys().forEach((key) => (migrations[basename(key)] = Object.values(r(key))[0]));
  return migrations;
}

export function importAllEntities(r): any[] {
  const entities = [];
  r.keys().forEach((key) => {
    if (key !== './base.entity.ts' && key !== './index.ts') {
      entities.push(Object.values(r(key))[0]);
    }
  });
  return entities;
}
