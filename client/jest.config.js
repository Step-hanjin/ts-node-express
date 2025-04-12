module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
      "^react-router-dom$": "<rootDir>/node_modules/react-router-dom"
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // optional
  };