import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntryController } from './entry.controller';
import { EntrySchema } from './entry.schema';
import { EntryService } from './entry.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Entry', schema: EntrySchema }]),
  ],
  controllers: [EntryController],
  providers: [EntryService],
})
export class EntryModule {}
