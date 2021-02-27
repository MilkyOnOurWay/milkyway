import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Connection, createConnection } from 'typeorm';

import { User } from 'src/user/infrastructure/entities/user.entity';
import { Suggestion } from 'src/cafe/infrastructure/entities/suggestion.entity';
import { SuggestionCafeTip } from 'src/cafe/infrastructure/entities/suggestion-cafe-tip.entity';
import { SuggestionMenuCategory } from 'src/cafe/infrastructure/entities/suggestion-menu-category.entity';
import { SuggestionMenu } from 'src/cafe/infrastructure/entities/suggestion-menu.entity';
import { Cafe } from 'src/cafe/infrastructure/entities/cafe.entity';
import { Menu } from 'src/cafe/infrastructure/entities/menu.entity';
import { CafeTip } from 'src/cafe/infrastructure/entities/cafe-tip.entity';
import { MenuCategory } from 'src/cafe/infrastructure/entities/menu-category.entity';

export default class AppService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection | undefined;

  public async onModuleInit(): Promise<void> {
    const entities = [
      User,
      Suggestion,
      SuggestionCafeTip,
      SuggestionMenu,
      SuggestionMenuCategory,
      Cafe,
      CafeTip,
      Menu,
      MenuCategory,
    ];
    this.connection = await createConnection({
      type: 'mysql',
      ...this.loadDBConfig(),
      entities,
    });
    if (!this.connection) process.exit(1);
  }

  public async onModuleDestroy(): Promise<void> {
    if (this.connection) await this.connection.close();
  }

  private loadDBConfig() {
    return {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      database: process.env.DATABASE_NAME || 'milkyway',
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'test',
      synchronize: 'true' === process.env.DATABASE_SYNC || true,
      logging: 'true' === process.env.DATABASE_LOGGING || true,
    };
  }
}
