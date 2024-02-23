import { Injectable } from "@nestjs/common";
import { CreateWordDto } from "./dto/create-word.dto";
import { UpdateWordDto } from "./dto/update-word.dto";

@Injectable()
export class WordsService {
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
}
