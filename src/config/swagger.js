import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swagger.json" with { type: "json" };

const setupSwaggerDocs = app => {
  const replacePlaceholders = (swaggerJson, envVars) => {
    let jsonStr = JSON.stringify(swaggerJson);
    for (const [key, value] of Object.entries(envVars)) {
      jsonStr = jsonStr.replace(new RegExp(`\\$\\{${key}\\}`, "g"), value);
    }
    return JSON.parse(jsonStr);
  };

  const swaggerWithEnv = replacePlaceholders(swaggerOptions, {
    BASE_URL: process.env.BASE_URL,
  });
  // Define a rota /api-docs para acessar o Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerWithEnv));
};

export default setupSwaggerDocs;
