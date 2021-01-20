# NestJS Firebase Role Based Auth Starter

## Features
- Role based authentication with firebase 🔐
- PostgreSQL with TypeORM 💾
- Swagger 📚
- Send mails via SMTP server 📧
- FCM notifications ✉️

## Good to know
### Database version check
All entities that have a `@VersionColumn` (all by default) will be automatically version checked thanks to the `OptimisticLockingSubscriber` [from here](https://github.com/typeorm/typeorm/issues/3608#issuecomment-476352843).

### Route access control
Use the following decorators on your controller class :
```ts
@UseGuards(FirebaseAuthGuard, RolesGuard)
@RolesAllowed(Roles.ADMIN)
```
This will enable access control for all the routes within this controller and allow the `ADMIN` users to access all routes by default.

If you want for example to additionally allow `USER` users to access a specific route only you can use the same decorator on the route :
```ts
@RolesAllowed(Roles.USER)
```
To allow everyone to access a route and to bypass class-level restrictions on a specific route, you can use the `@Public` decorator.

Please see `src/users/users.contoller.ts` as an example.
## Installation

1. Install dependencies
```bash
$ yarn install
```

2. Add the `service-account.json` (for firebase authentication) file at the root of the project.
3. Create the `.env` file from `.env.example` and replace values.

4. Setup database
```bash
$ docker-compose up -d

```
## Running

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

