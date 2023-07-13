import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Livro from './Livro';
import Emprestimo from './Emprestimo';

export default class Pessoa extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public nascimento: Date;
  
  /*
  @hasMany(() => Emprestimo, {
    localKey: 'id',
    foreignKey: 'id_pessoa',
  })
  public remprestimo: HasMany<typeof Emprestimo>



  //caso fosse ser utilizado uma relação many to many pura, porém eu quero fazer mais
  Referencia de Livros
  @manyToMany(() => Livro, {
    pivotForeignKey: 'id_livro',
    pivotRelatedForeignKey: 'id_Pessoa',
  })
  public livros: ManyToMany<typeof Livro>
  */

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


 
}
