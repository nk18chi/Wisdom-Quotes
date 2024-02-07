module.exports = {
  preset: 'ts-jest',
  globalSetup: '<rootDir>/src/jest.globalSetup.ts',
  globalTeardown: '<rootDir>/src/jest.globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/src/jest.setupFile.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  moduleFileExtensions: ['js', 'tsx', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  coverageDirectory: './coverage',
  roots: ['<rootDir>/src/'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        isolatedModules: true,
      },
    ],
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
};
