import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany  } from '@ioc:Adonis/Lucid/Orm'
import Livro from './Livro'

export default class Biblioteca extends BaseModel {
  //Relações -----------------------------------------
  @manyToMany(() => Livro, {
    pivotTable: 'biblioteca_livro',
    pivotForeignKey: 'id_biblioteca',
    pivotRelatedForeignKey: 'id_livro'
  })
  public livros: ManyToMany<typeof Livro>
   //---------------------------------------------------

  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
