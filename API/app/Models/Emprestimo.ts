import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Emprestimo extends BaseModel {

  @column()
  public id_Pessoa: number;

  @column()
  public id_Livro: number;

  @column()
  public id_Biblioteca: number;

  @column()
  public dataEmprestimo: Date;

  @column.dateTime({autoCreate: true})
  public dataDevolucao: DateTime;

  @column()
  public emprestado: boolean;
}
