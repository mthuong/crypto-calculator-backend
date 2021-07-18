# Crypto Savings Calculator

## Project Description

Calculate your savings investment

## Repositories

[🖥 Backend](https://github.com/mthuong/crypto-calculator-backend)

[🦠 Front end](https://github.com/mthuong)

## Installation

```bash
$ npm install
$ cp .env.dev .env
```

## MYSQL - my.cnf

`default-time-zone = "+00:00"`

## Migration & Seeding

```bash
# default db engine is mysql
$ npm run migration:run

# db seeding with small database
$ npm run migration:seed

# update entities and migrate db
$ npm run database:initialize
```

## Running Migration & Seeding (After release)

```bash
# clear all table first
$ npm run migration:down

# migrate db
$ npm run migration:run
```

## Running middleware

Run software which the app depends on for development

- mailhog (Web and API based SMTP testing)
- mysql

```bash
docker network create red-network
docker-compose up
```

## Running the app

```bash
$ cp .env.dev .env

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app as scheduler

```bash
$ cp .env.dev .env

# set APPLICATION_MODE 'scheduler'
$ vi .env

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Rules

### Create a new module

When you want to create a new `module`, the following command is preferred to run.

```bash
# create a new module
$ npm run generate:module <your_module_name>
CREATE /src/modules/<your_module_name>/<your_module_name>.module.ts (xx bytes)
UPDATE /src/modules/app.module.ts (xx bytes)

# create a controller in created module
$ npm run generate:controller <your_module_name>
CREATE /src/modules/<your_module_name>/<your_module_name>.controller.spec.ts (xx bytes)
CREATE /src/modules/<your_module_name>/<your_module_name>.controller.ts (xx bytes)
UPDATE /src/modules/<your_module_name>/<your_module_name>.module.ts (xx bytes)

# create a service in created module, if needed
$ npm run generate:service <your_module_name>
CREATE /src/modules/<your_module_name>/<your_module_name>.service.spec.ts (xx bytes)
CREATE /src/modules/<your_module_name>/<your_module_name>.service.ts (xx bytes)
UPDATE /src/modules/<your_module_name>/<your_module_name>.module.ts (xx bytes)
```

### Unit test & Coverage

You have to write unit test codes in order to maintain code coverage and reduce runtime errors. Unit test code is required when you create a class such as `service`, `controller` or `etc`.

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { EmailVerificationService } from './email-verification.service';
import { EmailService } from '@modules/email';
import { EmailVerification } from './email-verification.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DatabaseModule } from '@test/database';
import { DatabaseService } from '@test/database/database.service';
import { TestUtils } from '@test/test.utils';
import { Repository } from 'typeorm';
import {
  EmailVerificationTokenExpiredException,
  DataNotFoundException,
} from '@modules/common/exceptions';

describe('EmailVerificationService', () => {
  let service: EmailVerificationService;
  let repository: Repository<unknown>;
  let testUtils: TestUtils;

  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [DatabaseService, TestUtils],
    }).compile();
    testUtils = testModule.get<TestUtils>(TestUtils);
    const emailVerificaitonRepository = await testUtils.getRepository(
      EmailVerification,
    );
    await testUtils.reloadFixtures();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailVerificationService,
        {
          provide: EmailService,
          useValue: {}, // TODO: Mock
        },
        {
          provide: getRepositoryToken(EmailVerification),
          useValue: await testUtils.getRepository(EmailVerification),
        },
      ],
    }).compile();

    service = module.get<EmailVerificationService>(EmailVerificationService);
    repository = emailVerificaitonRepository;
  });

  afterEach(async () => {
    await testUtils.closeDbConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('verifyEmailToken', () => {
    it('token verification sould be success', async () => {
      const token = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
      await expect(service.verifyEmailToken(token)).resolves.toBeDefined();
    });

    it('token verification sould be failed', async () => {
      const token = '1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx1';
      await expect(service.verifyEmailToken(token)).rejects.toBeInstanceOf(
        DataNotFoundException,
      );
    });

    it('token verification sould be expired', async () => {
      const token = new EmailVerification({
        userId: 1,
        email: 'test@test.com',
      });
      token.expiresAt = new Date();
      await repository.save(token);
      await expect(
        service.verifyEmailToken(token.verificationToken),
      ).rejects.toBeInstanceOf(EmailVerificationTokenExpiredException);
    });
  });
});
```

## How to deploy into ECS

```
act -s AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID> -s AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY> -P ubuntu-latest=nektos/act-environments-ubuntu:18.04 -j deploy
```

### Style Guide

[TypeScript Deep Dive StyleGuide](https://basarat.gitbook.io/typescript/styleguide)

### REST API Design Principal

[paypal/api-standards](https://github.com/paypal/api-standards/blob/master/api-style-guide.md)

- [HTTP Methods, Headers, and Statuses](https://github.com/paypal/api-standards/blob/master/api-style-guide.md#http-methods-headers-and-statuses)
- [Naming Conventions](https://github.com/paypal/api-standards/blob/master/api-style-guide.md#naming-conventions)
- [URI](https://github.com/paypal/api-standards/blob/master/api-style-guide.md#uri)
