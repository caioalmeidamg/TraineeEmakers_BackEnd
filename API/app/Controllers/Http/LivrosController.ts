import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Livro from 'App/Models/Livro'


export default class LivrosController {
    public async store({request, response}: HttpContextContract){
        const body = request.body()
 
        const livro = await Livro.create(body)
 
        response.status(201);
        
        return{
         message: "deu bom",
         data: livro,
        }
     }



}
