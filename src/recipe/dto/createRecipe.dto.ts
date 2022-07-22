import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
export class CreateRecipeDto {
  @Length(2, 50)
  @ApiProperty()
  name: string;

  @ApiProperty()
  instructions: string;
}
