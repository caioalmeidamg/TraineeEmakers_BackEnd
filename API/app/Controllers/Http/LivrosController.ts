import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {v4 as uuidv4} from "uuid"
import Livro from 'App/Models/Livro'
import Application  from "@ioc:Adonis/Core/Application"
import Drive from '@ioc:Adonis/Core/Drive'


export default class LivrosController {
    private validationOptions = {
        types: ['image'],
        size: '2mb',
    }
    
    //Para guardar um livro 
    public async store({request, response}: HttpContextContract){
       
        //Pega  o corpo da requisição
        const body = request.body()
        
        //cria um const imagem para trata-la 
        const image = request.file('capa', this.validationOptions)
        
        //Sea imagem foi criada
        if(image){

            //Define um nome pra imagem
            const imageName = `${uuidv4()}.${image.extname}`

            //Move ela pra o arquivo de templates tmp/uploads
            await image.move(Application.tmpPath('uploads'), {
                name: imageName
            })
            
            //define o nome a ser gravado
            body.capa = imageName
            const livro = await Livro.create(body)
            return response.status(201).json(livro)        
            
        }
        else{
            //Se a imagem for muito grande responde o status http referente
            return response.status(413)
        }
        
        
    }

    //Resgatar Livros - Select sem where 
    public async index(){
       
        const livros = await Livro.all()       
        return {
            livros
        }
    }

    //get com parametro
    public async show({params}: HttpContextContract){
        const livros = await Livro.findOrFail(params.id)

        
        return{
            livros
        }
    }

    //Delete de livros
    public async destroy({params}: HttpContextContract){

        //Procura o livro especifico
        const livros = await Livro.findOrFail(params.id)
        //Pega o nome do livro
        const templatePath = `${livros.capa}`;

        //se existir a capa do livro 
        if(await Drive.exists(templatePath)){
            await Drive.delete(templatePath)
            await livros.delete()

            return{
            message: "Excluido",
            result: templatePath,
            data: livros
            }
        }
        
    }

    public async teste(){
        return{
            teste: "ok"
        }
    }
   
    
    public async update({params,request}: HttpContextContract){
        const body = request.body()
        const livros = await Livro.findOrFail(params.id)

        //Faz update do nome do autor e do nome do Livro
        livros.autor = body.autor
        livros.nome = body.nome

        const capaNova = request.file('capa', this.validationOptions)

        //Se conseguiu criar a capa nova
        if(capaNova){
            //Cria um nome pra capa nova
            const nomeCapaNova = `${uuidv4()}.${capaNova.extname}`
            const nomeCapaVelha = `${livros.capa}`;

            //Passa a capa nova com novo nome pra uploads
            await capaNova.move(Application.tmpPath('uploads'), {
                name: nomeCapaNova
            })

            if(await Drive.exists(nomeCapaVelha)){
                await Drive.delete(nomeCapaVelha)
            }

            livros.capa = nomeCapaNova
            await livros.save()
            return{
                retorno: "deu certo"
            }
        }    
        return{
            retorno: "deu errado"
        }
        
    }

    public async listarDisponiveis() {
        return {
            retorno: "show de bola",
        }

    }
}
