# Project Roadmaps

This is an app to work with project roadmaps.

## Features

### Apps and Packages

-   `web`: a [Next.js](https://nextjs.org/) app
-   `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
-   `database`: [Prisma](https://prisma.io/) ORM wrapper to manage & access the database
-   `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Utilities

This turborepo uses following utilities:

-   [TypeScript](https://www.typescriptlang.org/) for static type checking
-   [ESLint](https://eslint.org/) for code linting
-   [Prettier](https://prettier.io) for code formatting
-   [Prisma](https://prisma.io/) for database ORM
-   [Docker Compose](https://docs.docker.com/compose/) for local database

### Database

[Prisma](https://prisma.io/) is used to manage & access our database.

To deploy a PostgreSQL server locally with a new database named `postgres` (you can change it however you want) do:

```bash
cd project-roadmaps
docker-compose up -d
```

Once deployed you will need to copy the `.env.example` file to `.env` in order for Prisma to have a `DATABASE_URL` environment variable to access.

```bash
cp .env.example .env
```

If you added a custom database name, or use a cloud based database, you will need to update the `DATABASE_URL` in your `.env` accordingly.

Once deployed & up & running, you will need to create & deploy migrations to your database to add the necessary tables. This can be done using [Prisma Migrate](https://www.prisma.io/migrate):

```bash
npx prisma migrate dev
```

If you need to push any existing migrations to the database, you can use either the Prisma db push or the Prisma migrate deploy command(s):

```bash
pnpm db:push

# OR

pnpm db:migrate:deploy
```

An optional additional step is to seed some initial or fake data to your database using [Prisma's seeding functionality](https://www.prisma.io/docs/guides/database/seed-database).

To do this update check the seed script located in `packages/database/src/seed.ts` & add or update any data you wish to seed to the database.

Once edited run the following command to run tell Prisma to run the seed script defined in the Prisma configuration:

```bash
pnpm db:seed
```

### Build

To build all apps and packages, run the following command:

```bash
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```bash
pnpm dev
```
