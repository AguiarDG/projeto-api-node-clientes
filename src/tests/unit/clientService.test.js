import { ObjectId, MongoClient } from "mongodb";
import { connectToMongoDB, connectToMongoDBTest } from "../../config/db.js";
import * as clientService from "../../services/clientService.js";
import { expect, jest, test } from "@jest/globals";
import moment from "moment-timezone";
import {
  mockClientsData,
  mockClientData,
  mockClientsResponse,
} from "../mockData.js";

jest.mock("../../services/clientService.js");

describe("Testes do Serviço Cliente", () => {
  let connection;
  let db;
  let collection;

  beforeAll(async () => {
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste

    connection = await MongoClient.connect(process.env.MONGODB_URI);

    db = connection.db(process.env.MONGODB_DB);

    collection = db.collection("clientes");
  });

  beforeEach(async () => {
    await collection.deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Deve retornar uma lista de clientes", async () => {
    await collection.insertMany(mockClientsData);

    // Chama o método que retorna uma lista de clientes
    const clients = await clientService.getAllClients(collection);

    expect(clients).toEqual(mockClientsData);
    expect(clients).toHaveLength(2);
  });

  it("Deve buscar um cliente por ID", async () => {
    await collection.insertOne(mockClientData);

    const client = await clientService.getClientById(mockClientData._id);

    expect(client).toEqual(mockClientData);
    expect(client._id).toEqual(mockClientData._id);
  });

  it("Deve retornar null se o cliente não for encontrado", async () => {
    const client = await clientService.getClientById(new ObjectId());

    // Verifica se o cliente não foi encontrado
    expect(client).toBeNull();
  });

  it("Deve cadastrar um novo cliente", async () => {
    // Chama o serviço createClient
    const insertedId = await clientService.createClient(mockClientData);

    // Verifica se o ID foi retornado
    expect(insertedId).toBeDefined();
    expect(insertedId).toBeInstanceOf(ObjectId);

    // Verifica se o cliente foi inserido corretamente no banco de dados
    const insertedClient = await collection.findOne({ _id: insertedId });

    expect(insertedClient).toBeDefined();
    expect(insertedClient.nome).toBe(mockClientData.nome);
    expect(insertedClient.telefone).toBe(mockClientData.telefone);
    expect(insertedClient.email).toBe(mockClientData.email);
    expect(insertedClient.data_cadastro).toBe(
      moment().tz("America/Sao_Paulo").format()
    );
  });

  it("Deve atualizar os dados de um cliente", async () => {
    const insertedId = await clientService.createClient(
      mockClientData,
      collection
    );

    const mockUpdateData = {
      nome: "Cliente Atualizado",
      telefone: "12777777777",
      email: "email_cliente_atualizado@example.com",
      data_cadastro: moment().tz("America/Sao_Paulo").format(),
    };

    const clientUpdated = await clientService.updateClientById(
      insertedId,
      mockUpdateData,
      collection
    );

    // Busca o cliente atualizado
    const updatedClient = await collection.findOne({ _id: insertedId });

    // Verifica se a atualização ocorreu corretamente
    expect(clientUpdated).toBe(true);
    expect(updatedClient.nome).toBe(mockUpdateData.nome);
    expect(updatedClient.telefone).toBe(mockUpdateData.telefone);
    expect(updatedClient.email).toBe(mockUpdateData.email);
  });

  it("Deve retornar false se o cliente não for encontrado", async () => {
    const invalidId = "60c72b2f9b1d4c3f4d4f4f4f"; // ID inválido
    const updatedData = {
      nome: "Cliente Atualizado",
      telefone: "11888888888",
      email: "cliente_atualizado@example.com",
      data_cadastro: moment().tz("America/Sao_Paulo").format(),
    };

    // Tenta atualizar o cliente pelo ID inválido
    const wasUpdated = await clientService.updateClientById(
      invalidId,
      updatedData,
      collection
    );

    // Verifica que a atualização não ocorreu
    expect(wasUpdated).toBe(false);
  });

  it("Deve deletar um cliente e retornar true", async () => {
    const insertedId = await clientService.createClient(
      mockClientData,
      collection
    );

    // Deleta o cliente pelo ID
    const wasDeleted = await clientService.deleteClientById(
      insertedId,
      collection
    );

    // Tenta buscar o cliente deletado
    const deletedClient = await collection.findOne({ _id: insertedId });

    // Verifica se o cliente foi realmente deletado
    expect(wasDeleted).toBe(true);
    expect(deletedClient).toBeNull();
  });

  it("Deve retornar false se o cliente não for encontrado para ser deletado", async () => {
    const invalidId = "60c72b2f9b1d4c3f4d4f4f4f"; // ID inválido

    // Tenta deletar o cliente pelo ID inválido
    const wasDeleted = await clientService.deleteClientById(
      invalidId,
      collection
    );

    // Verifica que a deleção não ocorreu
    expect(wasDeleted).toBe(false);
  });
});
