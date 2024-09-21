import { ObjectId } from "mongodb";
import { connectToMongoDB } from "../config/db.js";
import moment from "moment-timezone";

// Conecta ao banco e seleciona a coleção "clientes"
const db = await connectToMongoDB();
const collection = db.collection("clientes");

// Retorna todos os clientes cadastrados no banco de dados
export const getAllClients = async () => {
  return await collection.find({}).toArray();
};

// Retorna os detalhes de um cliente específico pelo ID
export const getClientById = async clientId => {
  if (!ObjectId.isValid(clientId)) {
    throw new Error("ID inválido");
  }

  return await collection.findOne({ _id: new ObjectId(clientId) });
};

// Cadastra um novo cliente no banco de dados
export const createClient = async ({ nome, telefone, email }) => {
  const newClient = {
    nome,
    telefone,
    email,
    data_cadastro: moment().tz("America/Sao_Paulo").format(),
  };

  const result = await collection.insertOne(newClient);

  return result.insertedId;
};

// Atualiza os dados de um cliente específico pelo ID
export const updateClientById = async (clientId, updateData) => {
  if (!ObjectId.isValid(clientId)) {
    throw new Error("ID Inválido");
  }

  const result = await collection.updateOne(
    { _id: new ObjectId(clientId) },
    { $set: updateData }
  );

  return result.modifiedCount > 0;
};

// Deleta um cliente específico pelo ID
export const deleteClientById = async clientId => {
  if (!ObjectId.isValid(clientId)) {
    throw new Error("ID inválido");
  }

  const result = await collection.deleteOne({
    _id: new ObjectId(clientId),
  });

  return result.deletedCount > 0;
};

export const interectWithChatGPT = async (clientId, message) => {};
