import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './ingredient.entity';
@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Add a new ingredient ' })
  @ApiCreatedResponse({ type: Ingredient })
  @ApiCreatedResponse({
    description: 'Ingredient successfully created',
    type: CreateIngredientDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid ingredient' })
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientService.create(createIngredientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of ingredients' })
  @ApiOkResponse({ description: 'Ingredients found' })
  findAll() {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find ingredient by ID. Returns a single ingredient',
  })
  @ApiOkResponse({ description: 'Ingredient found' })
  findOne(@Param('id') id: string) {
    return this.ingredientService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: Ingredient })
  update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientService.update(+id, updateIngredientDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete  ingredient ' })
  @ApiResponse({ status: 204, description: 'Recipe successfully deleted' })
  @ApiNotFoundResponse({ description: 'Recipe not found' })
  remove(@Param('id') id: string) {
    return this.ingredientService.remove(+id);
  }
}
