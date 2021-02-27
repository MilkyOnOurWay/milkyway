import { Controller, Get, Param } from '@nestjs/common';

@Controller('cafes')
export class CafeController {
  constructor() {}

  @Get()
  findAll() {}

  @Get(':id')
  findOne(@Param('id') id: string) {}
}
