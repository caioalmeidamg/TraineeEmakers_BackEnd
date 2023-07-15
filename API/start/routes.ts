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


//Rotas de biblioteca_livros -----------------------------------------------------------------------

//listar livros disponiveis em biblioteca passada por parametro
Route.get('/bibliotecas/biblioteca_livros/:id_biblioteca', 'BibliotecasController.listaDisponiveis')

//Adicionar elemento na relação biblioteca_livros
Route.post('/bibliotecas/biblioteca_livros', 'BibliotecasController.addBibliotecaLivro')

//Transferir elemento de uma biblioteca pra outra
Route.put('/bibliotecas/biblioteca_livros', 'BibliotecasController.transfere')
// ------------------------------------------------------------------------------------------------

//Rotas de emprestimos ----------------------------------------------------------------------------

//Adicionar elemento em Emprestimo
Route.post('/pessoas/emprestimo', 'PessoasController.emprestar')

//Ver todos os emprestimos -> criei pra debuggar mas vai que é útil
Route.get('/pessoas/emprestimo', 'PessoasController.getEmprestimos')

//Devolve o livro emprestado
Route.delete('/pessoas/emprestimo/:id_pessoa/:id_livro','PessoasController.devolver')
//------------------------------------------------------------------------------------------------


//Rotas do CRUD ----------------------------------------------------------------------------------
Route.resource('/pessoas', 'PessoasController').apiOnly()

Route.resource('/livros', 'LivrosController').apiOnly()

Route.resource('/bibliotecas', 'BibliotecasController').apiOnly()



