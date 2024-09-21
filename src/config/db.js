import { MongoClient } from "mongodb";

let dbConnection;

// Conecta ao MongoDB e retorna a referência do banco de dados
export const connectToMongoDB = async () => {
  if (dbConnection) {
    console.log("Já conectado ao MongoDB.");
    return dbConnection;
  }

  try {
    const mongoData = new MongoClient(process.env.MONGO_URI);

    await mongoData.connect();
    dbConnection = mongoData.db("db"); // substitua pelo nome do seu banco de dados
    console.log("Conectado ao MongoDB.");

    return dbConnection;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    throw error;
  }
};
