import "dotenv/config"; // Carrega as variaveis de ambiente
import express from "express";
import clientRoutes from "./src/routes/clients.js";
import { configureMiddlewares } from "./src/config/middlewares.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Função de configuração dos Middlewares
configureMiddlewares(app);

// Configuração das rotas para os clientes
app.use("/api/", clientRoutes);

// Inicia o servidor na porta 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
