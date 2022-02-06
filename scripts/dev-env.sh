#!/bin/sh
echo "Setting DB Provider"
export DATABASE_PROVIDER=postgresql
echo "Setting DB URL"
export DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/postgres?schema=ub-schema
