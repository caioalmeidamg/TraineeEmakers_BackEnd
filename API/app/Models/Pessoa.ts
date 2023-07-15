import { DateTime } from 'luxon'
import { BaseModel,  ManyToMany, column,  manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Livro from './Livro';

export default class Pessoa extends BaseModel {
  //Relações -----------------------------------------
  @manyToMany(() => Livro, {
    pivotTable: 'emprestimos',
    pivotForeignKey: 'id_pessoa',
    pivotRelatedForeignKey: 'id_livro'
  })
  public livros: ManyToMany<typeof Livro>
   //---------------------------------------------------

  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public nascimento: Date;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


 
}
