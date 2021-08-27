import { Migration } from '@mikro-orm/migrations';

export class Migration20210815234343 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "roles" ("id" serial primary key, "created_at" jsonb not null, "updated_at" jsonb not null);',
    );
  }
}
