import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

import { Recipe } from '../recipe/recipe.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  aisle: string;

  @ManyToMany(() => Recipe)
  recipes: Recipe[];
}
