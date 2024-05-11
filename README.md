<img src="https://ibb.co/HCrGbmV" alt="Descrição opcional">
<p align="center">
 <h1> Aplicação Rest desenvolvida em NestJs + PrismaIO + Sqlite. Aplicação de catalogo de Imoveis e suas operações basicas </h1>



  
## technologies used 📌:
[![My Skills](https://skillicons.dev/icons?i=nestjs,prisma,sqlite)](https://skillicons.dev)


# [![My Skills](https://skillicons.dev/icons?i=nestjs)](https://skillicons.dev) 💡  NestJS Description:

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation:

```bash
$ npm i -g @nestjs/cli
$ nest new project-name
```

## Running the app:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# [![My Skills](https://skillicons.dev/icons?i=prisma)](https://skillicons.dev)  💡 Set up Prisma:

```bash
$ npm install prisma --save-dev
```
In the following steps, we'll be utilizing the Prisma CLI. As a best practice, it's recommended to invoke the CLI locally by prefixing it with npx:


```bash
$ npx prisma
```
Now create your initial Prisma setup using the init command of the Prisma CLI:
```bash
$ npx prisma init
```
This command creates a new prisma directory with the following contents:

    schema.prisma: Specifies your database connection and contains the database schema
    .env: A dotenv file, typically used to store your database credentials in a group of environment variables

### Set the database connection

Your database connection is configured in the datasource block in your schema.prisma file. By default it's set to postgresql, but since you're using a SQLite database in this guide you need to adjust the provider field of the datasource block to sqlite:  

```typescript

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

```
Now, open up .env and adjust the DATABASE_URL environment variable to look as follows:

```typescript

DATABASE_URL="file:./dev.db"

```

Create two database tables with Prisma Migrate#

In this section, you'll create two new tables in your database using Prisma Migrate. Prisma Migrate generates SQL migration files for your declarative data model definition in the Prisma schema. These migration files are fully customizable so that you can configure any additional features of the underlying database or include additional commands, e.g. for seeding.

Add the following two models to your schema.prisma file:

```typescript

model User {
  id    Int     @default(autoincrement()) @id
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int      @default(autoincrement()) @id
  title     String
  content   String?
  published Boolean? @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}

```
With your Prisma models in place, you can generate your SQL migration files and run them against the database. Run the following commands in your terminal:

```bash
$ npx prisma migrate dev --name init
```
### Install and generate Prisma Client

Prisma Client is a type-safe database client that's generated from your Prisma model definition. Because of this approach, Prisma Client can expose CRUD operations that are tailored specifically to your models.

To install Prisma Client in your project, run the following command in your terminal:

```bash
$ npm install @prisma/client
```

Use Prisma Client in your NestJS services#

You're now able to send database queries with Prisma Client. If you want to learn more about building queries with Prisma Client, check out the API documentation.

When setting up your NestJS application, you'll want to abstract away the Prisma Client API for database queries within a service. To get started, you can create a new PrismaService that takes care of instantiating PrismaClient and connecting to your database.

Inside the src directory, create a new file called prisma.service.ts and add the following code to it:

```typescript

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
```


