import cors from "cors";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";

// Função para configurar middlewares
export const configureMiddlewares = app => {
  // Middleware para converter o corpo das requisições em formato JSON
  app.use(express.json());

  // Middleware para sanitizar dados de entrada
  app.use(mongoSanitize());

  // Middleware para permitir requisições de diferentes origens (CORS)
  app.use(cors());
};
