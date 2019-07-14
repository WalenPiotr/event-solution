import { Test, TestingModule } from '@nestjs/testing';
import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';

describe('EntryController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [EntryController],
      providers: [EntryService],
    }).compile();
  });

  // describe('getHello', () => {
  //   it('should return "Hello World!"', () => {
  //     const appController = app.get<EntryController>(EntryController);
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
});
