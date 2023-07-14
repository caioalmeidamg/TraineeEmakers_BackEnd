//HttpContext possui todos os parametros de requisição - tudo que é enviado da requisição
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pessoa from 'App/Models/Pessoa'

export default class PessoasController {
    /* Anotações
     | Operações com bancos de dados são realizadas de forma assincrona
     | ->  
     | body = corpo de requisição -> dados que ficam no banco
     | response = envia dados*/
     
    //Create - Funciona 
    public async store({request, response}: HttpContextContract){
       const body = request.body()
       
       //É criado uma pessoa e inserida no banco de dados
       const pessoa = await Pessoa.create(body)
       
       return response.status(201).json(pessoa)
    }

    //Basicamente um get de tudo - Funciona
    public async index() {
        //const body = request.body()

        const pessoas = await Pessoa.all()

        //retorna um array de objetos 
        return {pessoas}

    }
    
    //Get com parametro - Funciona
    public async show({params}: HttpContextContract){
        const pessoas = await Pessoa.findOrFail(params.id)

        return{
            pessoas
        }
    }

    //Update em tudo - Funciona
    public async update ({ params, request, response }: HttpContextContract) {
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
    public async destroy({params}: HttpContextContract){

        //Procura o livro especifico
        const pessoas = await Pessoa.findOrFail(params.id)
        
        await pessoas.delete()

        return{
            message: "Excluido",            
        }
    }
        

    


    
}
