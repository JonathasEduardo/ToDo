// Importa o módulo responsável pela configuração e conexão com o banco de dados
const database = require("../database/connection");

// Classe que define o controlador para operações relacionadas a tarefas
class TaskController {
  // Método para criar uma nova tarefa
  novaTarefa(request, response) {
    // Extrai os dados da requisição (tarefa, descricao e responsavel) do corpo da solicitação
    const { tarefa, descricao, responsavel,status_tarefa } = request.body
 console.log("request.body ", request.body);
    

    // Exibe os dados no console para debug ou verificação
    console.log(tarefa, "\n", descricao, "\n", responsavel,"\n",status_tarefa);

    // Insere os dados da nova tarefa na tabela "tasks" do banco de dados
    database.insert({ tarefa, descricao, responsavel,status_tarefa }).table("tasks").then(data => {
      // Exibe os dados inseridos no console para debug ou verificação
      console.log(data);
      // Retorna uma resposta JSON indicando que a tarefa foi criada com sucesso
      response.json({ message: "Tarefa criada com sucesso!" })
    }).catch(error => {
      // Em caso de erro, exibe o erro no console para debug
      console.log(error);
    })
  }

  listarTarefas(request,response){
    database.select("*").table("tasks").then(tarefas =>{
      console.log(tarefas);
      response.json(tarefas);
    }).catch(error =>{
      console.log(error);
    })
  }


  listarUmaTarefa(request, response) {
    const id = parseInt(request.params.id);
  
    // Verifica se a tarefa existe antes de tentar listá-la
    database.select("*").table("tasks").where({ id })
      .then(tarefa => {
        if (!tarefa || tarefa.length === 0 || tarefa[0].id === null) {
          // A tarefa não existe ou é nula, retorne uma mensagem informando o usuário
          response.status(404).json({ message: "Tarefa não encontrada com o ID fornecido." });
        } else {
          // A tarefa existe, então você pode prosseguir com a listagem
          response.json(tarefa);
        }
      })
      .catch(error => {
        console.log(error);
        response.status(500).json({ error: "Erro ao listar a tarefa" });
      });
  }
  atualizarTarefa(request, response) {
    const id = parseInt(request.params.id);
    const { descricao, status_tarefa } = request.body;
  
    // Verifica se a tarefa com o ID existe antes de tentar atualizá-la
    database.select("*").from("tasks").where({ id }).then(tarefa => {
      if (!tarefa || tarefa.length === 0 || tarefa[0].id === null) {
        // A tarefa não existe ou é nula, retorne uma mensagem informando o usuário
        response.status(404).json({ message: "Tarefa não encontrada com o ID fornecido. A atualização não pode ser realizada." });
      } else {
        // A tarefa com o ID existe, então você pode prosseguir com a atualização
        database.where({ id }).update({ descricao, status_tarefa }).table("tasks").then(data => {
          response.json({ message: "Tarefa atualizada com sucesso !!" });
        }).catch(error => {
          console.log(error);
          response.status(500).json({ error: "Erro ao atualizar a tarefa" });
        });
      }
    }).catch(error => {
      console.log(error);
      response.status(500).json({ error: "Erro ao verificar a existência da tarefa com o ID" });
    });
  }

  removerTarefa(request, response) {
    const id = parseInt(request.params.id);
  
    // Verifica se a tarefa com o ID existe antes de tentar removê-la
    database.select("*").from("tasks").where({ id }).then(tarefa => {
      if (!tarefa || tarefa.length === 0 || tarefa[0].id === null) {
        // A tarefa não existe ou é nula, retorne uma mensagem informando o usuário
        response.status(404).json({ message: "Tarefa não encontrada com o ID fornecido." });
      } else {
        // A tarefa com o ID existe, então você pode prosseguir com a remoção
        database.where({ id }).del().table("tasks").then(data => {
          response.json({ message: "Tarefa removida com sucesso" });
        }).catch(error => {
          console.log(error);
          response.status(500).json({ error: "Erro ao remover a tarefa" });
        });
      }
    }).catch(error => {
      console.log(error);
      response.status(500).json({ error: "Erro ao verificar a existência da tarefa com o ID" });
    });
  }

pesquisarPorStatus(request, response) {
    const { status_tarefa } = request.params;

    // Utiliza o método 'where' para buscar tarefas pelo status
    database.select("*").table("tasks").where("status_tarefa", "like", `%${status_tarefa}%`).then(tarefas => {
      if (tarefas.length > 0) {
        response.json(tarefas);
      } else {
        response.json({ message: "Nenhuma tarefa encontrada com o status fornecido." });
      }
    }).catch(error => {
      console.log(error);
      response.status(500).json({ error: "Erro ao buscar tarefas pelo status" });
    })
}

pesquisarPorResponsavel(request, response) {
  const { responsavel } = request.params;

  database.select("*").table("tasks").where("responsavel", "like", `%${responsavel}%`).then(tarefas => {
    if (tarefas.length > 0) {
      response.json(tarefas);
    } else {
      response.json({ message: `Nenhuma tarefa encontrada com o responsável ${responsavel} fornecido.` });
    }
  }).catch(error => {
    console.log(error);
    response.status(500).json({ error: "Erro ao buscar tarefas pelo responsável" });
  });
}



}

// Exporta uma instância da classe TaskController para uso em outros módulos
module.exports = new TaskController();
