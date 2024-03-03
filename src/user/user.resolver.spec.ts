import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestUltil } from './common/test/TestUltil';
import { User } from './entity/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver ', () => {
  let resolver: UserResolver;

  const mockUserService = {
    findAllUsers: jest.fn(),
    findUserById: jest.fn(),
    findUserByEmail: jest.fn(),
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

  describe('query', () => {
    it('should be find a user by id', async () => {
      const user = TestUltil.giveMeAUser();
      mockRepository.findOne.mockReturnValue(user);
      mockUserService.findUserById.mockReturnValue(user);
      const result = await resolver.findUserById(user.id);
      expect(result).toEqual(user);
    });
  });

  describe('mutations', () => {
    it('should be create a user', async () => {
      const user = TestUltil.giveMeAUser();
      mockRepository.create.mockReturnValue(user);
      mockRepository.save.mockReturnValue(user);
      mockUserService.createUser.mockReturnValue(user);
      const result = await resolver.createUser(user);
      expect(result.message).toEqual('Usuário criado com sucesso');
    });

    it('should be update a user', async () => {
      const user = TestUltil.giveMeAUser();
      mockRepository.create.mockReturnValue(user);
      mockRepository.save.mockReturnValue(user);
      mockUserService.updateUser.mockReturnValue(user);
      const result = await resolver.updateUser(user.id, user);

      expect(result.message).toEqual('Usuário atualizado com sucesso');
    });

    it('should be delete a user', async () => {
      const user = TestUltil.giveMeAUser();
      mockRepository.create.mockReturnValue(user);
      mockRepository.save.mockReturnValue(user);
      mockUserService.deleteUser.mockReturnValue(user);
      const result = await resolver.deleteUser(user.id);
      expect(result.message).toEqual('Usuário excluído com sucesso');
    });
  });
});
