# TraineeEmakers_BackEnd
Aluno: Caio Almeida Santos | Universidade Federal de Lavras

Projeto criado para o Trainee da Emakers Jr na rota de back-end
## Api Rest usando Adonis.js para um sistema de biblioteca 

Para executar corretamente Essa Api

  * Execute as migrations 
  
  * Execute o arquivo "Triggers.sql" que irá configurar os triggres
 
 LEMBRE-se: Sempre que executar um "migration:rollback", os triggers serão apagados.
 
## Tasks 
A tarefa é criar uma Api-Rest utilizando o framework Adonis, nesta aplicação será necessário criar um crud para livro, biblioteca e pessoa. 

As relações serão: 
uma pessoa pode pegar emprestado um livro, um livro pode ser de uma biblioteca, quando o livro não estiver emprestado 
ele fica disponível para empréstimo, quando o livro for devolvido ele ficará disponível para empréstimo.

### Requisitos do sistema

* O sistema deverá conter estes requisitos mínimos:
* Aplicação base em Adonis
* Código mantido no GitHub
* Crud livro
* Crud biblioteca
* Crud pessoa
* Relação de pessoa para livro
* Relação de livro para biblioteca
* Função de listar os livros disponíveis de uma biblioteca
* Função de uma pessoa pegar livro emprestado
* Função de uma pessoa devolver o livro emprestado
* Função de um livro ser transferido de uma biblioteca para outra

Observações:
Após criar a aplicação base envie o código para o github e sempre que implementar alguma tarefa suba o código para que possamos acompanhar o andamento. 
As funções listadas nos requisitos mínimos podem ser implementadas utilizando a função PUT porém com as características da tarefa.
