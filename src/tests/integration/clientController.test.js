import request from "supertest";
import app from "../../../index.js";
import { expect, jest, test } from "@jest/globals";
import * as clientService from "../../services/clientService.js";
import {
  mockClientsData,
  mockClientData,
  mockClientsResponse,
  mockClientResponse,
} from "../mockData.js";
import { MongoClient } from "mongodb";
import moment from "moment-timezone";

// Mock do serviço para isolar o comportamento do controller
jest.mock("../../services/clientService");

describe("Testes API ClientController", () => {
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

  describe("GET /api/clients", () => {
    it("Deve retornar todos os clientes com sucesso", async () => {
      await collection.insertMany(mockClientsData);

      const response = await request(app).get("/api/clients").expect(200);

      expect(response.body).toHaveProperty("success", true);
      expect(response.body.clients).toEqual(mockClientsResponse);
    });

    // it("deve retornar erro 500 se ocorrer um erro no serviço", async () => {
    //   clientService.getAllClients.mockRejectedValue(
    //     new Error("Erro ao buscar clientes")
    //   );

    //   const response = await request(app).get("/api/clients").expect(500);

    //   expect(response.body).toHaveProperty(
    //     "message",
    //     "Erro ao buscar clientes."
    //   );
    // });
  });

  describe("GET /api/clients/:id", () => {
    it("Deve retornar os detalhes de um cliente específico", async () => {
      await collection.insertMany(mockClientsData);

      const response = await request(app)
        .get("/api/clients/66ec6bc8a200609b66d0c713")
        .expect(200);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("success");
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("client");
    });
  });

  describe("POST /clients", () => {
    it("Deve criar um novo cliente", async () => {
      const response = await request(app)
        .post("/api/clients")
        .send(mockClientData)
        .expect(201);

      expect(response.body).toHaveProperty(
        "message",
        "Cliente cadastrado com sucesso!"
      );
      expect(response.body).toHaveProperty("id", mockClientResponse._id);
    });

    it("Deve retornar erro 400 se os dados forem invalidos", async () => {
      const invalidClient = {
        nome: "Cliente Exemplo Invalido",
        telefone: "",
        email: "cliente.exemplo.invalido@exemplo.com",
      };

      const response = await request(app)
        .post("/api/clients")
        .send(invalidClient)
        .expect(400);

      expect(response.body).toHaveProperty(
        "message",
        "Erro ao cadastrar cliente."
      );
      expect(response.body.errors.length).toBeGreaterThan(0);
    });

    // it("Deve retornar erro  500 se houver um erro interno no servidor", async () => {
    //   clientService.createClient.mockRejectedValue(
    //     new Error("Erro ao salvar no banco")
    //   );

    //   const validClient = {
    //     nome: "Cliente Exemplo",
    //     telefone: "11999999999",
    //     email: "cliente@exemplo.com",
    //   };

    //   const response = await request(app)
    //     .post("/clients")
    //     .send(validClient)
    //     .expect(500);

    //   // Verificações
    //   expect(response.body).toHaveProperty(
    //     "message",
    //     "Erro ao cadastrar cliente."
    //   );
    // });

    it("Deve atualizar um cliente", async () => {
      await collection.insertMany(mockClientsData);

      const response = await request(app)
        .put("/api/clients/66ec6bc8a200609b66d0c713")
        .send({
          nome: "Cliente Atualizado",
          telefone: "12777777777",
          email: "email_cliente_atualizado@example.com",
          data_cadastro: moment().tz("America/Sao_Paulo").format(),
        });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
    });

    it("Deve retornar um erro 404 quando tentar atualizar um cliente inexistente", async () => {
      const response = await request(app)
        .put("/api/clients/66ec6bc8a200609b66d0c719")
        .send({
          nome: "Teste Atualizado",
          telefone: "9876543210",
          email: "teste@teste.com",
        });
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
    });

    it("Deve deletar um cliente", async () => {
      await collection.insertMany(mockClientsData);

      const response = await request(app).delete(
        "/api/clients/66ec6bc8a200609b66d0c713"
      );
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
    });

    it("Deve retornar um erro 404 quando tentar deletar um cliente inexistente", async () => {
      const response = await request(app).delete(
        "/api/clients/66ec6bc8a200609b66d0c719"
      );
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
    });
  });
});
