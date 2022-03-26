allow(actor, action, resource) if
  has_permission(actor, action, resource);

actor User {}

resource Organisation {
  permissions = ["read", "write", "delete", "update"];
  roles = ["contributor", "maintainer", "admin"];

  "read" if "contributor";
  "push" if "maintainer";
  "delete" if "admin";

  "maintainer" if "admin";
  "contributor" if "maintainer";
}

# This rule tells Oso how to fetch roles for a repository
has_role(actor: User, role_name: String, org: Organisation) if
  role in actor.roles and
  role_name = role.name and
  org = role.repository;
