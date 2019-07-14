import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EntryDto } from './dto/Entry.dto';
import { EntryService } from './entry.service';
import { Entry } from './interface/entry.interface';

@Controller('event')
export class EntryController {
  constructor(private readonly appService: EntryService) {}
  @Post()
  create(@Body() entry: EntryDto): Promise<Entry> {
    return this.appService.create(entry);
  }
  @Get()
  findAll(): Promise<Entry[]> {
    return this.appService.findAll();
  }
  @Delete()
  delete(@Param('id') id: string): Promise<Entry> {
    return this.appService.delete(id);
  }
}
