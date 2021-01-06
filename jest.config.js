const aliases = require('./aliases').jest;

module.exports = {
  // Root folders for testing.
  roots: ['<rootDir>/app'],
  // Configuration scripts.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // Testing files patterns.
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  // Ignore patterns.
  testPathIgnorePatterns: [
    // Dependencies
    '/node_modules/',
    // Private folders
    '/^\\./',
  ],
  // Use `babel-jest` for TypeScript files.
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  // Stop on first error encountered.
  bail: 1,
  // Apply module aliases.
  moduleNameMapper: aliases,
};
