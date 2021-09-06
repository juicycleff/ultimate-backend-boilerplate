import { Migration } from '@mikro-orm/migrations';

export class Migration20210830185012 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "guardian_roles" ("id" varchar(255) not null, "created_at" jsonb not null, "updated_at" jsonb not null, "organisation_name" varchar(255) not null, "inherit_id" varchar(255) null, "path" varchar(255) not null, "name" varchar(255) not null);',
    );
    this.addSql(
      'alter table "guardian_roles" add constraint "guardian_roles_pkey" primary key ("id");',
    );
    this.addSql(
      'alter table "guardian_roles" add constraint "guardian_roles_inherit_id_unique" unique ("inherit_id");',
    );

    this.addSql(
      'create table "guardian_permissions" ("id" varchar(255) not null, "created_at" jsonb not null, "updated_at" jsonb not null, "organisation_name" varchar(255) not null);',
    );
    this.addSql(
      'alter table "guardian_permissions" add constraint "guardian_permissions_pkey" primary key ("id");',
    );

    this.addSql(
      'alter table "guardian_roles" add constraint "guardian_roles_inherit_id_foreign" foreign key ("inherit_id") references "guardian_roles" ("id") on update cascade on delete set null;',
    );

    this.addSql(
      'create index "guardian_roles_name_organisation_name_index" on "guardian_roles" ("name", "organisation_name");',
    );
  }
}
