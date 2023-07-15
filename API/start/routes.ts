/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


//achei legal :)
Route.get('/',async () => {return{hello:'world'}})



Route.get('/bibliotecas/biblioteca_livros/:id_biblioteca', 'BibliotecasController.listaDisponiveis')

Route.post('/bibliotecas/biblioteca_livros', 'BibliotecasController.addBibliotecaLivro')

Route.put('/bibliotecas/biblioteca_livros', 'BibliotecasController.transfere')


Route.post('/pessoas/emprestimo', 'PessoasController.emprestar')

Route.get('/pessoas/emprestimo', 'PessoasController.getEmprestimos')

Route.delete('/pessoas/emprestimo/:id_pessoa/:id_livro','PessoasController.devolver')



//Esse apiOnly permite que seja acessados apenas os metodos de Api
Route.resource('/pessoas', 'PessoasController').apiOnly()

Route.resource('/livros', 'LivrosController').apiOnly()

Route.resource('/bibliotecas', 'BibliotecasController').apiOnly()



