const connection = require("../database/connection.js");
const express = require('express');
const router = express.Router();
const TaskController = require("../controllers/TaskController.js");

router.post("/novaTarefa", TaskController.novaTarefa);
router.get("/tarefas",TaskController.listarTarefas);
router.get("/tarefa/:id",TaskController.listarUmaTarefa);
router.get("/tarefas/status/:status_tarefa",TaskController.pesquisarPorStatus);
router.get("/tarefas/responsavel/:responsavel",TaskController.pesquisarPorResponsavel);
router.put("/atualizar/tarefa/:id", TaskController.atualizarTarefa);
router.delete("/deletar/tarefa/:id", TaskController.removerTarefa);

module.exports = router;
