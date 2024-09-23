export default {
  testEnvironment: "node",
  verbose: true,
  moduleFileExtensions: ["js", "json"],
  transform: {},
  setupFiles: ["dotenv/config"],
  preset: "@shelf/jest-mongodb",
};
