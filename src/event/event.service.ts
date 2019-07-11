import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDto } from './dto/Event.dto';
import { Event } from './interface/event.interface';

@Injectable()
export class EventService {
  private readonly eventModel: Model<Event>;
  constructor(@InjectModel('Event') eventModel) {
    this.eventModel = eventModel;
  }
  async create(event: EventDto): Promise<Event> {
    const createdEvent = new this.eventModel(event);
    return createdEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async delete(id: string) {
    return this.eventModel.findOneAndDelete({ _id: id }).exec();
  }
}
