import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { NotEquals, IsString/*Contains*/ } from 'class-validator'

const colors= ["Red", "Blue", "Yellow", "Green", "Magenta"]

@Entity()

export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', {nullable:false})
  name: string

  // @Contains(colors)
  @NotEquals(colors)
  @Column('text', {nullable:true})
  color: string 

  @Column('json', {nullable:true})
  board: JSON

}
