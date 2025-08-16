export default {
  preset: 'ts-jest/presets/default',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: [
    '**/tests/**/*.test.ts',
    '**/tests/**/*.spec.ts',
    '**/__tests__/**/*.ts',
  ],
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  verbose: true,
};
