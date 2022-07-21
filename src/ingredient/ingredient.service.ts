import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  create(createIngredientDto: CreateIngredientDto) {
    return this.ingredientRepository.save(createIngredientDto);
  }

  findAll() {
    return this.ingredientRepository.find();
  }

  async findOne(id: number) {
    const found = await this.ingredientRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Ingredient with ID ${id} not found !`);
    }
    return found;
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientRepository.update(id, updateIngredientDto);
  }

  async remove(id: number) {
    const result = await this.ingredientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Ingredient with ID ${id} not found !`);
    }
  }
}
