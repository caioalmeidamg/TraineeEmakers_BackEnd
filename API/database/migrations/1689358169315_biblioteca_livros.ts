import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'biblioteca_livros'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
    
      table
        .integer('id_livro')
        .unsigned()
        .index()
      
      table
        .integer('id_biblioteca')
        .unsigned()
        .index()
      
      table
        .integer('quant_livros')
        
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
      
      
    
    
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
