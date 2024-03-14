export const CONSTANT = {
  LOGGER_NAME: 'LOGGER',
  JWT_PASSWORD: 'asdfgh',
  BASIC_PASSWORD: 'Xyz@1234',
  BASIC_USERNAME: 'XYZ',
  PASSWORD_HASH_SALT: 'D4XqxvRjf678LPYZAMNBOT7zkrqG3E2H',
  OTP_EXPIRE_TIME: 30,
};
export const contentType = 'application/json';

export const TAP_CONSTANT = {
  contentType: 'application/json',
  USER_CREATE_URL: 'https://api.tap.company/v2/customers',
  CHARGE_URL: 'https://api.tap.company/v2/charges',
  CREATE_TOKEN_URL: 'https://api.tap.company/v2/tokens',
};


export const Swagger = {
  Title: 'Swagger Title',
  Description: 'A Documentation for Nest.js Boilerplate APIs',
  Version: '1.0',
  AddApiKey: {
    Type: 'apiKey',
    Name: 'Authorization',
    In: 'header',
  },
  AuthType: 'basic',
  Path: 'swagger',
};
