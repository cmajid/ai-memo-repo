import { Injectable } from "@nestjs/common";
import { CreateWordDto } from "./dto/create-word.dto";
import { UpdateWordDto } from "./dto/update-word.dto";

import { LoggerService } from "@ai-memo/logger";
import { LoggerLoggedEvent } from "@ai-memo/logger/events/logger-log.event";
import { OnEvent } from "@nestjs/event-emitter";
import { events } from "../../constans/events/event.constans";

@Injectable()
export class WordsService {
  constructor(private loggerService: LoggerService) {}

  private users: UpdateWordDto[] = [];

  create(createWordDto: CreateWordDto): number {
    const id = this.users.length + 1;
    this.users.push({
      id: id,
      text: createWordDto.text,
    } as UpdateWordDto);
    return id;
  }

  findAll(): UpdateWordDto[] {
    this.loggerService.log({
      text: "Get all words called",
      payload: { userCount: 330, time: Date.now() },
    });
    return this.users;
  }

  findOne(id: number): UpdateWordDto {
    return this.users.find((t) => t.id === id);
  }

  update(id: number, updateWordDto: UpdateWordDto): void {
    const user = this.users.find((t) => t.id === id);
    this.users[this.users.indexOf(user)].text = updateWordDto.text;
  }

  remove(id: number): void {
    this.users = this.users.filter((t) => t.id !== id);
  }

  @OnEvent(events.LOGGER_LOG)
  consolelog({ text, payload }: LoggerLoggedEvent): void {
    console.log(1, text, payload);
  }
}
