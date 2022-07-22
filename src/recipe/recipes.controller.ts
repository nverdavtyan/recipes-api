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
  ApiCreatedResponse,
  ApiResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/createRecipe.dto';
import { Recipe } from './recipe.entity';
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of recipes ' })
  @ApiNoContentResponse({ description: 'No recipe found' })
  index() {
    return this.recipesService.findAll();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Find recipe by ID. Returns a single recipe' })
  @ApiOkResponse({ description: 'Recipe found' })
  @ApiNotFoundResponse({ description: 'Recipe not found' })
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @Post()
  @HttpCode(200)
  @ApiCreatedResponse({ type: Recipe, description: 'Create recipe' })
  @ApiOperation({ summary: 'Create a new recipe ' })
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: Recipe })
  @ApiOperation({ summary: 'Update an existing recipe' })
  @ApiOkResponse({
    description: 'Recipe successfully updated',
    type: CreateRecipeDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid recipe or missing id' })
  @ApiNotFoundResponse({ description: 'Recipe not found' })
  update(
    @Param('id') id: string,
    @Body() updateIngredientDto: CreateRecipeDto,
  ) {
    return this.recipesService.update(+id, updateIngredientDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete Recipe' })
  @ApiResponse({ status: 204, description: 'Recipe successfully deleted' })
  remove(@Param('id') id: string) {
    return this.recipesService.remove(+id);
  }

  @Patch(':recipeId/ingredient/:ingredientId')
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
