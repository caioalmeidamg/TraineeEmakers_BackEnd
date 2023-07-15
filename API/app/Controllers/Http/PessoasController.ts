//HttpContext possui todos os parametros de requisição - tudo que é enviado da requisição
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Emprestimo from 'App/Models/Emprestimo'
import Database from '@ioc:Adonis/Lucid/Database'
import Pessoa from 'App/Models/Pessoa'

export default class PessoasController {
    /* Anotações
     | Operações com bancos de dados são realizadas de forma assincrona
     | ->  
     | body = corpo de requisição -> dados que ficam no banco
     | response = envia dados*/

    //Create - Funciona 
    public async store({ request, response }: HttpContextContract) {
        const body = request.body()

        //É criado uma pessoa e inserida no banco de dados
        const pessoa = await Pessoa.create(body)

        return response.status(201).json(pessoa)
    }

    //Basicamente um get de tudo - Funciona
    public async index() {

        const pessoas = await Pessoa.all()

        //retorna um array de objetos 
        return { pessoas }

    }

    //Get com parametro - Funciona
    public async show({ params }: HttpContextContract) {
        const pessoas = await Pessoa.findOrFail(params.id)

        return {
            pessoas
        }
    }

    //Update em tudo - Funciona
    public async update({ params, request, response }: HttpContextContract) {
        //Pega o id passado por parametro
        const pessoaId = params.id

        //Pega a requisição feita
        const data = request.only(['nome', 'nascimento'])

        //Pega a pessoa que possui o mesmo id
        const pessoa = await Pessoa.findOrFail(pessoaId)

        //Faz um merge dos dados
        pessoa.merge(data)
        await pessoa.save()

        return response.status(200).json(pessoa)
    }

    //Delete - Funciona
    public async destroy({ params }: HttpContextContract) {

        //Procura o livro especifico
        const pessoas = await Pessoa.findOrFail(params.id)

        await pessoas.delete()

        return {
            message: "Excluido",
        }
    }

    //INICIO FUNÇÕES DE EMPRESTIMO -------------------------------------------------------
    public async emprestar({ request }: HttpContextContract) {
        //Considero que vou passar um json
        const body = request.body()
        const teste = await this.retornaEmprestimos(body)

        //Pega o id da biblioteca e do livro
        const idBiblioteca = body.id_biblioteca
        const idLivro = body.id_livro

        //Se existe esse livro na biblioteca e está disponivel
        const teste2 =
            await Database
                .from('biblioteca_livros')
                .select('id_biblioteca', 'id_livro')
                .where('id_biblioteca', idBiblioteca)
                .where('id_livro', idLivro)
                .where('quant_livros', '>', 0);


        if (teste.length != 0) {
            return {
                falhou: "Emprestimo ja existente",
                teste
            }
        }
        else if (teste2.length != 0) {
            await Emprestimo.create(body)
            return {
                retorno: "funciona"
            }

        }



    }

    private async retornaEmprestimos(body: Record<string, any>) {

        const retorna = await Database
            .from('emprestimos')
            .select('id_pessoa', 'id_livro')
            .where('id_pessoa', body.id_pessoa)
            .where('id_livro', body.id_livro)

        return retorna
    }

    public async getEmprestimos(){
        const emprestimos = 
            await Database
            .from('emprestimos')
            .select('id_pessoa','id_livro','id_biblioteca','data_emprestimo')
        return{emprestimos}
    }

    public async devolver({params}: HttpContextContract){
        
        const deletado = 
            await Database 
            .from('emprestimos')
            .delete()
            .where('id_pessoa', params.id_pessoa)
            .where('id_livro', params.id_livro)

        if(deletado){
            return {
                resultado: "deletado"
            }
        }
        else{
            return{
                naoFunciona: "não deletado"
            }
        }

    }
}
