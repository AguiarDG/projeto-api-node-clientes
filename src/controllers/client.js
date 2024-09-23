import moment from "moment-timezone";
import { ObjectId } from "mongodb";
import OpenAI from "openai";
import * as clientService from "../services/clientService.js";
import {
  createClientSchema,
  updateClientSchema,
} from "../validations/clientValidation.js";

/**
 * Retorna todos os clientes cadastrados no banco de dados
 *
 * @param {Object} _ - Objeto de requisição (não foi necessario neste caso)
 * @param {Object} res - Objeto de resposta Express
 * @returns {Promise<Object>} - Lista de clientes com status 200
 */
export const getClients = async (_, res) => {
  // Retorna todos os clientes cadastrados no banco de dados
  try {
    const clients = await clientService.getAllClients();
    res.status(200).json({ success: true, clients });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Erro ao buscar clientes." });
  }
};

/**
 * Retorna um cliente específico pelo ID fornecido na URL
 *
 * @param {Object} req - Objeto de requisição Express
 * @param {string} req.params.id - ID do cliente a ser buscado
 * @param {Object} res - Objeto de resposta Express
 * @returns {Promise<Object>} - Cliente encontrado ou erro 404 se não for encontrado
 */
export const getClient = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o cliente existe no banco de dados
    const client = await clientService.getClientById(id);

    if (!client) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    return res.status(200).json({ success: true, client });
  } catch (error) {
    console.error("Erro ao encontrar cliente por ID:", error);
    return res.status(500).json({ message: "Erro ao encontrar cliente." });
  }
};

/**
 * Função para adicionar um novo cliente no banco de dados
 *
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} req.body - Dados do cliente a ser criado
 * @param {string} req.body.nome - Nome do cliente
 * @param {string} req.body.telefone - Telefone do cliente
 * @param {string} req.body.email - Email do cliente
 * @param {Object} res - Objeto de resposta Express
 * @returns {Promise<Object>} - Mensagem de sucesso e ID do cliente criado ou erro
 */
export const createClient = async (req, res) => {
  try {
    const { _id, nome, telefone, email } = req.body;

    // Verifica se todos os campos foram fornecidos
    await createClientSchema.validate(
      { nome, telefone, email },
      { abortEarly: false }
    );

    const fields = {
      nome,
      telefone,
      email,
    };

    if (_id) {
      fields._id = _id;
    }

    // Cria o novo cliente no banco de dados
    const clientId = await clientService.createClient(fields);

    return res.status(201).json({
      message: "Cliente cadastrado com sucesso!",
      id: clientId,
    });
  } catch (error) {
    console.error("Erro ao cadastrar cliente: \n", error.errors ?? error);
    return res.status(400).json({
      message: "Erro ao cadastrar cliente.",
      errors: error.errors ?? "",
    });
  }
};

/**
 * Função para atualizar as informações de um cliente existente
 *
 * @param {Object} req - Objeto de requisição Express
 * @param {string} req.params.id - ID do cliente a ser atualizado
 * @param {Object} req.body - Dados atualizados do cliente
 * @param {string} req.body.nome - Nome do cliente
 * @param {string} req.body.telefone - Telefone do cliente
 * @param {string} req.body.email - Email do cliente
 * @param {Object} res - Objeto de resposta Express
 * @returns {Promise<Object>} - Mensagem de sucesso ou erro
 */
export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, email } = req.body;

    // Varifica se é um ID valido
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    // Verifica se pelo menos um campo foi fornecido para atualização
    updateClientSchema.validate(
      { nome, telefone, email },
      { abortEarly: false }
    );

    // Atualiza o cliente no banco de dados
    const isUpdated = await clientService.updateClientById(id, {
      nome,
      telefone,
      email,
    });

    if (!isUpdated) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    return res.status(200).json({ message: "Cliente atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error.errors ?? error);
    return res.status(400).json({
      message: "Erro ao atualizar cliente.",
      errors: error.errors ?? "",
    });
  }
};

/**
 * Função para deletar um cliente existente do banco de dados
 * @param {Object} req - Objeto de requisição Express
 * @param {string} req.params.id - ID do cliente a ser deletado
 * @param {Object} res - Objeto de resposta Express
 * @returns {Promise<Object>} - Mensagem de sucesso ou erro
 */
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o ID é válido
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    // Remove o cliente do banco de dados
    const isDeleted = await clientService.deleteClientById(id);

    if (!isDeleted) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    return res.status(200).json({ message: "Cliente deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar cliente:", error.errors ?? error);
    return res.status(500).json({ message: "Erro ao deletar cliente." });
  }
};

/**
 * Interage com o ChatGPT para obter uma resposta e armazena a interação no banco de dados
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} req.body - Dados da requisição
 * @param {string} req.body.id - ID do cliente que está interagindo
 * @param {string} req.body.message - Mensagem enviada pelo cliente
 * @param {Object} res - Objeto de resposta Express
 * @returns {Promise<Object>} - Resposta do ChatGPT ou erro
 */
export const interactionWithChatGPT = async (req, res) => {
  try {
    const { id, message } = req.body;

    if (!id || !message) {
      return res.status(400).json({
        message: "É necessário fornecer o id do cliente e a mensagem",
      });
    }

    // Verifica se o cliente existe no banco de dados
    const client = await clientService.getClientById(id);

    if (!client) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    // Utiliza o ChatGPT para responder à mensagem do cliente
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
    });

    const resposta = response.choices[0].message.content;

    // Atualiza o cliente com a nova interação no banco de dados
    const updatedClient = await clientService.updateClientById(id, {
      interacoes: {
        mensagem: message,
        resposta,
        data: moment().tz("America/Sao_Paulo").format(),
      },
    });

    return res.status(200).json({ client: id, response: resposta });
  } catch (error) {
    console.error("Erro ao interagir com ChatGPT ou MongoDB:\n", error);
    return res
      .status(500)
      .json({ message: "Erro com a integração com o ChatGPT." });
  }
};
