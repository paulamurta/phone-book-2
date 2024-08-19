#!/bin/sh
set -e

if ! npx prisma migrate status | grep "No migrations"; then
  echo "Applying migrations..."
  npx prisma migrate deploy
fi

if [ -f ./seed-dist/seed.js ]; then
  echo "Running seeds"
  node seed-dist/seed.js
fi

exec "$@"