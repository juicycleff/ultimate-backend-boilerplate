local claims = std.extVar('claims');
{
  identity: {
    traits: {
      // Allowing unverified email addresses enables account
      // enumeration attacks, especially if the value is used for
      // e.g. verification or as a password login identifier.
      //
      // It is assumed that Facebook requires a email to be verifed before accessable via Oauth (because they don't provide an email_verified field).
      //
      // The email might be empty if the user is not allowed to an email scope.
      [if "email" in claims then "email" else null]: claims.email,
    },
  },
}
