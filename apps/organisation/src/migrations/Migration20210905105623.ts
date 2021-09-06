import { Migration } from '@mikro-orm/migrations';

export class Migration20210905105623 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "organisations" ("id" varchar(255) not null, "created_at" jsonb not null, "updated_at" jsonb not null, "path" varchar(255) not null, "name" varchar(255) not null);',
    );
    this.addSql(
      'alter table "organisations" add constraint "organisations_pkey" primary key ("id");',
    );

    this.addSql(
      'create table "organisation-members" ("id" varchar(255) not null, "created_at" jsonb not null, "updated_at" jsonb not null, "organisation_name" varchar(255) not null);',
    );
    this.addSql(
      'alter table "organisation-members" add constraint "members_pkey" primary key ("id");',
    );
  }
}
