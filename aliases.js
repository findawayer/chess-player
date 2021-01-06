module.exports = {
  eslint: [
    ['~app', './app'],
    ['~server', './server'],
  ],
  jest: {
    '~app/(.*)': '<rootDir>/app/$1',
    '~server/(.*)': '<rootDir>/server/$1',
  },
};
