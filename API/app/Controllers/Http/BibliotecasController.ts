import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Biblioteca from 'App/Models/Biblioteca'
import Database from '@ioc:Adonis/Lucid/Database'
import BibliotecaLivro from 'App/Models/BibliotecaLivro'

export default class BibliotecasController {

    //Operações de CRUD ----------------------------------------------------------------
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

    //INICIO FUNÇÕES biblioteca_livro -------------------------------------------------


    //adiciona relação biblioteca_livros 
    public async addBibliotecaLivro({request}:HttpContextContract){
        //Considero que vou passar um json
        const body = request.body()
        const teste = await this.retornaValores(body)
        
        //Se já houver essa relação não inseri
        if(teste.length != 0){
             return {
                 falhou: "Emprestimo ja existente",
                 teste
             }
        }
        //caso contrario faz a inserção
        else{
             await BibliotecaLivro.create(body)
             return{
             retorno: "funciona"
             }
     
         }
        
        
        
     }
    
    //Passa a biblioteca por parametro e retorna os livros disponiveis dela 
    public async listaDisponiveis({params}:HttpContextContract){                
             
       const retorno = 
            await Database
            .from('biblioteca_livros')
            .select('id_biblioteca','id_livro')
            .where('id_biblioteca',params.id_biblioteca)
            .where('quant_livros','>',0);

       if(retorno.length > 0){
            return {
                falhou: "funciona",
                retorno
            }
       }
       else{        
            return{
            retorno: "Biblioteca sem livros disponiveis"
            }
    
        }     
     

                   
    } 

    //recebe request retorna se houver tais valores no banco 
    private async retornaValores(body: Record<string, any>){      
 
         const retorna =  
            await Database
            .from('biblioteca_livros')
            .select('id_biblioteca','id_livro')
            .where('id_biblioteca',body.id_biblioteca)
            .where('id_livro',body.id_livro)
       
         return retorna
    }

}
