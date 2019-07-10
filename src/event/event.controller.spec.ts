import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';

describe('EventController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [EventController],
      providers: [EventService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<EventController>(EventController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
