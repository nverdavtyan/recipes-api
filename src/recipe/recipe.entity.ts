import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  Unique,
} from 'typeorm';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
export enum RecipeType {
  BREAKFAST = 'breakfast',
  LAUNCH = 'lunch',
  DINNER = 'dinner',
}

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: RecipeType,
    default: RecipeType.BREAKFAST,
  })
  type: RecipeType;

  @Column('simple-array')
  instructions: string[];

  @ManyToMany(() => Ingredient, (ingredients) => ingredients.recipes, {
    cascade: false,
  })
  @JoinTable({ name: 'recipes_ingredients' })
  ingredients: Ingredient[];
}
