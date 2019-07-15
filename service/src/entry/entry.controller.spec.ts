import { Test, TestingModule } from '@nestjs/testing';
import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';
import { EntrySchema } from './entry.schema';
import { model } from 'mongoose';
import * as sinon from 'sinon';

describe('EntryController', () => {
  let controller: EntryController;
  let service: EntryService;

  beforeEach(() => {
    service = new EntryService(model('Entry', EntrySchema));
    controller = new EntryController(service);
  });

  describe('create', () => {
    it('should create and return new entry ', async () => {
      const data = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john-doe@example.com',
        date: new Date('2019-07-15T10:22:20Z'),
      };
      const createFn = sinon.stub();
      createFn.withArgs(data).resolves(data);
      jest.spyOn(service, 'create').mockImplementation(createFn);
      expect(await controller.create(data)).toBe(data);
    });
  });

  describe('findAll', () => {
    it('should return an array entries', async () => {
      const data = [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john-doe@example.com',
          date: new Date('2019-07-15T10:22:20Z'),
        },
      ];
      const findAll = sinon.stub();
      findAll.resolves(data);
      jest.spyOn(service, 'findAll').mockImplementation(findAll);
      expect(await controller.findAll()).toBe(data);
    });
  });

  describe('delete', () => {
    it('should delete and return deleted entry', async () => {
      const data = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john-doe@example.com',
        date: new Date('2019-07-15T10:22:20Z'),
      };
      const deleteFn = sinon.stub();
      deleteFn.withArgs('1').resolves(data);
      jest.spyOn(service, 'delete').mockImplementation(deleteFn);
      expect(await controller.delete('1')).toBe(data);
    });
  });
});
