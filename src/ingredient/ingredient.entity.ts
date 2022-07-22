import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

import { Recipe } from '../recipe/recipe.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  aisle: string;

  @ManyToMany(() => Recipe)
  recipes: Recipe[];
}
