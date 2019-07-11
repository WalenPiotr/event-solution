import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EventDto } from './dto/Event.dto';
import { EventService } from './event.service';
import { Event } from './interface/event.interface';

@Controller('event')
export class EventController {
  constructor(private readonly appService: EventService) {}
  @Post()
  create(@Body() eventDto: EventDto): Promise<Event> {
    return this.appService.create(eventDto);
  }
  @Get()
  findAll(): Promise<Event[]> {
    return this.appService.findAll();
  }
  @Delete()
  delete(@Param('id') id: string): Promise<Event> {
    return this.appService.delete(id);
  }
}
