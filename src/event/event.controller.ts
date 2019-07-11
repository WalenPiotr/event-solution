import { Controller, Get, Body, Post, All } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './interface/event.interface';
import { CreateEventDto } from './dto/CreateEvent.dto';

@Controller('event')
export class EventController {
  constructor(private readonly appService: EventService) {}
  @Post()
  create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.appService.create(createEventDto);
  }
  @Get()
  findAll(): Promise<Event[]> {
    return this.appService.findAll();
  }
}
