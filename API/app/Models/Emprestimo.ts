import { DateTime } from 'luxon'
import { BaseModel, column,afterCreate } from '@ioc:Adonis/Lucid/Orm'
import Database from '@ioc:Adonis/Lucid/Database'

export default class Emprestimo extends BaseModel {
  @column()
  public id_pessoa: number

  @column()
  public id_livro: number
  
  @column()
  public id_biblioteca: number
  
  @column.dateTime({ autoCreate: true })
  public dataEmprestimo: DateTime

  @column.dateTime({ })
  public dataDevolucao: DateTime

  @column()
  public emprestado: boolean

 
}
