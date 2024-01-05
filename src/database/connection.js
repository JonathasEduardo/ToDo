// Importa o módulo 'knex'
let knex = require('knex')({
  // Especifica o cliente de banco de dados como MySQL
  client: 'mysql2',
  // Configuração da conexão com o banco de dados
  connection: {
      // Host do banco de dados (por padrão localhost)
      host : 'localhost',
      // Nome de usuário para autenticação (por padrão root)
      user : 'root',
      // Senha para autenticação (substitua pela sua senha definida)
      password : 'Jonathas2001',
      // Nome do banco de dados criado (substitua pelo nome do seu banco)
      database : 'todo'
  }
});
// Exporta a configuração do knex para uso em outros módulos
module.exports = knex;