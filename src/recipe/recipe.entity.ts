import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
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

  @Column({ unique: true })
  name: string;

  @Column({
    type: 'enum',
    enum: type,
    default: type.BREAKFAST,
  })
  type: type;

  @Column({ nullable: true })
  instructions: string;

  @ManyToMany(() => Ingredient, (ingredients) => ingredients.recipes, {
    cascade: false,
  })
  @JoinTable({ name: 'recipes_ingredients' })
  ingredients: Ingredient[];
}
