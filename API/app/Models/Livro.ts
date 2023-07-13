import { DateTime } from 'luxon'
import { BaseModel,  ManyToMany,  column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Pessoa from './Pessoa';

export default class Livro extends BaseModel {
   
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public autor: string

  @column()
  public capa: string

  /*
  @manyToMany(() => Pessoa, {
    pivotForeignKey: 'id_pessoa',
    pivotRelatedForeignKey: 'id_livro'
  })
  public pessoas: ManyToMany<typeof Pessoa>
  */

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
