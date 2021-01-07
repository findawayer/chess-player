const aliases = require('./aliases').jest;

module.exports = {
  // Root folders for testing.
  roots: ['<rootDir>/app'],
  // Configuration scripts.
  setupFilesAfterEnv: ['<rootDir>/jest/prepare.ts'],
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
