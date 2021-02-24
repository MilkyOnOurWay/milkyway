import { Injectable } from '@nestjs/common';
import { CreateUniverseDto } from './dto/create-universe.dto';
import { UpdateUniverseDto } from './dto/update-universe.dto';

@Injectable()
export class UniverseService {
  create(createUniverseDto: CreateUniverseDto) {
    return 'This action adds a new universe';
  }

  findAll() {
    return `This action returns all universe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} universe`;
  }

  update(id: number, updateUniverseDto: UpdateUniverseDto) {
    return `This action updates a #${id} universe`;
  }

  remove(id: number) {
    return `This action removes a #${id} universe`;
  }
}
