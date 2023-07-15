import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'emprestimos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      
      //Inicio criação das tabelas
      table
        .integer('id_pessoa')
        .unsigned()
        .index()

      table
        .integer('id_livro')
        .unsigned()
        .index()
      
      table
        .integer('id_biblioteca')
        .unsigned()
        .index()
      //final----------------------      
 
      table
        .foreign('id_pessoa')
        .references('id')
        .inTable('pessoas')
        .onUpdate('cascade')
        .onDelete('cascade')

      table
        .foreign('id_livro')
        .references('id')
        .inTable('livros')
        .onUpdate('cascade')
        .onDelete('cascade')

      table
        .foreign('id_biblioteca')
        .references('id')
        .inTable('bibliotecas')
        .onUpdate('cascade')
        .onDelete('cascade')
      
      table
        .timestamp('data_emprestimo', { useTz: true })

      table
        .timestamp('data_devolucao')

      table
        .boolean('emprestado')
      
    })

    this.raw

  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
