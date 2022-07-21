import { Length } from 'class-validator';

export class CreateIngredientDto {
  @Length(2, 50)
  name: string;
}
