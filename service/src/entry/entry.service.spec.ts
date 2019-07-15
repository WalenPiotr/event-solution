import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { instance, mock, when, spy, deepEqual } from 'ts-mockito';
import { ConfigService } from '../config/config.service';
import { getModelToken } from '@nestjs/mongoose';
import { EntryService } from './entry.service';
import { Model, model, Document } from 'mongoose';
import { Entry } from './interface/entry.interface';
import { EntrySchema } from './entry.schema';

describe('MovieController - unit tests', () => {
  let EntryModel: Model<Document, {}>;
  let spiedModel: Model<Document, {}>;
  let testModule: TestingModule;
  let service: EntryService;

  beforeEach(async () => {
    EntryModel = model('Entry', EntrySchema);
    spiedModel = spy(EntryModel);
    testModule = await Test.createTestingModule({
      providers: [
        EntryService,
        {
          provide: getModelToken('Entry'),
          useValue: EntryModel,
        },
        {
          provide: ConfigService,
          useValue: new ConfigService(),
        },
      ],
    }).compile();
    service = testModule.get(EntryService);
  });

  describe('create', () => {
    it('should create new entry', async () => {
      const input = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john-doe@example.com',
        date: new Date('2019-07-15T10:22:20Z'),
      };
      when(spiedModel.create(input)).thenReturn(input as any);
      const result = await service.create(input);
      expect(result).toBe(input);
    });
  });

  describe('findAll', () => {
    it('should find all entries', async () => {
      const values = [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john-doe@example.com',
          date: new Date('2019-07-15T10:22:20Z'),
        },
      ];
      when(spiedModel.find()).thenCall(() => ({
        exec: jest.fn(() => new Promise((resolve, reject) => resolve(values))),
      }));
      const result = await service.findAll();
      expect(result).toBe(values);
    });
  });

  describe('delete', () => {
    it('should delete given entry', async () => {
      const value = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john-doe@example.com',
        date: new Date('2019-07-15T10:22:20Z'),
      };
      when(spiedModel.findOneAndDelete(deepEqual({ _id: '1' }))).thenCall(
        () => ({
          exec: jest.fn(() => value),
        }),
      );
      const result = await service.delete('1');
      expect(result).toBe(value);
    });
  });
});
