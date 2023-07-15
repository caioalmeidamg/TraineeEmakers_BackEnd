import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class BibliotecaLivro extends BaseModel {
  @column()
  public id_livro: number
  
  @column()
  public id_biblioteca: number

  @column()
  public quantLivros: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
