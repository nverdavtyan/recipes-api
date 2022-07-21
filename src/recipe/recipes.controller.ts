import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/createRecipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  index() {
    return this.recipesService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredientDto: CreateRecipeDto,
  ) {
    return this.recipesService.update(+id, updateIngredientDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete Recipe' })
  @ApiCreatedResponse({
    description: 'Recipe successfully deleted',
  })
  remove(@Param('id') id: string) {
    return this.recipesService.remove(+id);
  }

  @Patch(':recipeId/ingredient/:ingredientId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Add a new ingredient to the recipe' })
  @ApiCreatedResponse({
    description: 'Ingredient successfully added',
  })
  async addIngredient(
    @Param('recipeId') recipeId: number,
    @Param('ingredientId') ingredientId: number,
  ) {
    const recipe = await this.recipesService.addIngredient(
      recipeId,
      ingredientId,
    );
    if (recipe) return recipe;
  }
}
