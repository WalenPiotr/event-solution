import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DatabaseModule } from './database/database.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [DatabaseModule, EventModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
