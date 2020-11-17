const dbService = require('./db-service');

function queryUserById(id) {
  const user = dbService.queryDataById(id);
  return user;
}

module.exports = {
  queryUserById
}