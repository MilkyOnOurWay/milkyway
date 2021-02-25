import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CreateCafeDto } from './dto/create-cafe.dto';
import { UpdateCafeDto } from './dto/update-cafe.dto';

@Controller('cafe')
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}

  @Post()
  create(@Body() eto: CreateCafeDto) {
    return this.cafeService.create(eto);
  }

  @Get()
  findAll() {
    return this.cafeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cafeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCafeDto) {
    return this.cafeService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cafeService.remove(+id);
  }
}
