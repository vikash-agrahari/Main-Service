export const CONSTANT = {
  LOGGER_NAME: 'LOGGER',
  JWT_PASSWORD: 'asdfgh',
  BASIC_PASSWORD: 'Xyz@1234',
  BASIC_USERNAME: 'XYZ',
  PASSWORD_HASH_SALT: 'D4XqxvRjf678LPYZAMNBOT7zkrqG3E2H',
  OTP_EXPIRE_TIME: 30,
  PROTO_FILE_PATH: (protoFilename: string) => {
    return `../../../../../proto-files/${protoFilename}`;
  },
};
export const contentType = 'application/json';

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

export const GRPC = {
  PROTO_FILE_OPTIONS: {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
};