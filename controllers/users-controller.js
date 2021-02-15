const userQueryService = require('../services/user-query-service');

exports.getUsers = async (request, response) => {
  if (!request.query.id) return response.status(400).send({ errorMessage: "Id is a required query string" });

  try {
    response.send(userQueryService.queryUserById(request.query.id));
  } catch (err) {
    response.status(500).send({ errorMessage: err.message })
  }
}