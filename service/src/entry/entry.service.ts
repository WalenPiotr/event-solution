import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntryDto } from './dto/Entry.dto';
import { Entry } from './interface/entry.interface';

@Injectable()
export class EntryService {
  private readonly entryModel: Model<Entry>;
  constructor(@InjectModel('Entry') entryModel) {
    this.entryModel = entryModel;
  }
  async create(entry: EntryDto): Promise<Entry> {
    return this.entryModel.create(entry);
  }

  async findAll(): Promise<Entry[]> {
    return this.entryModel.find().exec();
  }

  async delete(id: string) {
    return this.entryModel.findOneAndDelete({ _id: id }).exec();
  }
}
