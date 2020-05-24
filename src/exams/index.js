const req = require.context("./", true, /.json$/);
const modules = req.keys().map(req);
module.exports = modules;
