import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EventEmitter2 } from "@nestjs/event-emitter";

describe("AppController", () => {
  let appController: AppController;
  const mockEventEmitter = {
    emit: jest.fn()
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, EventEmitter2],
    })
    .overrideProvider(EventEmitter2)
    .useValue(mockEventEmitter)
    .compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe("Hello World!");
    });
  });
});
