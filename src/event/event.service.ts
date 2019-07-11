import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ConfigService } from 'src/config/config.service';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './interface/event.interface';
import { CreateEventDto } from './dto/CreateEvent.dto';

@Injectable()
export class EventService {
  private readonly eventModel: Model<Event>;
  constructor(@InjectModel('Event') eventModel) {
    this.eventModel = eventModel;
  }
  async create(dto: CreateEventDto): Promise<Event> {
    const createdCat = new this.eventModel(dto);
    return await createdCat.save();
  }

  async findAll(): Promise<Event[]> {
    return await this.eventModel.find().exec();
  }
}
