import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { EntryModule } from './entry/entry.module';

@Module({
  imports: [DatabaseModule, EntryModule],
})
export class AppModule {}
