import { Test, TestingModule } from "@nestjs/testing";
import { TextController } from "./text.controller";
import { TextService } from "./text.service";

describe("TextController", () => {
  let textController: TextController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TextController],
      providers: [TextService],
    }).compile();

    textController = app.get<TextController>(TextController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(textController.getHello()).toBe("Hello World!");
    });
  });
});
