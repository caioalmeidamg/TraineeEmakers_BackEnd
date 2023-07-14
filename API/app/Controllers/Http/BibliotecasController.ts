import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Biblioteca from 'App/Models/Biblioteca'


export default class BibliotecasController {

    //Create
    public async store({request, response}: HttpContextContract){
        const body = request.body()
        
        //É criado uma biblioteca e inserida no banco de dados
        const biblioteca = await Biblioteca.create(body)
        
        return response.status(201).json(biblioteca)
    }

    //Get all
    public async index() {
        //const body = request.body()

        const bibliotecas = await Biblioteca.all()

        //retorna um array de objetos 
        return {
            bibliotecas
        }

    }
    
    //Get com parametro
    public async show({params}: HttpContextContract){
        const biblioteca = await Biblioteca.findOrFail(params.id)

        return{
            biblioteca
        }
    }

     //Update em tudo 
    public async update ({ params, request, response }: HttpContextContract) {
        //Pega o id passado por parametro
        const bibliotecaId = params.id

        //Pega a requisição feita
        const data = request.only(['nome'])
        
        //Pega a biblioteca que possui o mesmo id
        const biblioteca = await Biblioteca.findOrFail(bibliotecaId)
        
        //Faz um merge dos dados
        biblioteca.merge(data)
        await biblioteca.save()
    
        return response.status(200).json(biblioteca)
    }

    //Delete 
    public async destroy({params}: HttpContextContract){

        //Procura o livro especifico
        const biblioteca = await Biblioteca.findOrFail(params.id)
        
        await biblioteca.delete()

        return{
            message: "Excluido",            
        }
    }
}
