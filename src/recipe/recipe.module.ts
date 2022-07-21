import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { RecipesService } from './recipes.service';

import { IngredientController } from '../ingredient/ingredient.controller';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { IngredientService } from '../ingredient/ingredient.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Ingredient])],
  controllers: [RecipesController, IngredientController],
  providers: [RecipesService, IngredientService],
})
export class RecipeModule {}
