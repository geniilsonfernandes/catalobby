import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestUltil } from './common/test/TestUltil';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;

  const mockUserService = {
    findAllUsers: jest.fn(),
    findUserById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  const mockRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should return an array of users', async () => {
    mockUserService.findAllUsers.mockReturnValue(TestUltil.giveMeUsers(3));
    const result = await resolver.users();

    expect(result).toEqual(TestUltil.giveMeUsers(3));
  });

  it('should return a user', async () => {
    mockUserService.findUserById.mockReturnValue(TestUltil.giveMeAUser());
    const result = await resolver.user('1');

    expect(result).toEqual(TestUltil.giveMeAUser());
  });

  it("shouldn't return a user if not exists", async () => {
    mockUserService.findUserById.mockReturnValue(null);
    const result = await resolver.user('1');

    expect(result).toBeNull();
  });

  it('should create a user', async () => {
    mockUserService.createUser.mockReturnValue(TestUltil.giveMeAUser());
    const result = await resolver.createUser({
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    });

    expect(result).toEqual(TestUltil.giveMeAUser());
  });

  it('should update a user', async () => {
    mockUserService.updateUser.mockReturnValue(TestUltil.giveMeAUser());
    const result = await resolver.updateUser('1', {
      name: 'name',
    });

    expect(result).toEqual(TestUltil.giveMeAUser());
  });

  it('should delete a user', async () => {
    mockUserService.deleteUser.mockReturnValue(TestUltil.giveMeAUser());
    const result = await resolver.deleteUser('1');

    expect(result.message).toEqual('Usuário excluído com sucesso');
  });
});
