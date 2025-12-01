// Vercel serverless entry point for the Express app
// Exports the Express instance so @vercel/node can handle requests
const app = require('../server');
module.exports = app;
