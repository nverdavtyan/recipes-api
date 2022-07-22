import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Ingredient } from '../ingredient/ingredient.entity';
export enum type {
  BREAKFAST = 'breakfast',
  LAUNCH = 'lunch',
  DINNER = 'dinner',
}

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ name: 'rrrr' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ enum: ['breakfast', 'lunch', 'dinner'] })
  @Column({
    type: 'enum',
    enum: type,
    default: type.DINNER,
  })
  type: type;

  @ApiProperty()
  @Column({ nullable: true })
  instructions: string;

  @ManyToMany(() => Ingredient, (ingredients) => ingredients.recipes, {
    cascade: false,
  })
  @JoinTable({ name: 'recipes_ingredients' })
  ingredients: Ingredient[];
}
