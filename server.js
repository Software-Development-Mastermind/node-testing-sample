const userQueryService = require('./user-query-service');

const user = userQueryService.queryUserById(1);

console.log(user);