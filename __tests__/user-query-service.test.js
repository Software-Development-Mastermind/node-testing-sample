//const { test, expect, jest } = require("@jest/globals");
const { expect } = require('@jest/globals');
const dbService = require('../db-service');
const userQueryService = require('../user-query-service');

jest.mock('../db-service');

test('dbService queryDataById method was called', () => {
  dbService.queryDataById.mockReturnValue(
    { id: 10, name: 'John', email: 'john@email.com' }
  );

  userQueryService.queryUserById(10);

  expect(dbService.queryDataById).toHaveBeenCalledWith(10);
})

test('User comes back from database', () => {
  dbService.queryDataById.mockReturnValue(
    { id: 10, name: 'John', email: 'john@email.com' }
  );

  const user = userQueryService.queryUserById(10);

  expect(user.id).toEqual(10);
  expect(user.name).toEqual('John');
  expect(user.email).toEqual('john@email.com');
});