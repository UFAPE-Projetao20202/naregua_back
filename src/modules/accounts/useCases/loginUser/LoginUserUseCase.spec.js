const { describe, expect } = require('@jest/globals');
const Cryptr = require('cryptr');

const AppError = require('../../../../errors/AppError');
const {
  UsersRepositoryInMemory,
} = require('../../repositories/in-memory/UsersRepositoryInMemory');
const { CreateUserUseCase } = require('../createUser/CreateUserUseCase');
const { LoginUserUseCase } = require('./LoginUserUseCase');

let usersRepository;
let createUserUseCase;
//let user;

describe('Login de usuários', () => {
  beforeAll(async () => {
    usersRepository = new UsersRepositoryInMemory();
      createUserUseCase = new CreateUserUseCase(usersRepository);
      loginUserUseCase = new LoginUserUseCase(usersRepository);
      user = await createUserUseCase.execute({
          name: 'Usuario teste',
          email: 'user@email.com',
          phone: '87999999999',
          password: '123456',
      });
  });

    it('[TA_49] Login com e-mail e senha corretos', async () => {
        const userEmail = 'user@email.com';
        const userPassword = '123456';
        const userFindPassword = await loginUserUseCase.execute({ email: userEmail, password: userPassword});
        expect(userFindPassword).toBe(userPassword);
    });

    it('[TA_50] login com e-mail incorreto e senha correta', async () => {
        expect(async () => {
            await loginUserUseCase.execute({
                email: 'user@emailIncorrect.com',
                password: '123456'
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('[TA_51] login com e-mail correto e senha incorreta', async () => {
        const userEmail = 'user@email.com';
        const userPasswordIncorrect = '1234567890';
        expect(async () => {
            await loginUserUseCase.execute({
                email: userEmail, password: userPasswordIncorrect
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
