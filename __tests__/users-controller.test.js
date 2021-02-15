const { expect } = require('@jest/globals');

const userQueryService = require('../services/user-query-service');
const usersController = require('../controllers/users-controller');

jest.mock('../services/user-query-service');

const getMockedRequest = (requestProperties) => {
  const request = { 
    ...requestProperties
  };

  return request;
}

const getMockedResponse = () => {
  const response = { 
    send: jest.fn(obj => obj),
    status: jest.fn(code => {statusCode=code; return response})
  };

  return response;
}

test('users controller should send error when id query string missing', () => {
  const mockedRequest = getMockedRequest({ query: { id: undefined } });
  const mockedResponse = getMockedResponse();

  usersController.getUsers(mockedRequest, mockedResponse);

  expect(mockedResponse.status.mock.calls[0][0])
    .toEqual(400);
  expect(mockedResponse.send.mock.results[0].value.errorMessage)
    .toEqual('Id is a required query string');
});

test('users controller should call userQueryService.queryByUserId', () => {
  const mockedRequest = getMockedRequest({ query: { id: 1 } });
  const mockedResponse = getMockedResponse();

  usersController.getUsers(mockedRequest, mockedResponse);

  expect(userQueryService.queryUserById).toHaveBeenCalledWith(1);
});

test('users controller should send error on try catch failure', () => {
  const mockedRequest = getMockedRequest({ query: { id: 1 } });
  const mockedResponse = getMockedResponse();

  const errorMessage = 'this is a custom error message!';
  userQueryService.queryUserById.mockImplementation(() => {
    throw new Error(errorMessage);
  });

  usersController.getUsers(mockedRequest, mockedResponse);

  expect(mockedResponse.status.mock.calls[0][0])
    .toEqual(500);
  expect(mockedResponse.send.mock.results[0].value.errorMessage)
    .toEqual('this is a custom error message!');
});