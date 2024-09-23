import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swagger.json" with { type: "json" };

const setupSwaggerDocs = app => {
  // Define a rota /api-docs para acessar o Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
};

export default setupSwaggerDocs;
