import moment from "moment-timezone";
import { ObjectId } from "mongodb";

export const mockClientsData = [
  {
    _id: new ObjectId("66ec6bc8a200609b66d0c713"),
    nome: "Cliente 1",
    telefone: "11999999999",
    email: "cliente1@example.com",
    data_cadastro: moment().tz("America/Sao_Paulo").format(),
  },
  {
    _id: new ObjectId("66ec6bc8a200609b66d0c714"),
    nome: "Cliente 2",
    telefone: "11888888888",
    email: "cliente2@example.com",
    data_cadastro: moment().tz("America/Sao_Paulo").format(),
  },
];

export const mockClientsResponse = [
  {
    _id: "66ec6bc8a200609b66d0c713",
    nome: "Cliente 1",
    telefone: "11999999999",
    email: "cliente1@example.com",
    data_cadastro: moment().tz("America/Sao_Paulo").format(),
  },
  {
    _id: "66ec6bc8a200609b66d0c714",
    nome: "Cliente 2",
    telefone: "11888888888",
    email: "cliente2@example.com",
    data_cadastro: moment().tz("America/Sao_Paulo").format(),
  },
];

export const mockClientData = {
  _id: new ObjectId("66ec6bc8a200609b66d0c715"),
  nome: "Novo cliente",
  telefone: "12888888888",
  email: "novocliente@example.com",
  data_cadastro: moment().tz("America/Sao_Paulo").format(),
};

export const mockClientResponse = {
  _id: "66ec6bc8a200609b66d0c715",
  nome: "Novo cliente",
  telefone: "12888888888",
  email: "novocliente@example.com",
  data_cadastro: moment().tz("America/Sao_Paulo").format(),
};
