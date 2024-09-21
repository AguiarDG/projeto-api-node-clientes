import { object, string } from "yup";

// Validação para criar um novo cliente
export const createClientSchema = object().shape({
  nome: string().required("O nome é obrigatório"),
  telefone: string()
    .matches(/^[0-9]{10,15}$/, "O telefone deve conter entre 10 e 15 dígitos")
    .required("O telefone é obrigatório"),
  email: string().email().required("O email é obrigatório"),
});

// Validação para atualizar um cliente
export const updateClientSchema = object()
  .shape({
    nome: string().min(3),
    telefone: string().length(15),
    email: string().email(),
  })
  .test(
    "at-least-one",
    "Você deve informar pelo menos um campo para atualizar o registro.",
    value => !!(value.nome || value.email || value.telefone)
  );
