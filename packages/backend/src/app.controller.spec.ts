import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World! with Get request"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
    it('should return "Hello World!!!!!!!!!!! with Get request"', () => {
      expect(appController.postHello()).toBe('Hello World!!!!!!!!!!!');
    });
  });
});
