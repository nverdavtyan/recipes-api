import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

import { Recipe } from '../../recipe/recipe.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  aisle: string;

  @ManyToMany(() => Recipe)
  recipes: Recipe[];
}
