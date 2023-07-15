import { DateTime } from 'luxon'
import { BaseModel,  ManyToMany,  column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Pessoa from './Pessoa';
import Biblioteca from './Biblioteca';

export default class Livro extends BaseModel {
  
  //Relações -----------------------------------------
  @manyToMany(() => Pessoa, {
    pivotTable: 'emprestimos',
    pivotForeignKey: 'id_livro',
    pivotRelatedForeignKey: 'id_pessoa'
  })
  public pessoas: ManyToMany<typeof Pessoa> 

  @manyToMany(() => Biblioteca, {
    pivotTable: 'biblioteca_livro',
    pivotForeignKey: 'id_livro',
    pivotRelatedForeignKey:'id_biblioteca'
  })
  public bibliotecas: ManyToMany<typeof Biblioteca>
  //---------------------------------------------------

  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public autor: string

  @column()
  public capa: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
