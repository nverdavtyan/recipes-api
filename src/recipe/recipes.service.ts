import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dto/createRecipe.dto';
import { UpdateRecipeDto } from './dto/updateRecipe.dto';
@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  findAll() {
    return this.recipeRepository.find({ relations: ['ingredients'] });
  }

  findOneBy(id: number) {
    return this.recipeRepository.findOneBy({
      id: id,
    });
  }

  create(createIngredientDto: CreateRecipeDto) {
    return this.recipeRepository.save(createIngredientDto).catch((e) => {
      if (/(name)[\s\S]+(already exists)/.test(e)) {
        throw new BadRequestException('BAZINGA');
      }
      return e;
    });
  }
  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return this.recipeRepository.update(id, updateRecipeDto);
  }

  remove(id: number) {
    return this.recipeRepository.delete(id);
  }
}
