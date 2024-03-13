/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      // ts-jest specific configuration here
    }],
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/" // Ignore compiled files in dist directory
  ],
  // Additional configuration options as needed
};
