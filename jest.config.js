export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src/tests"],
  moduleFileExtensions: ["ts", "js", "json"],
  clearMocks: true,
};
