# Backend - Supabase Postgres (branch: supabase-integration)

This branch configures the backend to connect to a Supabase (Postgres) database via Sequelize.

Quick notes
- The project uses Sequelize ORM. This branch changes the Sequelize dialect to `postgres` and supports a single `DATABASE_URL` (recommended) or individual `DB_*` env vars.
- Required env variables (see `.env.example`):
  - DATABASE_URL (recommended): full Postgres connection string from Supabase
  - or DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT
  - DB_SSL (set to `true` when using Supabase/managed Postgres)
  - DB_REJECT_UNAUTHORIZED (optional, set to `false` if you must allow self-signed certs)
  - SUPABASE_URL and SUPABASE_KEY (only needed if you use Supabase JS client elsewhere)

How to run locally
1. Copy `.env.example` to `.env` in this folder and populate the values.
2. Install deps (already committed):

   npm install

3. Test DB connection (this will attempt to connect to the DB you configured):

   npm run db:test

If you don't have a Supabase project yet, create one at https://app.supabase.com, then go to Project Settings -> Database -> Connection string and copy the `postgresql://` URL into `DATABASE_URL`.

Notes
- Existing models and associations using Sequelize should continue to work; this change only updates the DB connection and adds Postgres drivers.
- The branch is named `supabase-integration` and contains only backend-side changes. Frontend remains unchanged.
