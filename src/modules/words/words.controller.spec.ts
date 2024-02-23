import { TestingModule, Test } from "@nestjs/testing";
import { UpdateWordDto } from "./dto/update-word.dto";
import { WordsController } from "./words.controller";
import { WordsService } from "./words.service";

describe("WordsController", () => {
  let controller: WordsController;
  const mockWordsService = {
    create: jest.fn().mockImplementation((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    update: jest.fn().mockImplementation((id, dto) => {
      return {
        id,
        ...dto,
      };
    }),
    remove: jest.fn(),
    findAll: jest.fn().mockImplementation(() => {
      return [] as UpdateWordDto[];
    }),
    findOne: jest.fn().mockImplementation(() => {
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordsController],
      providers: [WordsService],
    })
      .overrideProvider(WordsService)
      .useValue(mockWordsService)
      .compile();

    controller = module.get<WordsController>(WordsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a word", () => {
    const dto = { text: "hello" };
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      text: dto.text,
    });

    expect(mockWordsService.create).toHaveBeenCalledWith(dto);
  });

  it("should update a word", () => {
    const dto = { text: "hello" } as UpdateWordDto;
    expect(controller.update("1", dto)).toEqual({
      id: 1,
      ...dto,
    });

    expect(mockWordsService.update).toHaveBeenCalledWith(1, dto);
  });

  it("should remove a word", () => {
    controller.remove("1");
    expect(mockWordsService.remove).toHaveBeenCalledWith(1);
  });

  it("should return list of words", () => {
    expect(controller.findAll()).toEqual([]);
    expect(mockWordsService.findAll).toHaveBeenCalled();
  });

  it("should find a word by id", () => {
    expect(controller.findOne("1")).toEqual(null);
    expect(mockWordsService.findOne).toHaveBeenCalled();
  });
});
