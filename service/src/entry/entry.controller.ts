import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EntryDto } from './dto/Entry.dto';
import { EntryService } from './entry.service';
import { Entry } from './interface/entry.interface';

@Controller('entry')
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
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Entry> {
    return this.appService.delete(id);
  }
}
