/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "dist"],
  testTimeout: 10_000,
  bail: 5,
  transform: {
    "^.+\\.(t)sx?$": ["ts-jest"],
  },
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^test/(.*)$": "<rootDir>/test/$1",
  },
};
