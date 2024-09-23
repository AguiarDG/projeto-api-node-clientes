import express from "express";
import {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  interactionWithChatGPT,
} from "../controllers/client.js";

const clientsRouter = express.Router();

/**
 * Rota para obter a lista de todos os clientes.
 * Método: GET
 * Endpoint: /clients
 * Retorna: Lista de todos os clientes cadastrados.
 */
clientsRouter.get("/clients", getClients);

/**
 * Rota para obter os detalhes de um cliente específico.
 * Método: GET
 * Endpoint: /clients/:id
 * Parâmetro: id - O ID do cliente a ser buscado.
 * Retorna: Dados do cliente especificado.
 */
clientsRouter.get("/clients/:id", getClient);

/**
 * Rota para adicionar um novo cliente.
 * Método: POST
 * Endpoint: /clients/
 * Corpo da requisição: Dados do cliente a ser adicionado (nome, telefone, email).
 * Retorna: Sucesso ou erro ao adicionar o cliente.
 */
clientsRouter.post("/clients/", createClient);

/**
 * Rota para atualizar os dados de um cliente específico.
 * Método: PUT
 * Endpoint: /clients/:id
 * Parâmetro: id - O ID do cliente a ser atualizado.
 * Corpo da requisição: Novos dados do cliente.
 * Retorna: Sucesso ou erro ao atualizar o cliente.
 */
clientsRouter.put("/clients/:id", updateClient);

/**
 * Rota para deletar um cliente específico.
 * Método: DELETE
 * Endpoint: /clients/:id
 * Parâmetro: id - O ID do cliente a ser deletado.
 * Retorna: Sucesso ou erro ao deletar o cliente.
 */
clientsRouter.delete("/clients/:id", deleteClient);

/**
 * Rota para interagir com a integração com o ChatGPT
 * Método: POST
 * Endpoint: /clients/chatgpt
 * Corpo da requisição: ID do cliente que vai utilizar a integração e a mensagem que será enviada.
 * Retorna: Sucesso ou erro ao deletar o cliente.
 */
clientsRouter.post("/clients/chatgpt", interactionWithChatGPT);

export default clientsRouter;
