export default {
  preset: 'ts-jest/presets/default',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: [
    '**/*.test.ts',
    '**/*.spec.ts',
  ],
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  verbose: true,
};
