import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cafes')
@Controller('cafes')
export class CafeController {
  constructor() {}

  @Get()
  findAll() {}

  @Get(':id')
  findOne(@Param('id') id: string) {}
}
