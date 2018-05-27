import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsIn, IsString } from 'class-validator'

export const moves = (board1, board2) => 
        board1
        .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
        .reduce((a, b) => a.concat(b))
        .length

export const boardColor = () => {
      const colors = ['red', 'blue', 'green', 'yellow', 'magenta']
      return colors[Math.floor(Math.random()* colors.length)]
}

export const colorsAllowed = ['red', 'blue', 'green', 'yellow', 'magenta'];

export const colorIsAllowed = (color) =>  {       
  if (colorsAllowed.includes(color)) return color
}


const defaultBoard = [
["o", "o", "o"],
["o", "o", "o"],
["o", "o", "o"]
]


@Entity()

export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', {nullable: true})
  name: string


  @Column('text', {nullable: true})
  // @IsIn(["Red", "Blue", "Yellow", "Green", "Magenta"])
  color: string

  @Column('json', {default: defaultBoard})
  board: JSON

}
