// Node.js path helper
const path = require('path');
// Project root directory
const root = process.cwd();
// Resolve a path to the project root
module.exports = path.resolve.bind(path, root);
