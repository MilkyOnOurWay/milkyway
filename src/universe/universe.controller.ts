import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UniverseService } from './universe.service';
import { CreateUniverseDto } from './dto/create-universe.dto';
import { UpdateUniverseDto } from './dto/update-universe.dto';

@Controller('universe')
export class UniverseController {
  constructor(private readonly universeService: UniverseService) {}

  @Post()
  create(@Body() createUniverseDto: CreateUniverseDto) {
    return this.universeService.create(createUniverseDto);
  }

  @Get()
  findAll() {
    return this.universeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.universeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUniverseDto) {
    return this.universeService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.universeService.remove(+id);
  }
}
