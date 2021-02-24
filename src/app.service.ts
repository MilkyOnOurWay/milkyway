import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Connection, createConnection } from 'typeorm';

import { User } from 'src/user/infrastructure/entities/user.entity';

export default class AppService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection | undefined;

  public async onModuleInit(): Promise<void> {
    const entities = [User];
    this.connection = await createConnection({ type: 'mysql', ...this.loadDBConfig(), entities });
    if (!this.connection) process.exit(1);
  }

  public async onModuleDestroy(): Promise<void> {
    if (this.connection) await this.connection.close();
  }

  private loadDBConfig() {
    if (!process.env.DATABASE_HOST) {
      console.error('DATABASE_HOST is not exists');
      process.exit(1)
    }

    if (!process.env.DATABASE_PORT) {
      console.error('DATABASE_PORT is not exists');
      process.exit(1)
    }

    if (!process.env.DATABASE_NAME) {
      console.error('DATABASE_NAME is not exists');
      process.exit(1)
    }

    if (!process.env.DATABASE_USER) {
      console.error('DATABASE_USER is not exists');
      process.exit(1)
    }

    if (!process.env.DATABASE_PASSWORD) {
      console.error('DATABASE_PASSWORD is not exists');
      process.exit(1)
    }

    if (!process.env.DATABASE_SYNC) {
      console.error('DATABASE_SYNC is not exists');
      process.exit(1)
    }

    if (!process.env.DATABASE_LOGGING) {
      console.error('DATABASE_LOGGING is not exists');
      process.exit(1)
    }

    return {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      synchronize: 'true' === process.env.DATABASE_SYNC,
      logging: 'true' === process.env.DATABASE_LOGGING,
    }
  }
}
