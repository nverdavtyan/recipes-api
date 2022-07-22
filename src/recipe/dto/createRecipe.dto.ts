import { Length } from 'class-validator';
export class CreateRecipeDto {
  @Length(2, 50)
  name: string;
}
