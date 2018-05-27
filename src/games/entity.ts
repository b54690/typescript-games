import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { ValidateNested, IsIn, IsString } from 'class-validator'

export const moves = (board1, board2) => 
        board1
        .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
        .reduce((a, b) => a.concat(b))
        .length

@Entity()

export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', {nullable:true})
  name: string

  @Column('text', {nullable:true})
  // @IsIn(["Red", "Blue", "Yellow", "Green", "Magenta"])
  color: string 

  @ValidateNested()
  @Column('json', {nullable:true})
  board: string [][]

}
