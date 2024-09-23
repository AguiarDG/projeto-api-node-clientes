import { MongoClient } from "mongodb";

let dbConnection;

// Conecta ao MongoDB e retorna a referência do banco de dados
export const connectToMongoDB = async () => {
  try {
    if (!dbConnection) {
      const mongoData = new MongoClient(process.env.MONGODB_URI);

      await mongoData.connect();
      dbConnection = mongoData.db(process.env.MONGODB_DB);
      console.log("Conectado ao MongoDB.");
    }
    return dbConnection;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    throw error;
  }
};

export const connectToMongoDBTest = async () => {
  try {
    if (!dbConnection) {
      const mongoData = new MongoClient(process.env.MONGODB_URI_TEST);

      await mongoData.connect();
      dbConnection = mongoData.db(process.env.MONGODB_DB_TEST);
      console.log("Conectado ao MongoDBTest.");
    }
    return dbConnection;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDBTest:", error);
    throw error;
  }
};
