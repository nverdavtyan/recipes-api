import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { Ingredient } from '../ingredient/ingredient.entity';
import { CreateRecipeDto } from './dto/createRecipe.dto';
import { UpdateRecipeDto } from './dto/updateRecipe.dto';
@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  findAll() {
    return this.recipeRepository.find({ relations: ['ingredients'] });
  }

  findOne(id: number) {
    const found = this.recipeRepository.findOne(id, {
      relations: ['ingredients'],
    });
    if (!found) {
      throw new NotFoundException(`Recipe with ${id} not found !`);
    }

    return found;
  }

  create(createIngredientDto: CreateRecipeDto) {
    return this.recipeRepository.save(createIngredientDto).catch((e) => {
      if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
        throw new BadRequestException('BAZINGA');
      }
      return e;
    });
  }

  // function for add ingredients to recipe
  async addIngredient(recipeId, ingredientId) {
    const recipe = await this.recipeRepository.findOne(recipeId, {
      relations: ['ingredients'], // get recipe by id
    });
    if (!recipe) return null; // if recipe not exist return null
    const ingredient = await this.ingredientRepository.findOne(ingredientId); // get ingredient by id
    if (!ingredient) return null;
    recipe.ingredients.push(ingredient); // post ingredient data to recipe
    await this.recipeRepository.save(recipe); // save to database
    return this.recipeRepository.findOne(recipeId, {
      relations: ['ingredients'], // get updated recipe with new ingredient
    });
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return this.recipeRepository.update(id, updateRecipeDto);
  }

  async remove(id: number) {
    const result = await this.recipeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Ingredient with ID ${id} not found !`);
    }
  }
}
