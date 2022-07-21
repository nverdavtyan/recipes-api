import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './createRecipe.dto';

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {}
