import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ required: true })
  @IsString()
  public readonly id: string;

  @ApiProperty({ required: true })
  @IsString()
  public readonly name: string;
}
